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
  const totalPrice = values.order.reduce(
    (acc: number, value: any) => acc + value.price * value.count,
    0
  );
  const names = values.order.map((item: any) => item.name);
  const prices = values.order.map((item: any) => item.price);
  const counts = values.order.map((item: any) => item.count);
  const body = {
    merchantAccount: 'freelance_user_610da3f656198',
    merchantDomainName: 'https://dev.ciderdegustator.com/',
    merchantTransactionSecureType: 'AUTO',
    merchantSignature: 'test order',
    orderReference: Math.random(),
    orderDate: new Date(),
    amount: totalPrice,
    currency: 'UAH',
    productName: names,
    productPrice: prices,
    productCount: counts,
    deliveryList: 'nova',
    merchantSecretKey: 'fa449611e00aa34e89581e45ed6ab240b8d6d30d',
  };
  const response = await fetch('https://secure.wayforpay.com/pay', {
    method: 'POST',
    headers: {
      Accept: contentType,
      'Content-Type': contentType,
    },
    body: JSON.stringify(body),
  });
  console.log(response);
  // resetForm();
  // cartStore.clearCart();
  // localStorage.removeItem('cart');
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
