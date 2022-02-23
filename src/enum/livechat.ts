export enum VIEW {
  GROUP_SETTINGS = 'GROUP_SETTINGS',
  CHAT = 'CHAT',
}

export enum POSITION {
  TOP_RIGHT = 'TOP_RIGHT',
  TOP_LEFT = 'TOP_LEFT',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  PREVIEW = 'PREVIEW',
}

export const positionToStyle = {
  TOP_RIGHT: 'top right',
  TOP_LEFT: 'top left',
  BOTTOM_RIGHT: 'bottom right',
  BOTTOM_LEFT: 'bottom left',
};

export enum REQUIRED_FIELD {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
}

export const DEFAULT = {
  TITLE: 'Chatchilla',
};
