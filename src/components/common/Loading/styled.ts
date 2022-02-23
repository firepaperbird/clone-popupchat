import { color } from '../../../enum/theme';
import styled, { keyframes } from 'styled-components';

export const typingAnimation = keyframes`
    0%{
      transform:translateY(0px)
    }
    28%{
      transform:translateY(-5px)
    }
    44%{
      transform:translateY(0px)
    }
`;

export const TypingWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 17px;

  .tidot:nth-child(1) {
    animation-delay: 200ms;
  }
  .tidot:nth-child(2) {
    animation-delay: 300ms;
  }
  .tidot:nth-child(3) {
    animation-delay: 400ms;
  }
`;

export const TypingDot = styled.div<{ pcolor?: string }>`
  background-color: ${(props) => props.pcolor || '#8e8e8e'};
  animation: ${typingAnimation} 1.5s infinite ease-in-out;
  border-radius: 2px;
  display: inline-block;
  height: 4px;
  margin-right: 2px;
  width: 4px;
`;

export const LoadingSprintBg = styled.button`
  border: 0;
  border-radius: 100%;
  padding: 15px;
  cursor: pointer;
  box-shadow: 3px 3px 10px -5px grey;
  position: relative;
`;
