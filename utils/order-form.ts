import * as Yup from 'yup';
import cartStore from 'store/cart';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  city: string;
  warehouses: string;
  order: any;
}

interface FormikBag {
  props: {
    closeModal: () => void;
    handleSnackOpen: () => void;
  };
  resetForm: () => void;
}

export const mapPropsToValues = () => ({
  name: '',
  email: '',
  phone: '',
  city: '',
  warehouses: '',
  order: null,
});

export const handleSubmit = async (
  values: FormValues,
  formikBag: FormikBag
) => {
  const { resetForm } = formikBag;
  const contentType = 'application/json';
  await fetch('/api/order', {
    method: 'POST',
    headers: {
      Accept: contentType,
      'Content-Type': contentType,
    },
    body: JSON.stringify(values),
  });
  resetForm();
  cartStore.clearCart();
  localStorage.removeItem('cart');
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
  city: Yup.string().required('City is required'),
  warehouses: Yup.string().required('Warehouses is required'),
});
