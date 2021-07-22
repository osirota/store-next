/* eslint-disable no-unused-vars */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Typography } from '@material-ui/core';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const SliderStyled = styled(Box)`
  margin: 4rem 0 0;
  cursor: pointer;
  & .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
  }
  & .swiper-slide:hover {
    background: url('/bg-product.png') center no-repeat;
    border-radius: 40px;
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

const GlassWrapper = styled(Box)`
  position: absolute;
  right: -189px;
  bottom: -220px;
  @media (max-width: 1300px) {
    right: -70px;
  }
  @media (max-width: 1200px) {
    display: none;
  }
`;

interface Partner {
  _id: string;
  name: string;
  logo: string;
  description: string;
}

type PartnerCarouselProps = {
  title?: string;
  items?: Partner[];
};

const PartnerCarousel = ({
  title = 'PartnerCarousel',
  items = [],
}: PartnerCarouselProps) => {
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
        slidesPerView: items.length,
        spaceBetween: 0,
      },
    },
    navigation: true,
  };
  return (
    <Box mt="5rem" position="relative">
      <GlassWrapper>
        <Image src="/glass.png" width={150} height={250} />
      </GlassWrapper>
      <Typography
        variant="h4"
        component="h4"
        color="textSecondary"
        align="center"
        gutterBottom
      >
        {title}
      </Typography>
      <SliderStyled>
        <Swiper {...settings}>
          {items.map(({ logo, _id }) => (
            <SwiperSlide key={logo}>
              <Link href={`/partner/${_id}`}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Image src={logo} width="160px" height="160px" />
                </Box>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </SliderStyled>
    </Box>
  );
};

PartnerCarousel.defaultProps = {
  items: null,
  title: null,
};

export default PartnerCarousel;
