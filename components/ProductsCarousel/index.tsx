import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@material-ui/core';
import ProductItem from 'components/ProductsCarousel/ProductItem';

type ProductsCarouselProps = {
  title?: string,
  items?: {
    id: string,
    url: string,
    description: string,
    composition: string,
    volume: string,
    price: string,
  } 
};

const ProductsCarousel = ({ title = 'ProductsCarousel', items }: ProductsCarouselProps) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };
  return (
    <Box mt="10rem">
        <Typography variant="h4" component="h4" color="textSecondary" align="center" gutterBottom>{title}</Typography>
        <Box mt="4rem">
          <Slider {...settings}>
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
          </Slider>
        </Box>
      </Box>
  )
};

export default ProductsCarousel;
