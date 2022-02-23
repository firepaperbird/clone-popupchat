import { Button } from 'antd';
import React from 'react';
import { ModalContainer } from './styles';

interface ModalProps {
  visible: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function Modal(props: ModalProps): React.ReactElement {
  const { visible, title = '', onConfirm, onCancel } = props;

  return (
    <ModalContainer visible={visible}>
      <div className='title'>{title}</div>
      <div className='btnContainer'>
        <Button className='okBtn' onClick={onConfirm}>
          Ok
        </Button>
        <Button className='cancelBtn' onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </ModalContainer>
  );
}

export default Modal;
