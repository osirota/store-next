import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import styled from 'styled-components';
import { Box, Typography, Button } from '@material-ui/core';
import BlogItem from 'components/BlogCarousel/BlogItem';

const BarrelWrapper = styled(Box)`
  position: absolute;
  right: -189px;
  top: -220px;
`;
const BottleWrapper = styled(Box)`
  position: absolute;
  bottom: -280px;
  left: -190px;
`;

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
    <Box mt="5rem" position="relative">
      <BarrelWrapper>
        <Image src="/barrel.png" width={200} height={400} />
      </BarrelWrapper>
      <BottleWrapper>
        <Image src="/bottles.png" width={200} height={400} />
      </BottleWrapper>
      <Typography variant="h4" component="h4" color="textSecondary" align="center" gutterBottom>{title}</Typography>
      <Box mt="4rem">
        <Slider {...settings}>
          <BlogItem />
          <BlogItem />
          <BlogItem />
        </Slider>
        </Box>
      <Box display="flex" alignItems="center" justifyContent="center" mt="3rem"> 
        <Button variant="outlined" color="primary" size="large">Перейти в блог</Button>
      </Box>
    </Box>
  )
};

export default BlogCarousel;
