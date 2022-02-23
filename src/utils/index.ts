/* eslint-disable camelcase */
import { omit, uniq } from 'lodash';
import axios from 'axios';

import { RegexEnum, UrlEnum } from '../enum';
import CONFIG from '../config';
import { NormalizedDataTypes } from '../redux/types';
import { FileRequest } from '../redux/message/types';

export const normalizeUpdatedData = (data: NormalizedDataTypes, payload: any[] | any): NormalizedDataTypes => {
  if (!Array.isArray(payload)) {
    return {
      byId: { ...data.byId, [payload.id]: payload },
      allIds: uniq([...data.allIds, payload.id]),
    };
  }

  const byId = payload.reduce(
    (initValue, value) => ({
      ...initValue,
      [value.id]: value,
    }),
    {},
  );
  const allIds = uniq(Object.keys(byId));

  return {
    byId: { ...data.byId, ...byId },
    allIds: uniq([...data.allIds, ...allIds]),
  };
};

export const normalizeNewData = (payload: any[] | any): NormalizedDataTypes => {
  if (!Array.isArray(payload)) {
    return {
      byId: { [payload.id]: payload },
      allIds: uniq([payload.id]),
    };
  }

  const byId = payload.reduce(
    (initValue, value) => ({
      ...initValue,
      [value.id]: value,
    }),
    {},
  );
  const allIds = uniq(Object.keys(byId));

  return { byId, allIds };
};

export const removeDataById = (data: NormalizedDataTypes, id: string): NormalizedDataTypes => {
  const byId = omit(data.byId, id);
  const allIds = data.allIds.filter((item) => item !== id);

  return { byId, allIds };
};

export const checkImageExtensions = (extension: string): boolean => {
  return ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'gif', 'png', 'svg'].includes(extension.toLocaleLowerCase());
};

export const getRealMIMEType = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onloadend = (e) => {
      if (e.target?.result) {
        const arr = new Uint8Array(e.target?.result as ArrayBuffer).subarray(0, 4);
        let header = '';
        for (let i = 0; i < arr.length; i += 1) {
          header += arr[i].toString(16);
        }

        // Check the file signature against known types
        let type = 'application/octet-stream';

        switch (header) {
          case '89504e47':
            type = 'image/png';
            break;
          case '47494638':
            type = 'image/gif';
            break;
          case 'ffd8ffe0':
          case 'ffd8ffe1':
          case 'ffd8ffe2':
            type = 'image/jpeg';
            break;
          case '25504446':
            type = 'application/pdf';
            break;
          default:
            break;
        }

        return resolve(type);
      }
    };

    fileReader.onerror = (err) => reject(err);
    fileReader.readAsArrayBuffer(file);
  });

export const getUploadMessageRequest = async (file: File): Promise<FileRequest> => {
  const type = await getRealMIMEType(file);
  const response = await axios.post(`${CONFIG.CHATCHILLA_BACKEND_URL}/${UrlEnum.SIGNED_URL}`, {
    filename: file.name,
    filetype: type,
  });
  const { urls, filePath, pipeFrom } = response.data;

  const fileAxiosService = axios.create({});
  await fileAxiosService.request({
    url: urls[0],
    method: 'PUT',
    data: file,
    headers: {
      'Content-Type': type,
    },
  });

  const requestBody = {
    name: file.name,
    type,
    size: file.size,
    filePath,
    pipeFrom,
    extension: type === 'application/octet-stream' ? file.name.split('.')[1] : type.split('/')[1],
  };

  return requestBody;
};

export const getFullName = (user: { given_name: string; family_name: string }): string => {
  return `${user.given_name} ${user.family_name}`;
};

export const checkValidPhoneNumber = (phone: string | number): boolean => !!phone.toString().match(RegexEnum.PHONE);

// ========= Encode Phone =========
export const privateKey = '@%@';

export const encodePhone = (region_number = 1, phone_number: number): string => {
  return `${region_number}${privateKey}${phone_number}`;
};

export const decodePhone = (phone_number: string): { region_number: number | null; phone_number: number | null } => {
  if (!phone_number) return { region_number: null, phone_number: null };
  const phone = phone_number.split(privateKey);
  return { region_number: Number(phone[0]), phone_number: Number(phone[1]) };
};

export const decodePhoneToFormat = (phone_number: string): string => {
  if (!phone_number) return '';
  const phone = phone_number.split(privateKey);
  return `+${phone[0]} (${phone[1].substr(0, 3)}) ${phone[1].substr(3, 3)}-${phone[1].substr(6, 10)}`;
};

export const parseStringToObject = (data: string): { [key: string]: string } => {
  try {
    let result = data
      .toString()
      .replace(/[\r\n]+/g, '","')
      .replace(/\=+/g, '":"');
    result = '{"' + result.slice(0, result.lastIndexOf('","')) + '"}';
    return JSON.parse(result);
  } catch (error) {
    console.error(error);
    return {};
  }
};
