import React from 'react';
import Slider from 'react-slick';
import { Box, Typography, Button } from '@material-ui/core';
import BlogItem from 'components/BlogCarousel/BlogItem';

type BlogCarouselProps = {
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

const BlogCarousel = ({ title = 'BlogCarousel', items }: BlogCarouselProps) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  return (
    <Box mt="10rem">
      <Typography variant="h4" component="h4" color="textSecondary" align="center" gutterBottom>{title}</Typography>
      <Slider {...settings}>
        <BlogItem />
        <BlogItem />
        <BlogItem />
      </Slider>
      <Box display="flex" alignItems="center" justifyContent="center" mt="3rem"> 
        <Button variant="outlined" color="primary" size="large">Перейти в блог</Button>
      </Box>
    </Box>
  )
};

export default BlogCarousel;
