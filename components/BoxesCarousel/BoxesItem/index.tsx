import React, { useState, useLayoutEffect } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
} from '@material-ui/core';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

import cartStore from 'store/cart';
import snackbarStore from 'store/snackbar';
import { Boxes } from 'interfaces';

const CardStyled = styled(Card)`
  background: transparent;
  padding: 1rem;
  box-shadow: none;
  height: 1030px;
  [data-image] {
    transform: rotate(0deg);
    transition: all 0.5s;
  }

  @media (max-width: 1024px) {
    :hover {
      background: transparent;
    }
  }
`;

const CardContentStyled = styled(CardContent)`
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const TitleWrapper = styled(Typography)`
  margin: 10px 0;
  height: 95px;
`;

interface LocalStorageProduct extends Boxes {
  count: number;
}

type BoxesItemProps = {
  item?: Boxes;
};

const BoxesItem = ({ item }: BoxesItemProps) => {
  const { t } = useTranslation();
  const [cartState, setCartState] = useState(cartStore.initialState());

  useLayoutEffect(() => {
    cartStore.subscribe(setCartState);
    cartStore.init();
  }, []);
  if (!item) {
    return null;
  }

  const handleProduct = () => {
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
  const title = `${item.name}`;
  const price = `${item.price} ${t('uah')}`;
  return (
    <>
      <CardStyled>
        <CardContentStyled>
          <Box
            position="relative"
            width="100%"
            height="450px"
            data-image
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={item.logo}
              alt="bottle"
              width="300px"
              height="350px"
              layout="fixed"
            />
          </Box>
          <TitleWrapper variant="h5" align="center" gutterBottom>
            {title}
          </TitleWrapper>
          <Typography variant="h6" align="center" gutterBottom>
            {item.mixes}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {item.description}
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            {price}
          </Typography>
        </CardContentStyled>
        <CardActions>
          <Button variant="outlined" fullWidth onClick={handleProduct}>
            {t('buy')}
          </Button>
        </CardActions>
      </CardStyled>
    </>
  );
};

BoxesItem.defaultProps = {
  item: null,
};

export default BoxesItem;
