import * as Yup from 'yup';
import cartStore from 'store/cart';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import formatISO from 'date-fns/formatISO';

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
  const hmacDigest = Base64.stringify(
    hmacSHA512(
      `test_merch_n1;http://ciderdegustator.com/;1; ${formatISO(
        new Date()
      )};${totalPrice};UAH;${names.join(';')};${counts.join(';')};${prices.join(
        ';'
      )};`,
      'flk3409refn54t54t*FNJRET'
    )
  );
  const body = {
    merchantAccount: 'test_merch_n1',
    merchantDomainName: 'http://ciderdegustator.com/',
    merchantTransactionSecureType: 'AUTO',
    merchantSignature: hmacDigest,
    orderReference: '1',
    orderDate: formatISO(new Date()),
    amount: totalPrice,
    currency: 'UAH',
    productName: names,
    productPrice: prices,
    productCount: counts,
    deliveryList: 'nova',
  };
  const response = await fetch('https://secure.wayforpay.com/pay', {
    method: 'POST',
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
