/* eslint-disable no-underscore-dangle */
import React, { useState, useLayoutEffect } from 'react';
import {
  Container,
  Box,
  Fab,
  SwipeableDrawer,
  List,
  ListItem,
  Typography,
  ListItemSecondaryAction,
  ListItemAvatar,
  IconButton,
  Button,
} from '@material-ui/core';
import { ShoppingCart, Add, Remove, Cancel } from '@material-ui/icons';
import styled from 'styled-components';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import PageHeader from 'components/PageHeader/PageHeader';
import cartStore from 'store/cart';

const ContainerStyled = styled(Container)`
  max-width: 1140px;
  margin: 0 auto;
  padding: 30px 0 10px;
`;

// const Wrapper = styled.div`
//   position: fixed;
//   height: 100vh;
//   width: 100vw;
//   overflow: hidden;
//   z-index: -1;
// `

const FabStyled = styled(Fab)`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  z-index: 2;
`;

const SwipeableDrawerStyled = styled(SwipeableDrawer)`
  color: red;
  & .MuiDrawer-paper {
    width: 400px;
    background-color: #b2b2b2;
    justify-content: space-between;
  }
`;

const ListItemStyled = styled(Box)`
  border: 1px solid;
  margin: 1rem 0;
`;

const CompleteWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid;
  padding: 1rem 0 0;
`;

const ContentWrapper = styled(Box)`
  max-height: 90vh;
  overflow: overlay;
`;

type PageLayoutProps = {
  title: string;
  children: React.ReactNode;
};

interface Products {
  alchol: string;
  name: string;
  partnerId: string;
  taste: string;
  _id: string;
  price: number;
}

const calculate = {
  increase: (count: number) => count + 1,
  reduce: (count: number) => count - 1,
};

interface LocalStorageProduct extends Products {
  count: number;
}

const PageLayout = ({ children, title }: PageLayoutProps) => {
  const router = useRouter();
  const [drawerState, setDrawerState] = useState(false);
  const [cartState, setCartState] = useState(cartStore.initialState());
  const totalPrice = `${cartState.reduce(
    (acc: number, value: any) => acc + value.price * value.count,
    0
  )} грн`;

  useLayoutEffect(() => {
    cartStore.subscribe(setCartState);
    cartStore.init();
  }, []);

  const price = (prices: any, count: any) => `${prices * count} грн`;
  const toggleDrawer = () => {
    setDrawerState(!drawerState);
  };

  const handleProduct = (type: string, id: string) => () => {
    const newCart = cartState.map((product: LocalStorageProduct) => {
      // eslint-disable-next-line no-underscore-dangle
      if (product._id === id) {
        return {
          ...product,
          count: (product.count > 0 && calculate[type](product.count)) || 0,
        };
      }
      return product;
    });
    cartStore.setCart(newCart);
  };

  const handleRemoveProduct = (id: string) => () => {
    const newCart = cartState.filter(
      (product: LocalStorageProduct) => product._id !== id
    );
    cartStore.setCart(newCart);
  };

  const handleOrder = () => {
    router.push('/order');
  };

  return (
    <>
      <PageHeader />
      <ContainerStyled disableGutters maxWidth={false}>
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box component="main">{children}</Box>
      </ContainerStyled>
      <PageHeader isFooter />
      <SwipeableDrawerStyled
        anchor="right"
        open={drawerState}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <ContentWrapper display="flex" flexDirection="column" p="1.25rem">
          <Typography color="primary">Ваше замовлення</Typography>
          <List>
            {cartState.length > 0 &&
              cartState.map((product: any) => (
                <ListItemStyled key={product._id}>
                  <ListItem>
                    <ListItemSecondaryAction>
                      <IconButton onClick={handleRemoveProduct(product._id)}>
                        <Cancel />
                      </IconButton>
                    </ListItemSecondaryAction>
                    <Box>
                      <Typography color="primary">{product.name}</Typography>
                      <Box display="flex" alignItems="center">
                        <Box display="flex" alignItems="center">
                          <IconButton
                            onClick={handleProduct('reduce', product._id)}
                          >
                            <Remove />
                          </IconButton>
                          <Typography color="primary">
                            {product.count}
                          </Typography>
                          <IconButton
                            onClick={handleProduct('increase', product._id)}
                          >
                            <Add />
                          </IconButton>
                        </Box>
                        <Typography color="primary">
                          {price(product.price, product.count)}
                        </Typography>
                      </Box>
                    </Box>
                    <ListItemAvatar>
                      <Image
                        alt="bg"
                        src="/bottle.png"
                        width={100}
                        height={100}
                      />
                    </ListItemAvatar>
                  </ListItem>
                </ListItemStyled>
              ))}
          </List>
        </ContentWrapper>
        <CompleteWrapper>
          <Box>
            <Typography color="primary">Итого:</Typography>
            <Typography color="primary">{totalPrice}</Typography>
          </Box>
          <Button disabled={cartState.length === 0} onClick={handleOrder}>
            Оформить заказ
          </Button>
        </CompleteWrapper>
      </SwipeableDrawerStyled>
      <FabStyled color="primary" onClick={toggleDrawer}>
        <ShoppingCart />
      </FabStyled>
    </>
  );
};

export default PageLayout;
