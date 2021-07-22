import React from 'react';
import { Link, Box, Typography, Grid, Button } from '@material-ui/core';
import { withFormik, Form } from 'formik';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSwr from 'swr';
import Image from 'next/image';
import styled from 'styled-components';

import PageLayout from 'components/PageLayout/PageLayout';
import ProductsCarousel from 'components/ProductsCarousel';
import PartnerCarousel from 'components/PartnerCarousel';
import Field from 'patterns/Field';
import {
  mapPropsToValues,
  handleSubmit,
  validationSchema,
} from 'utils/landing/landing-form';

import Mail from '../public/icons/mail.svg';
import Facebook from '../public/icons/facebook.svg';
import Instagram from '../public/icons/instagram.svg';
import Phone from '../public/icons/phone.svg';

const SliderWrapper = styled(Box)`
  .swiper-container {
    width: 300px;
    height: 100%;

    @media (max-width: 775px) {
      width: 200px;
    }
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }
  .swiper-container-3d .swiper-slide-shadow-right,
  .swiper-container-3d .swiper-slide-shadow-left {
    background-image: none;
  }
`;

const ImageWrapper = styled(Box)`
  z-index: -1;
  & div {
    top: 8rem !important;
    height: 84%;
    width: 43%;
    left: 27rem !important;
  }
  @media (max-width: 1300px) {
    & div {
      top: 25rem !important;
      height: 84%;
      width: 66%;
      left: 11rem !important;
    }
  }
`;
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const LandingPage = () => {
  const { data } = useSwr('/api/landing', fetcher);
  if (!data) {
    return null;
  }
  const { partners, products } = data.data;
  return (
    <PageLayout title="Landing">
      <Box
        pt="5rem"
        p={{
          xs: '2rem 1rem 0',
          lg: '0',
        }}
      >
        <Grid container spacing={2}>
          <ImageWrapper>
            <Image
              layout="fill"
              objectFit="cover"
              src="/apple-bg.gif"
              quality={100}
            />
          </ImageWrapper>
          <Grid lg={12} xs={12} item>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              paddingTop="10rem"
              height="100%"
            >
              <Box>
                <Typography color="textSecondary" variant="h3">
                  Підбірка найкращих сидрів спеціально для Вас
                </Typography>
                <Box width="60%" mt="2rem">
                  <Typography>
                    Cider Enthusiasts ретельно відібрали найкращі позиції, які
                    не залишать байдужим нікого.
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Link href="tel:80000000" color="textPrimary">
                  <Phone /> +38 (097) 33-234-23
                </Link>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Link href="https://www.instagram.com/livekharkov/">
                    <Facebook />
                  </Link>
                  <Box m="0 2rem">
                    <Link href="https://www.instagram.com/livekharkov/">
                      <Instagram />
                    </Link>
                  </Box>
                  <Link href="mailto:oleh.sirota@gmail.com">
                    <Mail />
                  </Link>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box mt="20rem">
        <Typography variant="h4" color="textSecondary" align="center">
          Про нас
        </Typography>
        <Box
          mt="8rem"
          display="flex"
          justifyContent="space-between"
          flexDirection={{ xs: 'column', lg: 'row' }}
        >
          <Box width={{ xs: '90%', lg: '45%' }}>
            <SliderWrapper>
              <Swiper
                effect="cube"
                grabCursor
                cubeEffect={{
                  shadow: true,
                  slideShadows: true,
                  shadowOffset: 20,
                  shadowScale: 0.94,
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                loop
              >
                {products.map(({ logo, name }) => (
                  <SwiperSlide>
                    <Box
                      display="flex"
                      alignItems="center"
                      flexDirection="column"
                    >
                      <Image src={logo} alt="bottle" width={300} height={500} />
                      <Box mt="1.5rem">
                        <Typography>{name}</Typography>
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </SliderWrapper>
          </Box>
          <Box width={{ xs: '90%', lg: '45%' }}>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Box>
        </Box>
      </Box>

      <ProductsCarousel title="Сидр та Перрі" items={products} />
      <PartnerCarousel title="Наші партнери" items={partners} />

      <Box
        mt="10rem"
        p={{
          xs: '2rem 1rem 0',
          lg: '0',
        }}
        width="100%"
      >
        <Typography variant="h4" color="textSecondary" align="center">
          Контакты
        </Typography>
        <Box
          mt="2rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ xs: 'column', lg: 'row' }}
          width={{ xs: '90%', lg: '100%' }}
        >
          <Box width={{ xs: '90%', lg: '45%' }}>
            <Form noValidate>
              <Field name="name" label="Имя" />
              <Field name="email" label="Email" />
              <Field name="phone" label="Номер телефона" />
              <Field name="text" label="Повідомлення" />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt="2rem"
              >
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  type="submit"
                >
                  Звязатись з нами
                </Button>
              </Box>
            </Form>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            width={{ xs: '90%', lg: '45%' }}
            pt="2rem"
          >
            <Link href="tel:80000000" color="textPrimary">
              <Phone /> +38 (097) 33-234-23
            </Link>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt="2rem"
            >
              <Link href="https://www.instagram.com/livekharkov/">
                <Facebook />
              </Link>
              <Box m="0 2rem">
                <Link href="https://www.instagram.com/livekharkov/">
                  <Instagram />
                </Link>
              </Box>
              <Link href="mailto:oleh.sirota@gmail.com">
                <Mail />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues,
  handleSubmit,
  validationSchema,
})(LandingPage);
