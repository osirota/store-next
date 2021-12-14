import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Typography } from '@material-ui/core';
import styled from 'styled-components';
import BoxesItem from 'components/BoxesCarousel/BoxesItem';
import { Boxes } from 'interfaces';
import NextLinkStyle from 'patterns/NextLinkStyle';

type BoxesCarouselProps = {
  // eslint-disable-next-line react/require-default-props
  title?: string;
  items: Boxes[];
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

const BoxesCarousel = ({
  title = 'BoxesCarousel',
  items = [],
}: BoxesCarouselProps) => {
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
      <SliderStyled mt="2rem">
        <Swiper {...settings}>
          {items.map((item) => (
            <SwiperSlide key={item.name + item.mixes}>
              <BoxesItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
        <NextLinkStyle link="/boxes" text="boxes" />
      </SliderStyled>
    </Box>
  );
};

export default BoxesCarousel;
