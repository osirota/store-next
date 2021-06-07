import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@material-ui/core';
import Image from 'next/image';
import styled from 'styled-components';

const SliderStyled = styled(Box)`
  margin: 4rem 0 0;
  cursor: pointer;
  & .slick-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
  }
  & .slick-slide:hover {
    background: url('/bg-product.png') center no-repeat;
    border-radius: 40px;
  }
`;

const GlassWrapper = styled(Box)`
  position: absolute;
  right: -189px;
  bottom: -220px;
`;

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
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Box mt="5rem" position="relative">
      <GlassWrapper>
        <Image src="/glass.png" width={150} height={250} />
      </GlassWrapper>
      <Typography variant="h4" component="h4" color="textSecondary" align="center" gutterBottom>{title}</Typography>
      <SliderStyled>
        <Slider {...settings}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Image src="/partner.png"  width="160px" height="80px" />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Image src="/partner.png"  width="160px" height="80px" />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Image src="/partner.png"  width="160px" height="80px" />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Image src="/partner.png"  width="160px" height="80px" />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Image src="/partner.png"  width="160px" height="80px" />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Image src="/partner.png"  width="160px" height="80px" />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Image src="/partner.png"  width="160px" height="80px" />
          </Box>
        </Slider>
      </SliderStyled>
    </Box>
  )
};

export default PartnerCarousel;
