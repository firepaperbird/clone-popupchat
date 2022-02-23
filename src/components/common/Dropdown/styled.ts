import styled, { css } from 'styled-components';
import { color } from '../../../enum/theme';

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const DropdownItemWrapper = styled.button<any>`
  border: 0;
  background-color: ${(props) => props.pcolor};
  border-radius: 100%;
  height: 35px;
  width: 35px;
  color: ${(props) => props.textColor || color.light} !important;
  margin: 5px;
  cursor: pointer;
`;

export const CustomDropdownContainer = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  transform: translate(0, -100%);
  background-color: transparent;
  border-radius: 0;
  max-height: 50px;

  ${({ active }) =>
    active &&
    ` 
        max-height: 100vh;
        transition: max-height ease-out 1s;
        background-color: white;
        border-radius: 20px;
        box-shadow: 1px 1px 10px -5px;
    `}
`;
