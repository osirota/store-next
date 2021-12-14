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
  IconButton,
  Button,
  Badge,
  Snackbar,
  Fade,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { ShoppingCart, Add, Remove, Cancel } from '@material-ui/icons';
import styled from 'styled-components';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Header from 'components/Header';
import Footer from 'components/Footer';
import cartStore from 'store/cart';
import snackbarStore from 'store/snackbar';

const ContainerStyled = styled(Container)`
  max-width: 1140px;
  margin: 0 auto;
  padding: 3rem 0 10px;
`;

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
    @media (max-width: 775px) {
      width: 85%;
    }
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
  padding: 0.5rem 0;
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

const PageLayout = ({ children, title }: PageLayoutProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [drawerState, setDrawerState] = useState(false);
  const [cartState, setCartState] = useState(cartStore.initialState());
  const [snackOpen, setSnackOpen] = useState(false);

  const totalPrice = `${cartState.reduce(
    (acc: number, value: any) => acc + value.price * value.count,
    0
  )} ${t('uah')}`;

  useLayoutEffect(() => {
    cartStore.subscribe(setCartState);
    cartStore.init();
    snackbarStore.subscribe(setSnackOpen);
    snackbarStore.init();
  }, []);

  const price = (prices: any, count: any) => `${prices * count} грн`;
  const toggleDrawer = () => {
    setDrawerState(!drawerState);
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

  const handleRemoveProduct = (id: string) => () => {
    const newCart = cartState.filter(
      (product: LocalStorageProduct) => product._id !== id
    );
    cartStore.setCart(newCart);
  };

  const handleOrder = () => {
    router.push('/order');
  };

  const handleSnackClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  return (
    <>
      <Header />
      <ContainerStyled disableGutters maxWidth={false}>
        <Head>
          <title>{title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box component="main">{children}</Box>
      </ContainerStyled>
      <Footer />
      <SwipeableDrawerStyled
        anchor="right"
        open={drawerState}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <ContentWrapper display="flex" flexDirection="column" p="1.25rem">
          <Typography>{t('basketList')}</Typography>
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
                    <Box flexBasis="55%">
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
                      flexBasis="45%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        alt={product.name}
                        src={product.logo}
                        width={70}
                        height={110}
                      />
                    </Box>
                  </ListItem>
                </ListItemStyled>
              ))}
          </List>
        </ContentWrapper>
        <CompleteWrapper>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box mr="0.5rem">
              <Typography>{`${t('total')}:`}</Typography>
            </Box>
            <Typography>{totalPrice}</Typography>
          </Box>
          <Button disabled={cartState.length === 0} onClick={handleOrder}>
            {t('basketOrder')}
          </Button>
        </CompleteWrapper>
      </SwipeableDrawerStyled>
      <FabStyled onClick={toggleDrawer}>
        <Badge badgeContent={cartState.length} showZero color="primary">
          <ShoppingCart />
        </Badge>
      </FabStyled>
      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={handleSnackClose}
        TransitionComponent={Fade}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackClose}
          severity="success"
        >
          {t('basketSuccess')}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default PageLayout;
