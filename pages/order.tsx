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
import { withFormik, Form, useFormikContext } from 'formik';
import styled from 'styled-components';

import Head from 'next/head';
import Image from 'next/image';

import Field from 'patterns/Field';
import PageHeader from 'components/PageHeader/PageHeader';
import CitiesAutoComplete from 'components/CitiesAutoComplete';
import WarehousesAutoComplete from 'components/WarehousesAutoComplete';
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

const Order = () => {
  const { setFieldValue } = useFormikContext();
  const [cartState, setCartState] = useState([]);
  const totalPrice = `Итого: ${cartState.reduce(
    (acc: number, value: any) => acc + value.price * value.count,
    0
  )} грн`;

  const handleRemoveProduct = (id: string) => () => {
    const newCart = cartState.filter(
      (product: LocalStorageProduct) => product._id !== id
    );
    cartStore.setCart(newCart);
  };

  const handleProduct = (type: string, id: string) => () => {
    const newCart = cartState.map((product: LocalStorageProduct) => {
      // eslint-disable-next-line no-underscore-dangle
      if (product._id === id) {
        return {
          ...product,
          count: (product.count > 0 && calculate(type, product.count)) || 0,
        };
      }
      return product;
    });
    cartStore.setCart(newCart);
  };

  useLayoutEffect(() => {
    cartStore.subscribe(setCartState);
    cartStore.init();
  }, []);

  useEffect(() => {
    setFieldValue('order', cartState);
  }, [cartState, setFieldValue]);

  const price = (prices: any, count: any) => `${prices * count} грн`;
  return (
    <>
      <PageHeader />
      <ContainerStyled disableGutters maxWidth={false}>
        <Head>
          <title>Оформление Заказ</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box
          component="main"
          display="flex"
          justifyContent="space-between"
          flexDirection={{ xs: 'column', lg: 'row' }}
        >
          <Box
            width={{ xs: '90%', lg: '45%' }}
            padding={{ xs: '0 1.5rem', lg: '0' }}
            m={{ xs: '2rem 0', lg: '0' }}
          >
            <Box m="1rem 0">
              <Typography color="textSecondary" variant="h4">
                Оформление заказа
              </Typography>
            </Box>
            <Form noValidate>
              <Field name="name" label="ФИО" />
              <Field name="email" label="Email" />
              <Field name="phone" label="Телефон" />
              <CitiesAutoComplete />
              <WarehousesAutoComplete />
              <Box m="2rem 0">
                <Alert severity="info">
                  <AlertTitle>Внимание!</AlertTitle>
                  Оплатите товар на карточку монобанка —{' '}
                  <strong>9999999999999999999</strong>
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
                  color="primary"
                  size="large"
                  type="submit"
                >
                  Оформить
                </Button>
              </Box>
            </Form>
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
                        <Typography color="primary">{product.name}</Typography>
                        <Box display="flex" alignItems="center">
                          <Box display="flex" alignItems="center">
                            <IconButton
                              color="primary"
                              onClick={handleProduct('reduce', product._id)}
                            >
                              <Remove />
                            </IconButton>
                            <Typography color="primary">
                              {product.count}
                            </Typography>
                            <IconButton
                              onClick={handleProduct('increase', product._id)}
                              color="primary"
                            >
                              <Add />
                            </IconButton>
                          </Box>
                          <Typography color="primary">
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
                          width={60}
                          height={100}
                        />
                      </Box>
                      <ListItemSecondaryAction>
                        <IconButton
                          onClick={handleRemoveProduct(product._id)}
                          color="primary"
                        >
                          <Cancel />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </ListItemStyled>
                ))}
            </List>
            <Typography align="right" color="textSecondary">
              {totalPrice}
            </Typography>
          </Box>
        </Box>
      </ContainerStyled>
      <PageHeader isFooter />
    </>
  );
};

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues,
  handleSubmit,
  validationSchema,
})(Order);
