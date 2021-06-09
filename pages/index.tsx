import React, { useState } from 'react';
import {
  Link,
  Box,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import { withFormik, Form } from 'formik';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import styled from 'styled-components';

import PageLayout from 'components/PageLayout/PageLayout';
import ProductsCarousel from 'components/ProductsCarousel';
import PartnerCarousel from 'components/PartnerCarousel';
import BlogCarousel from 'components/BlogCarousel';
import Field from 'patterns/Field';
import { mapPropsToValues, handleSubmit, validationSchema } from 'utils/landing/landing-form';

import Mail from '../public/icons/mail.svg';
import Facebook from '../public/icons/facebook.svg';
import Instagram from '../public/icons/instagram.svg';
import Phone from '../public/icons/phone.svg';
import Apple from '../public/apple.svg';

const AppleWrapper = styled(Box)`
  position: absolute;
  left: 0;
`
const SliderWrapper = styled(Box)`
  .swiper-container {
    width: 300px;
    height: 100%;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }
  .swiper-container-3d .swiper-slide-shadow-right, .swiper-container-3d .swiper-slide-shadow-left {
    background-image: none;
  }
`


const LandingPage = () => {


  return (
    <PageLayout title="Landing">
      <Box mt="40px">
        <Grid container spacing={2}>
          <Grid xs={7} item>
              <Box display="flex" flexDirection="column" justifyContent="space-between" paddingTop="10rem" height="100%">
                <Box>
                  <Typography color="textSecondary" variant="h3">
                    Підбірка найкращих сидрів спеціально для Вас
                  </Typography>
                  <Box width="60%" mt="2rem">
                    <Typography>
                      Cider Enthusiasts ретельно відібрали найкращі позиції, які  не залишать байдужим нікого.
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Link href="tel:80000000" color="textPrimary">
                    <Phone /> +38 (097) 33-234-23
                  </Link>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
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

          <Grid container xs={5} item alignItems="center" justify="center" direction="column">
            <SliderWrapper>
              <Swiper 
                effect={'cube'} 
                grabCursor={true} 
                cubeEffect={{
                  "shadow": true,
                  "slideShadows": true,
                  "shadowOffset": 20,
                  "shadowScale": 0.94
                }}
                autoplay={{
                  "delay": 2500,
                  "disableOnInteraction": false
                }}
                loop={true}
              >
                <SwiperSlide>
                  <Box display="flex" alignItems="center" flexDirection="column">
                    <Image src="/sider.png" alt="bottle" width={160} height={600} />
                    <Box mt="1.5rem">
                      <Typography>
                        Сидр "Poma Aurea"
                      </Typography>
                    </Box>
                  </Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box display="flex" alignItems="center" flexDirection="column">
                    <Image src="/sider.png" alt="bottle" width={160} height={600} />
                    <Box mt="1.5rem">
                      <Typography>
                        Сидр "Poma Aurea"
                      </Typography>
                    </Box>
                  </Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box display="flex" alignItems="center" flexDirection="column">
                    <Image src="/sider.png" alt="bottle" width={160} height={600} />
                    <Box mt="1.5rem">
                      <Typography>
                        Сидр "Poma Aurea"
                      </Typography>
                    </Box>
                  </Box>
                </SwiperSlide>

              </Swiper>
            </SliderWrapper>
          </Grid>
        </Grid>
      </Box>

      <Box mt="10rem" p="2rem 0 0 32rem">
        <AppleWrapper>
          <Image src="/apple.png" alt="apple" width={600} height={600} />
        </AppleWrapper>
        <Typography variant="h4" color="textSecondary">Про нас</Typography>
        <Box mt="2rem">
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Box>
      </Box>

      <ProductsCarousel title="Новинки" />
      <BlogCarousel title="Блог" />
      <ProductsCarousel title="Сидр та Перрі" />
      <PartnerCarousel title="Наші партнери" />

      <Box mt="10rem">
        <Typography variant="h4" color="textSecondary" align="center">Контакты</Typography>
        <Box mt="2rem" display="flex" justifyContent="space-between">
          <Box width="45%">
            <Form noValidate>
              <Field
                name="name"
                label="Имя"
              />
              <Field
                name="email"
                label="Email"
              />
              <Field
                name="phone"
                label="Номер телефона"
              />
              <Field
                name="text"
                label="Повідомлення"
              />
              <Box display="flex" alignItems="center" justifyContent="center" mt="2rem">
                <Button variant="outlined" color="primary" size="large">Зв'язатись з нами</Button>
              </Box>
            </Form>
          </Box>
          <Box display="flex" alignItems="center" flexDirection="column" width="45%" pt="2rem">
            <Link href="tel:80000000" color="textPrimary">
              <Phone /> +38 (097) 33-234-23
            </Link>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt="2rem">
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
  )
};

export default withFormik({
  enableReinitialize: true,
  mapPropsToValues,
  handleSubmit,
  validationSchema,
})(LandingPage);
