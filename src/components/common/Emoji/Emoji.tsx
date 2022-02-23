import React from 'react';
import { NimblePicker } from 'emoji-mart';

import data from 'emoji-mart/data/apple.json';
import { EmojiType } from '.';

function Emoji({ handlePutEmoji }: { handlePutEmoji: (emoji: EmojiType) => void }): React.ReactElement {
  return <NimblePicker set='apple' data={data} title='ChatChilla Emoji' onClick={handlePutEmoji} />;
}

export default Emoji;
