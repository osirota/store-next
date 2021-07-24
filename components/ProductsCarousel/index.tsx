import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Typography } from '@material-ui/core';
import styled from 'styled-components';
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
  cursor: pointer;
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

const ProductsCarousel = ({
  title = 'ProductsCarousel',
  items = [],
}: ProductsCarouselProps) => {
  const settings = {
    navigation: true,
    breakpoints: {
      '640': {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      '768': {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      '1024': {
        slidesPerView: items.length >= 3 ? 3 : items.length,
        spaceBetween: 50,
      },
    },
  };
  return (
    <Box mt="10rem">
      <Typography
        variant="h4"
        component="h4"
        color="textSecondary"
        align="center"
        gutterBottom
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
    </Box>
  );
};

ProductsCarousel.defaultProps = {
  title: null,
};

export default ProductsCarousel;
