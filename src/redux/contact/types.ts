/* eslint-disable camelcase */
export interface ContactPayload {
  createdAt: string;
  email: string;
  fingerprinting: string;
  id: string;
  listid: string;
  phone_number: string;
  region_number: string;
  updatedAt: string;
  webrtc_password: string;
  _last_conversation_group: string;
  _last_phone_used: string;
  _original_group: string;
  _user: string;
}

export interface ContacConversationPayload {
  conversation: { [key: string]: any };
  contact: ContactPayload;
}
