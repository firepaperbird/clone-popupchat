/* eslint-disable camelcase */
export interface FileRequest {
  name: string;
  type: string;
  size: number;
  filePath: string;
  pipeFrom: string;
  extension: string;
}

export interface AttachmentPayload {
  file: File;
}

export interface Message {
  id: string;
  broadcast_id?: string;
  broadcast_did?: string;
  broadcast_status?: string;
  broadcast_to?: string; // contact id of user broadcasted to
  messageSid?: string;
  message?: string;
  _conversation?: string;
  _from?: string;
  sms_response?: unknown;
  callback_response?: unknown;
  // internal: {
  //   type: boolean,
  //   default: false,
  // },
  sent?: boolean;
  sent_date?: string;
  // date: string,
  failed?: boolean;
  attachment_id?: string;
  attachment?: {
    type: boolean;
    default: false;
  };
  created_by_campaign?: string;
  created_by_workflow?: boolean;
  concealed_message?: {
    type: boolean;
    defaultValue: false;
  };
  type?: unknown;
  system_type?: unknown;
  _cdr?: string;
  createdAt?: Date | string;
}
