import React from 'react';
import { withFormik, Form, FormikProps } from 'formik';
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
  open: boolean;
  closeModal: () => void;
  handleSnackOpen: () => void;
}

interface FormValues {
  email: string;
}

const InvitesModal = ({
  isValid,
  resetForm,
  closeModal,
  open,
}: InvitesModalProps & FormikProps<FormValues>) => {
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
          <Button onClick={handleClose}>Закрыть</Button>
          <Button type="submit" disabled={!isValid}>
            Отправить
          </Button>
        </DialogActions>
      </Form>
    </DialogStyled>
  );
};

export default withFormik<InvitesModalProps, FormValues>({
  enableReinitialize: true,
  mapPropsToValues,
  handleSubmit,
  validationSchema,
})(InvitesModal);
