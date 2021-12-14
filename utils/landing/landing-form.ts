import * as Yup from 'yup';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  text?: string;
}

interface FormikBag {
  resetForm: () => void;
}

export const mapPropsToValues = () => ({
  name: '',
  email: '',
  phone: '',
  text: '',
});

export const handleSubmit = async (
  values: FormValues,
  formikBag: FormikBag
) => {
  const { resetForm } = formikBag;
  const contentType = 'application/json';
  await fetch('/api/landing', {
    method: 'POST',
    headers: {
      Accept: contentType,
      'Content-Type': contentType,
    },
    body: JSON.stringify(values),
  });
  resetForm();
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Names is required'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  phone: Yup.string()
    .required('Phone is required')
    .test('phoneValid', 'Phone is valid', (value) =>
      value
        ? RegExp(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
          ).test(value)
        : true
    ),
});
