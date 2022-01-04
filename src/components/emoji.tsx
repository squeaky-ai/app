import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import type { ImageProps } from 'next/image';

import emoji1 from '../../public/emojis/emoji-1.svg';
import emoji2 from '../../public/emojis/emoji-2.svg';
import emoji3 from '../../public/emojis/emoji-3.svg';
import emoji4 from '../../public/emojis/emoji-4.svg';
import emoji5 from '../../public/emojis/emoji-5.svg';

export type EmojiType = 
  'emoji-1' |
  'emoji-2' |
  'emoji-3' |
  'emoji-4' |
  'emoji-5';

interface Props extends Omit<ImageProps, 'src'> {
  emoji: EmojiType;
}

const getEmojiSrc = (emoji: EmojiType) => {
  switch(emoji) {
    case 'emoji-1':
      return emoji1;
    case 'emoji-2':
      return emoji2;
    case 'emoji-3':
      return emoji3;
    case 'emoji-4':
      return emoji4;
    case 'emoji-5':
      return emoji5;
  }
};

export const Emoji: FC<Props> = ({ emoji, ...props }) => {
  return <Image src={getEmojiSrc(emoji)} {...props} />;
};
