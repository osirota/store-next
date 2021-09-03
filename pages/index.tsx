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
    @media (max-width: 775px) {
      width: 200px;
    }
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
  @media (max-width: 775px) {
    & div {
      top: 25rem !important;
      height: 84%;
      width: 100%;
      left: 0rem !important;
    }
  }
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
  const { data } = useSwr('/api/landing', fetcher);
  if (!data) {
    return null;
  }
  const { partners, products }: IFetch = data.data;
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
                <Typography color="textSecondary" variant="h4">
                  Підбірка найкращих сидрів спеціально для Вас
                </Typography>
                <Box width="60%" mt="2rem">
                  <Typography variant="body1">
                    Cider Degustator ретельно відібрали найкращі позиції, які не
                    залишать байдужим нікого.
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Link href="tel:+380505008863" color="textPrimary">
                  <Phone /> +38 (050) 500-88-63
                </Link>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
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
          </Grid>
        </Grid>
      </Box>

      <Box mt="20rem">
        <Typography variant="h4" color="textSecondary" align="center">
          Про нас
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
                          width="600px"
                          height="800px"
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
            <Typography align="center">
              В основу філософії компанії «Cider Degustator» ми вкладаємо сенс
              про те, що абсолютно кожна людина є фахівцем, що визначає на смак
              якість продукту. Іншими словами, людина - оцінює напій,
              користуючись власними органами почуттів. Численні спроби в
              дегустації, покращують рецептори до оцінки орналептіческіхсвойств
              продукту і расшіреніялінейкі смаків і запахів. Мета нашої компанії
              - різноманітність і відкриття нових відчуттів. Розкриття особистих
              можливостей в області сприйняття. Показати «дегустують» незвідані
              кордони і визначити його переваги і бажання. Адже що б здивувати,
              доводиться багато пробоватьчтоби домогтися разлічнихсочетаній
              смаку
            </Typography>
          </Box>
        </Box>
      </Box>

      <ProductsCarousel title="Сидри" items={products} />
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
          Контакти
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
              <Field name="name" label="Ім'я" />
              <Field name="email" label="Email" />
              <Field name="phone" label="Номер телефону" />
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
            <Link href="tel:+380505008863" color="textPrimary">
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

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues,
  handleSubmit,
  validationSchema,
})(LandingPage);
