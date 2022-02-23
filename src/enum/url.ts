export const SIGNED_URL = 'livechat/getSignedUrl';

export const ATTACHMENT_URL = 'livechat/message/file';

export const UPDATE_CONVERSATION_URL = (conversationId: string): string => `livechat/conversation/${conversationId}`;

export const GET_MESSAGE_BY_CONVERSATION_URL = (conversationId: string): string => `livechat/message/${conversationId}`;
