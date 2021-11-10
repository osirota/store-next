import React from 'react';
import { Link, Box, Typography, Grid, Button } from '@material-ui/core';
import { withFormik, Form } from 'formik';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSwr from 'swr';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import NextLink from 'next/link';
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
    @media (max-width: 775px) {
    }
  }
  .swiper-container-3d .swiper-slide-shadow-right,
  .swiper-container-3d .swiper-slide-shadow-left {
    background-image: none;
  }
`;

const IconWrapper = styled(Box)`
  position: relative;
  :before {
    content: '';
    position: absolute;
    top: -160px;
    left: 50%;
    transform: translatex(-50%);
    width: 2px;
    height: 150px;
    background: #eaef10;
  }
  :after {
    content: '';
    position: absolute;
    bottom: -62px;
    left: 50%;
    transform: translatex(-50%);
    width: 2px;
    height: 150px;
    background: #eaef10;
  }
`;

const NextLinkStyled = styled('p')`
  display: inline-block;
  background: #eaef10;
  font-weight: bold;
  font-size: 18px;
  color: #171b26;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  padding: 7px 27px;
  margin: 20px 0 0;
`;

const ImagesWrapper = styled(Box)`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin: 0 40px 0 0;
`;

const MainImagewrapper = styled(Box)`
  position: absolute;
  right: -260px;
  bottom: 0;
`;

interface Product {
  alchol: string;
  count: number;
  name: string;
  partnerId: string;
  price: number;
  taste: string;
  _id: string;
  logo: string;
}

interface Partner {
  _id: string;
  name: string;
  logo: string;
  description: string;
}
interface IFetch {
  products: Product[];
  partners: Partner[];
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const LandingPage = () => {
  const { t } = useTranslation(['landing', 'common']);
  const { data } = useSwr('/api/landing', fetcher);
  if (!data) {
    return null;
  }

  const { partners, products }: IFetch = data.data;
  return (
    <PageLayout title="Сидр дегустатор | Купить сидр">
      <Box
        pt="5rem"
        p={{
          xs: '2rem 1rem 0',
          lg: '0',
        }}
      >
        <Grid container spacing={2}>
          <Grid lg={12} xs={12} item>
            <Box display="flex" padding="10rem 0 0 3rem">
              <IconWrapper
                display="flex"
                flexDirection="column"
                alignItems="center"
                mr="64px"
              >
                <Link
                  href="https://www.facebook.com/Cider-Degustator-111374164534274"
                  target="_blank"
                >
                  <Facebook />
                </Link>
                <Box margin="15px 0">
                  <Link
                    href="https://www.instagram.com/cider_degustator/"
                    target="_blank"
                  >
                    <img src="/icons/Instagram.svg" alt="insta" />
                  </Link>
                </Box>
                <Link href="mailto:ciderdegustator@gmail.com">
                  <Mail />
                </Link>
              </IconWrapper>
              <Box width="45%">
                <Typography
                  style={{
                    fontWeight: 700,
                  }}
                  variant="h4"
                >
                  {t('title')}
                </Typography>
                <Box mt="2rem">
                  <Typography
                    style={{
                      fontWeight: 700,
                    }}
                    variant="body1"
                  >
                    {t('description')}
                  </Typography>
                </Box>
                <NextLink href="/products">
                  <NextLinkStyled>
                    {t('siders', { ns: 'common' })}
                  </NextLinkStyled>
                </NextLink>
              </Box>
            </Box>
            <Box
              marginTop="128px"
              display="flex"
              alignItems="center"
              position="relative"
            >
              <ImagesWrapper>
                <Image
                  src="https://res.cloudinary.com/df6zjl5hp/image/upload/v1636487360/Apple_kibh1n.png"
                  alt="logo"
                  width="200px"
                  height="200px"
                />
              </ImagesWrapper>
              <ImagesWrapper>
                <Image
                  src="https://res.cloudinary.com/df6zjl5hp/image/upload/v1636487359/Apples_d6adxn.png"
                  alt="logo"
                  width="200px"
                  height="200px"
                />
              </ImagesWrapper>
              <MainImagewrapper>
                <Image
                  src="https://res.cloudinary.com/df6zjl5hp/image/upload/v1636486626/BG_apple_b9qu9i.png"
                  alt="logo"
                  width="800px"
                  height="700px"
                />
              </MainImagewrapper>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box mt="20rem">
        <Typography variant="h4" align="center">
          {t('aboutUs')}
        </Typography>
        <Box
          mt="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ xs: 'column', lg: 'row' }}
        >
          <Box width={{ xs: '100%', lg: '45%' }}>
            <SliderWrapper>
              <Swiper
                setWrapperSize
                grabCursor
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                loop
              >
                {products.map(({ logo, name }) => (
                  <SwiperSlide key={name}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
                    >
                      <Box
                        position="relative"
                        width="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Image
                          src={logo}
                          alt="bottle"
                          layout="fixed"
                          width="250px"
                          height="450px"
                        />
                      </Box>
                      <Box mt="1.5rem">
                        <Typography>{name}</Typography>
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </SliderWrapper>
          </Box>
          <Box
            width={{ xs: '100%', lg: '45%' }}
            p={{ xs: '0 0.5rem', lg: '0' }}
            m={{ xs: '1rem 0 0', lg: '0' }}
          >
            <Typography align="center">{t('philosophy')}</Typography>
          </Box>
        </Box>
      </Box>

      <ProductsCarousel title={t('titleSiders')} items={products} />
      <PartnerCarousel title={t('titlePartners')} items={partners} />

      <Box
        mt="10rem"
        p={{
          xs: '2rem 1rem 0',
          lg: '0',
        }}
        width="100%"
      >
        <Typography variant="h4" align="center">
          {t('contacts')}
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
              <Field name="name" label={t('name')} />
              <Field name="email" label="Email" />
              <Field name="phone" label={t('phone')} />
              <Field name="text" label={t('message')} />
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt="2rem"
              >
                <Button variant="outlined" size="large" type="submit">
                  {t('callBack')}
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
            <Link href="tel:+380505008863">
              <Phone /> +38 (050) 500-88-63
            </Link>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt="2rem"
            >
              <Link
                href="https://www.facebook.com/Cider-Degustator-111374164534274"
                target="_blank"
              >
                <Facebook />
              </Link>
              <Box m="0 2rem">
                <Link
                  href="https://www.instagram.com/cider_degustator/"
                  target="_blank"
                >
                  <Instagram />
                </Link>
              </Box>
              <Link href="mailto:ciderdegustator@gmail.com">
                <Mail />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
};

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['landing', 'common'])),
    },
  };
}

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues,
  handleSubmit,
  validationSchema,
})(LandingPage);
