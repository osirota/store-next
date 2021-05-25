import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@material-ui/core';

type PartnerCarouselProps = {
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

const PartnerCarousel = ({ title = 'PartnerCarousel', items }: PartnerCarouselProps) => {
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
        <Slider {...settings}>
          ыы
        </Slider>
      </Box>
  )
};

export default PartnerCarousel;
