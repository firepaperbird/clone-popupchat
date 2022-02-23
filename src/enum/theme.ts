export const color = {
  primary: '#3db26a',
  primary2: '#8acf87',
  primaryDark: '#3d905d',
  secondary: '#ececec',
  borderColor: '#808080',
  borderColorLight: '#e4e4e4',
  light: '#fdfdfd',
  dark: '#000000',
  hexToRgbA: function (hex: string, type = 0) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      switch (type || 0) {
        case 0:
          return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)';
        case 1:
          return { r: (c >> 16) & 255, g: (c >> 8) & 255, b: c & 255 };
        default:
          return;
      }
    }
    throw new Error('Bad Hex');
  },
  getTextColor: () => {
    const priColor = color.hexToRgbA(color.primary, 1) as { r: number; g: number; b: number };
    // R * 0.299 + G * 0.587 + B * 0.114;
    const greyScale = priColor.r * 0.299 + priColor.g * 0.587 + priColor.b * 0.114;
    if (greyScale > 186) return '#000';
    return '#fff';
  },
};
