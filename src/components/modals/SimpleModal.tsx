import { Box, Modal, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { TextFieldComponent } from '../TextFieldComponent/TextFieldComponent';
import { BoxWrapper, classes } from './SimpleModal.helper';

interface SimpleModalProps {
  open: boolean;
  handleClose: () => void;
  padding?: string;

  children: ReactNode;
}

const SimpleModal: FC<SimpleModalProps> = ({ open, handleClose, padding, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <BoxWrapper className={classes.box} padding={padding}>
        {children}
      </BoxWrapper>
    </Modal>
  );
};

export default SimpleModal;
