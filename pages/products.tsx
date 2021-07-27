import React, { useState, useLayoutEffect } from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import useSwr from 'swr';
import Image from 'next/image';

import PageLayout from 'components/PageLayout/PageLayout';

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

interface IFetch {
  products: Product[];
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Products = () => {
  const { data } = useSwr('/api/products', fetcher);
  const [cartState, setCartState] = useState(cartStore.initialState());

  useLayoutEffect(() => {
    cartStore.subscribe(setCartState);
    cartStore.init();
  }, []);
  if (!data) {
    return null;
  }
  const { products }: IFetch = data;

  const handleProduct = (item: LocalStorageProduct) => () => {
    snackbarStore.showSnackbar();
    if (!cartState) {
      cartStore.setCart([{ ...item, count: 1 }]);
      return null;
    }

    // eslint-disable-next-line no-underscore-dangle
    if (cartState.find(({ _id }: any) => _id === item._id)) {
      const newCart = cartState.map((product: LocalStorageProduct) => {
        // eslint-disable-next-line no-underscore-dangle
        if (product._id === item._id) {
          return {
            ...product,
            count: product.count + 1,
          };
        }
        return product;
      });
      cartStore.setCart(newCart);
      return null;
    }
    cartStore.setCart([...cartState, { ...item, count: 1 }]);
    return null;
  };
  return (
    <PageLayout title="Landing">
      <Box
        p={{
          xs: '2rem 1rem 0',
          lg: '5rem 0 0',
        }}
      >
        {products.map((product, index) => (
          <Box
            display="flex"
            flexDirection={{ xs: 'column', lg: 'row' }}
            alignItems="space-between"
            mb={index === products.length - 1 ? '0' : '15rem'}
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
              <Button
                variant="outlined"
                color="primary"
                onClick={handleProduct(product)}
              >
                Купити
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </PageLayout>
  );
};

export default Products;
