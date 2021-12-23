import React, { useState, useLayoutEffect } from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import cartStore from 'store/cart';
import snackbarStore from 'store/snackbar';

interface IBox {
  count: number;
  name: string;
  price: number;
  _id: string;
  logo: string;
  description: string;
  mixes: string;
}

interface LocalStorageProduct extends IBox {
  count: number;
}

interface IProps {
  box: LocalStorageProduct;
  mb: string | { xs: string; lg: string };
}

const BoxesItem = ({ box, mb }: IProps) => {
  const { t } = useTranslation();
  const [cartState, setCartState] = useState(cartStore.initialState());

  useLayoutEffect(() => {
    cartStore.subscribe(setCartState);
    cartStore.init();
  }, []);

  const handleProduct = () => {
    snackbarStore.showSnackbar();
    if (!cartState) {
      cartStore.setCart([{ ...box, count: 1 }]);
      return null;
    }

    // eslint-disable-next-line no-underscore-dangle
    if (cartState.find(({ _id }: any) => _id === box._id)) {
      const newCart = cartState.map((item: LocalStorageProduct) => {
        // eslint-disable-next-line no-underscore-dangle
        if (item._id === box._id) {
          return {
            ...item,
            count: item.count + 1,
          };
        }
        return item;
      });
      cartStore.setCart(newCart);
      return null;
    }
    cartStore.setCart([...cartState, { ...box, count: 1 }]);
    return null;
  };
  return (
    <>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', lg: 'row' }}
        alignItems={{ xs: 'center', lg: 'space-between' }}
        mb={mb}
      >
        <Box
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
          width={{ xs: '100%', lg: '50%' }}
          height="600px"
        >
          <Image
            src={box.logo}
            alt={`Бутылка ${box.name}`}
            layout="fixed"
            width="350px"
            height="390px"
          />
        </Box>
        <Box width={{ xs: '95%', lg: '50%' }}>
          <Typography gutterBottom variant="h4" style={{ fontWeight: 'bold' }}>
            {box.name}
          </Typography>
          <Typography gutterBottom variant="h4">
            {box.mixes}
          </Typography>
          <Box fontWeight="bold" mb="3rem">
            <Typography variant="h5">{`${box.price} ${t('uah')}`}</Typography>
          </Box>
          <Typography
            gutterBottom
            variant="body1"
            style={{ marginBottom: '2rem' }}
          >
            {box.description}
          </Typography>
          <Button variant="outlined" size="large" onClick={handleProduct}>
            {t('buy')}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default BoxesItem;
