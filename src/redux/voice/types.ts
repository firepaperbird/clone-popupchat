export interface VoicePayload {
  uri: string;
  options: {
    media: {
      constraints: {
        audio: boolean;
        video: boolean;
      };
    };
    extraHeaders: string[];
  };
  type: string;
}
