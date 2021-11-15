/* eslint-disable no-underscore-dangle */
import React, { useState, useLayoutEffect, useEffect } from 'react';
import {
  Container,
  Box,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { withFormik, useFormikContext } from 'formik';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Head from 'next/head';
import Image from 'next/image';

import Field from 'patterns/Field';
import Header from 'components/Header';
import cartStore from 'store/cart';

import {
  mapPropsToValues,
  handleSubmit,
  validationSchema,
} from 'utils/order-form';
import { Cancel, Remove, Add } from '@material-ui/icons';

const ContainerStyled = styled(Container)`
  max-width: 1140px;
  margin: 0 auto;
  padding: 30px 0 10px;
`;

const ListItemStyled = styled(Box)`
  border: 1px solid;
  margin: 1rem 0;
`;

interface Products {
  alchol: String;
  name: String;
  partnerId: String;
  taste: String;
  _id: String;
  price: number;
}

const calculate = (type: string, count: number) => {
  if (type === 'increase') {
    return count + 1;
  }
  if (type === 'reduce') {
    return count - 1;
  }

  return count;
};

interface LocalStorageProduct extends Products {
  count: number;
}

interface IBodyState {
  merchantAccount: string;
  merchantDomainName: string;
  merchantTransactionSecureType: string;
  merchantSignature: string;
  orderReference: string;
  orderDate: string;
  amount: number;
  currency: string;
  productName: any[];
  productPrice: any[];
  productCount: any[];
  deliveryList: string;
}

interface IResponse {
  merchantAccount: string;
  merchantDomainName: string;
  hmacDigest: string;
  orderReference: string;
  amount: number;
  orderDate: string;
  names: any[];
  prices: any[];
  counts: any[];
}

const Order = () => {
  const { setFieldValue } = useFormikContext();
  const { t } = useTranslation(['order', 'common']);
  const [cartState, setCartState] = useState([]);
  const [body, setBody] = useState<IBodyState>({
    merchantAccount: '',
    merchantDomainName: '',
    merchantTransactionSecureType: '',
    merchantSignature: '',
    orderReference: '',
    orderDate: '',
    amount: 0,
    currency: '',
    productName: [],
    productPrice: [],
    productCount: [],
    deliveryList: '',
  });
  const totalPrice = `${t('total')}: ${cartState.reduce(
    (acc: number, value: any) => acc + value.price * value.count,
    0
  )} ${t('uah')}`;

  const handleRemoveProduct = (id: string) => () => {
    const newCart = cartState.filter(
      (product: LocalStorageProduct) => product._id !== id
    );
    cartStore.setCart(newCart);
  };

  const handleProduct = (type: string, id: string) => () => {
    const newCart = cartState.reduce(
      (acc: any, product: LocalStorageProduct) => {
        // eslint-disable-next-line no-underscore-dangle
        if (product._id === id && product.count === 1 && type === 'reduce') {
          return acc;
        }
        if (product._id === id) {
          return [
            ...acc,
            {
              ...product,
              count: calculate(type, product.count),
            },
          ];
        }
        return [...acc, product];
      },
      []
    );
    cartStore.setCart(newCart);
  };

  useLayoutEffect(() => {
    cartStore.subscribe(setCartState);
    cartStore.init();
  }, []);

  useEffect(() => {
    setFieldValue('order', cartState);
  }, [cartState, setFieldValue]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/marchant', {
        method: 'POST',
        body: JSON.stringify(cartState),
      });
      const data = await response.json();
      const {
        hmacDigest,
        names,
        prices,
        counts,
        merchantAccount,
        merchantDomainName,
        orderReference,
        amount,
        orderDate,
      }: IResponse = data;

      setBody({
        merchantAccount,
        merchantDomainName,
        merchantTransactionSecureType: 'AUTO',
        merchantSignature: hmacDigest,
        orderReference,
        orderDate,
        amount,
        currency: 'UAH',
        productName: names,
        productPrice: prices,
        productCount: counts,
        deliveryList: 'nova',
      });
    };
    if (cartState.length > 0) {
      fetchData();
    }
  }, [cartState, setBody]);

  const price = (pricesi: any, count: any) => `${pricesi * count} ${t('uah')}`;
  const isEnoughAmout = body.amount > 250;
  return (
    <>
      <Header />
      <ContainerStyled disableGutters maxWidth={false}>
        <Head>
          <title>{t('orderTitle')}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box
          component="main"
          display="flex"
          justifyContent="space-between"
          flexDirection={{ xs: 'column', lg: 'row' }}
          mt="5rem"
        >
          <Box
            width={{ xs: '90%', lg: '45%' }}
            padding={{ xs: '0 1.5rem', lg: '0' }}
            m={{ xs: '2rem 0', lg: '0' }}
          >
            <Box m="1rem 0">
              <Typography variant="h4">{t('orderTitle')}</Typography>
            </Box>
            <form
              method="post"
              action="https://secure.wayforpay.com/pay"
              acceptCharset="utf-8"
            >
              <Box display="none">
                <input
                  readOnly
                  name="merchantAccount"
                  value={body.merchantAccount}
                />
                <input
                  readOnly
                  name="merchantDomainName"
                  value={body.merchantDomainName}
                />
                <input
                  readOnly
                  name="merchantAuthType"
                  value="SimpleSignature"
                />
                <input readOnly name="defaultPaymentSystem" value="card" />
                <input
                  readOnly
                  name="orderReference"
                  value={body.orderReference}
                />
                <input readOnly name="orderDate" value={body.orderDate} />
                <input readOnly name="amount" value={body.amount} />
                <input readOnly name="currency" value={body.currency} />
                {body.productName.length > 0 &&
                  body.productName.map((i) => (
                    <input readOnly name="productName[]" value={i} />
                  ))}
                {body.productPrice.length > 0 &&
                  body.productPrice.map((i) => (
                    <input readOnly name="productPrice[]" value={i} />
                  ))}
                {body.productCount.length > 0 &&
                  body.productCount.map((i) => (
                    <input readOnly name="productCount[]" value={i} />
                  ))}
                <input
                  readOnly
                  name="merchantSignature"
                  value={body.merchantSignature}
                />
              </Box>
              <Field name="clientFirstName" label="ФИО" />
              <Field name="clientEmail" label="Email" />
              <Field name="clientPhone" label="Телефон" />
              <Box m="2rem 0">
                <Alert severity="info">
                  <AlertTitle>{`${t('attention')}`}</AlertTitle>
                  {`${t('minOrdertext')}`} —{' '}
                  <strong>{`250 ${t('uah')}`}</strong>
                </Alert>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt="2rem"
              >
                <Button
                  variant="outlined"
                  size="large"
                  type="submit"
                  disabled={!isEnoughAmout}
                >
                  {t('order')}
                </Button>
              </Box>
            </form>
          </Box>
          <Box
            width={{ xs: '90%', lg: '45%' }}
            padding={{ xs: '0 .2rem', lg: '0' }}
            m={{ xs: '2rem 0', lg: '0' }}
          >
            <List>
              {cartState.length > 0 &&
                cartState.map((product: any) => (
                  <ListItemStyled key={product._id}>
                    <ListItem>
                      <Box flexBasis="50%">
                        <Typography>{product.name}</Typography>
                        <Box display="flex" alignItems="center">
                          <Box display="flex" alignItems="center">
                            <IconButton
                              onClick={handleProduct('reduce', product._id)}
                            >
                              <Remove />
                            </IconButton>
                            <Typography>{product.count}</Typography>
                            <IconButton
                              onClick={handleProduct('increase', product._id)}
                            >
                              <Add />
                            </IconButton>
                          </Box>
                          <Typography>
                            {price(product.price, product.count)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        flexBasis="50%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Image
                          alt="bg"
                          src={product.logo}
                          width={80}
                          height={150}
                          layout="fixed"
                        />
                      </Box>
                      <ListItemSecondaryAction>
                        <IconButton onClick={handleRemoveProduct(product._id)}>
                          <Cancel />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </ListItemStyled>
                ))}
            </List>
            <Typography align="right">{totalPrice}</Typography>
          </Box>
        </Box>
      </ContainerStyled>
    </>
  );
};

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['order', 'common'])),
    },
  };
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues,
  handleSubmit,
  validationSchema,
})(Order);
