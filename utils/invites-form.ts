import * as Yup from 'yup';

interface FormValues {
  email: string;
}

interface FormikBag {
  props: {
    closeModal: () => void;
    handleSnackOpen: () => void;
  };
  resetForm: () => void;
}

export const mapPropsToValues = () => ({
  email: '',
});

export const handleSubmit = async (
  values: FormValues,
  formikBag: FormikBag
) => {
  const {
    props: { closeModal, handleSnackOpen },
    resetForm,
  } = formikBag;
  const contentType = 'application/json';

  const response = await fetch('/api/invites', {
    method: 'POST',
    headers: {
      Accept: contentType,
      'Content-Type': contentType,
    },
    body: JSON.stringify(values),
  });
  if (response.ok) {
    closeModal();
    resetForm();
    handleSnackOpen();
  }
};

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Почта обязательна')
    .email('Неверный формат почты'),
});
