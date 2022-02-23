import Emoji from './Emoji';

export interface EmojiType {
  colons: string;
  emoticons: string[];
  id: string;
  name: string;
  native: string;
  // eslint-disable-next-line camelcase
  short_names: string[];
  skin: null | string;
  unified: string;
}

export default Emoji;
