import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Typography } from '@material-ui/core';
import ProductItem from 'components/ProductsCarousel/ProductItem';

type ProductsCarouselProps = {
  title?: string
};

const ProductsCarousel = ({ title = 'ProductsCarousel' }: ProductsCarouselProps) => {
  const settings = {
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
        slidesPerView: 4,
        spaceBetween: 50,
      },
    },
  };
  return (
    <Box mt="10rem">
      <Typography variant="h4" component="h4" color="textSecondary" align="center" gutterBottom>
        {title}
      </Typography>
      <Box mt="4rem">
        <Swiper {...settings}>
          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>
          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>
          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>
          <SwiperSlide>
            <ProductItem />
          </SwiperSlide>
        </Swiper>
      </Box>
    </Box>
  )
}

ProductsCarousel.defaultProps = {
  title: null,
};

export default ProductsCarousel;
