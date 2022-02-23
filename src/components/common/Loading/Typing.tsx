import React from 'react';
import { TypingDot, TypingWrapper } from './styled';

const Typing: React.FC<{[key:string]: string}> = ({ color }) => {
  return (
    <TypingWrapper>
      <TypingDot className="tidot" pcolor={color}/>
      <TypingDot className="tidot" pcolor={color}/>
      <TypingDot className="tidot" pcolor={color}/>
    </TypingWrapper>
  );
};

export default Typing;
