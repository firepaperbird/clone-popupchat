import styled from 'styled-components';

export const ModalContainer = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 100%;
  left: 0;
  width: 450px;
  height: 345px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
  color: #fff;

  .title {
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    margin-bottom: 10px;
  }

  button {
    border-radius: 50px;
    font-size: 12px;
    width: 80px;
  }

  .okBtn {
    background: #4cb86f;
    margin-right: 5px;
    box-shadow: 0 0 10px -5px black;

    &:hover,
    &:focus {
      background: #58d17f;
    }
  }

  .cancelBtn {
    box-shadow: none;
  }
`;
