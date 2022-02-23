export enum CALL_STATUS {
  INIT = 'INIT',
  RINGING = 'RINGING',
  HUNGUP = 'HUNGUP',
  FAILED = 'FAILED',
  ANSWER = 'ANSWER',
}

export const dtmfOption = {
  duration: 160,
  interToneGap: 1200,
};
