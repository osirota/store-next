import React, { useState, useLayoutEffect } from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import Image from 'next/image';

import cartStore from 'store/cart';
import snackbarStore from 'store/snackbar';

interface Product {
  alchol: string;
  count: number;
  name: string;
  partnerId: string;
  price: number;
  taste: string;
  _id: string;
  logo: string;
  description: string;
  color: string;
  matches: string;
  flavor: string;
}

interface LocalStorageProduct extends Product {
  count: number;
}

interface IProps {
  product: LocalStorageProduct;
  mb: string;
}

const ProductItem = ({ product, mb }: IProps) => {
  const [cartState, setCartState] = useState(cartStore.initialState());

  useLayoutEffect(() => {
    cartStore.subscribe(setCartState);
    cartStore.init();
  }, []);

  const handleProduct = () => {
    snackbarStore.showSnackbar();
    if (!cartState) {
      cartStore.setCart([{ ...product, count: 1 }]);
      return null;
    }

    // eslint-disable-next-line no-underscore-dangle
    if (cartState.find(({ _id }: any) => _id === product._id)) {
      const newCart = cartState.map((item: LocalStorageProduct) => {
        // eslint-disable-next-line no-underscore-dangle
        if (item._id === product._id) {
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
    cartStore.setCart([...cartState, { ...product, count: 1 }]);
    return null;
  };
  return (
    <>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', lg: 'row' }}
        alignItems="space-between"
        mb={mb}
      >
        <Box position="relative" width="50%" height="400px">
          <Image
            src={product.logo}
            alt={`Бутылка ${product.name}`}
            layout="fill"
            objectFit="contain"
          />
        </Box>
        <Box width="50%">
          <Typography gutterBottom variant="h3" color="textSecondary">
            {product.name}
          </Typography>
          <Box fontWeight="bold" mb="3rem">
            <Typography variant="h5">{`${product.price} грн`}</Typography>
          </Box>
          <Typography gutterBottom variant="body1">
            {product.description}
          </Typography>
          <Typography gutterBottom variant="body1">
            <strong>Цвет: </strong>
            {product.color}
          </Typography>
          <Typography gutterBottom variant="body1">
            <strong>Запах: </strong>
            {product.flavor}
          </Typography>
          <Typography gutterBottom variant="body1">
            <strong>Вкус: </strong>
            {product.taste}
          </Typography>
          {product.matches && (
            <Typography gutterBottom variant="body1">
              <strong>Сочетается: </strong>
              {product.matches}
            </Typography>
          )}
          <Box mb="2rem">
            <Typography gutterBottom variant="body1">
              <strong>ABV: </strong>
              {product.alchol}
            </Typography>
          </Box>
          <Button variant="outlined" color="primary" onClick={handleProduct}>
            Купити
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ProductItem;
