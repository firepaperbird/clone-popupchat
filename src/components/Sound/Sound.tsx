import React, { useEffect, useRef } from 'react';
import { SoundProps } from '../../types';

const Sound: React.FC<SoundProps> = ({ isPlay, src, loop, ...props }) => {
  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audio?.current) {
      if (isPlay) {
        audio.current.loop = !!loop;
        audio.current.play();
      } else {
        audio.current.loop = false;
        audio.current.pause();
        audio.current.currentTime = 0;
      }
    }
  }, [isPlay, audio, loop]);

  return <audio src={src} ref={audio} {...props} />;
};

export default Sound;
