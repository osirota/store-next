/* eslint-disable no-unused-vars */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Typography } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { themeState } from 'recoils/themeType';

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

interface Partner {
  _id: string;
  name: string;
  logoLight: string;
  logoDark: string;
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
  const mode = useRecoilValue(themeState);
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
    navigation: false,
  };

  const choosenLogo = (logoLight: string, logoDark: string) => {
    return mode === 'dark' && logoDark ? logoDark : logoLight;
  };

  return (
    <Box mt="5rem" position="relative">
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
      <SliderStyled>
        <Swiper {...settings}>
          {items.map(({ logoLight, logoDark, _id }) => (
            <SwiperSlide key={logoLight}>
              <Box position="relative" width="80%" height="240px">
                <Link href={`/partner/${_id}`}>
                  <Image
                    src={choosenLogo(logoLight, logoDark)}
                    layout="fill"
                    objectFit="contain"
                  />
                </Link>
              </Box>
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
