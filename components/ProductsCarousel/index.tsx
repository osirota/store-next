import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import NextLink from 'next/link';
import { Box, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import ProductItem from 'components/ProductsCarousel/ProductItem';

interface Products {
  alchol: string;
  name: string;
  partnerId: string;
  taste: string;
  logo: string;
  _id: string;
  price: number;
}

type ProductsCarouselProps = {
  title?: string;
  items: Products[];
};

const SliderStyled = styled(Box)`
  margin: 4rem 0 0;
  & .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
  }
  & .swiper-button-next,
  & .swiper-button-prev {
    color: #fff;
  }
  & .swiper-button-prev,
  .swiper-container-rtl .swiper-button-next {
    left: 0;
  }
  & .swiper-button-next,
  .swiper-container-rtl .swiper-button-prev {
    right: 0;
  }
`;

const NextLinkStyled = styled('p')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 210px;
  background: #eaef10;
  border: 1px solid transparent;
  font-weight: bold;
  font-size: 18px;
  color: #171b26;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  padding: 7px 27px;
  margin: 20px auto;
  transition: all 0.5s;
  :hover {
    background: transparent;
    border: 1px solid #eaef10;
    color: #fff;
  }
`;

const ProductsCarousel = ({
  title = 'ProductsCarousel',
  items = [],
}: ProductsCarouselProps) => {
  const { t } = useTranslation(['landing', 'common']);
  const settings = {
    navigation: true,
    breakpoints: {
      '640': {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      '768': {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      '1024': {
        slidesPerView: items.length >= 3 ? 3 : items.length,
        spaceBetween: 10,
      },
    },
  };
  return (
    <Box mt="10rem">
      <Typography
        variant="h4"
        component="h4"
        align="center"
        gutterBottom
        style={{
          fontWeight: 700,
        }}
      >
        {title}
      </Typography>
      <SliderStyled mt="4rem">
        <Swiper {...settings}>
          {items.map((item) => (
            <SwiperSlide key={item.name}>
              <ProductItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </SliderStyled>
      <NextLink href="/products">
        <NextLinkStyled>{t('siders', { ns: 'common' })}</NextLinkStyled>
      </NextLink>
    </Box>
  );
};

ProductsCarousel.defaultProps = {
  title: null,
};

export default ProductsCarousel;
