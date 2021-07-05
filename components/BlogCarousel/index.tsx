import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import styled from 'styled-components';
import { Box, Typography, Button } from '@material-ui/core';
import BlogItem from 'components/BlogCarousel/BlogItem';

const BarrelWrapper = styled(Box)`
  position: absolute;
  right: -189px;
  top: -220px;
  @media (max-width: 1300px) {
    right: -65px;
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;

const BottleWrapper = styled(Box)`
  position: absolute;
  bottom: -280px;
  left: -190px;
  @media (max-width: 1300px) {
    left: -65px;
  }
`;

type BlogCarouselProps = {
  title?: string;
  items?: {
    id: string;
    url: string;
    description: string;
    composition: string;
    volume: string;
    price: string;
  };
};

const BlogCarousel = ({ title = 'BlogCarousel' }: BlogCarouselProps) => {
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
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
  };

  return (
    <Box mt="5rem" position="relative">
      <BarrelWrapper>
        <Image src="/barrel.png" width={200} height={400} />
      </BarrelWrapper>
      <BottleWrapper>
        <Image src="/bottles.png" width={200} height={400} />
      </BottleWrapper>
      <Typography
        variant="h4"
        component="h4"
        color="textSecondary"
        align="center"
        gutterBottom
      >
        {title}
      </Typography>
      <Box mt="4rem">
        <Swiper {...settings}>
          <SwiperSlide>
            <BlogItem />
          </SwiperSlide>
          <SwiperSlide>
            <BlogItem />
          </SwiperSlide>
          <SwiperSlide>
            <BlogItem />
          </SwiperSlide>
        </Swiper>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center" mt="3rem">
        <Button variant="outlined" color="primary" size="large">
          Перейти в блог
        </Button>
      </Box>
    </Box>
  );
};

BlogCarousel.defaultProps = {
  title: null,
  items: null,
};

export default BlogCarousel;
