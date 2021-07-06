import React from 'react';
import { withFormik, Form } from 'formik';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import styled from 'styled-components';

import {
  mapPropsToValues,
  handleSubmit,
  validationSchema,
} from 'utils/invites-form';
import Field from 'patterns/Field';

const DialogStyled = styled(Dialog)`
  & .MuiPaper-root {
    background-color: #303546;
  }

  & .MuiDialogTitle-root .MuiTypography-root {
    color: #fff;
  }
`;

interface InvitesModalProps {
  isValid: boolean;
  open: boolean;
  resetForm: () => void;
  closeModal: () => void;
}

const InvitesModal = ({
  isValid,
  resetForm,
  closeModal,
  open,
}: InvitesModalProps) => {
  const handleClose = () => {
    closeModal();
    resetForm();
  };

  return (
    <DialogStyled
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      aria-labelledby="form-dialog-title"
    >
      <Form noValidate>
        <DialogTitle id="form-dialog-title">
          Получить письмо о запуске
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Оставьте нам Вашу почту, чтобы мы Вам сообщили об запуске.
          </DialogContentText>
          <Field name="email" label="your-email@gmail.com" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
          <Button type="submit" color="primary" disabled={!isValid}>
            Отправить
          </Button>
        </DialogActions>
      </Form>
    </DialogStyled>
  );
};

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues,
  handleSubmit,
  validationSchema,
})(InvitesModal);
