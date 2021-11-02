/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { RecoilRoot } from 'recoil';
import SwiperCore, { EffectFade, Autoplay, Navigation } from 'swiper/core';
import AppComponents from 'components/AppComponents';

import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

import nextI18NextConfig from '../next-i18next.config';

SwiperCore.use([EffectFade, Autoplay, Navigation]);

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Подборка лучших сидров специально для Ваc</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <RecoilRoot>
        <AppComponents Component={Component} pageProps={pageProps} />
      </RecoilRoot>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.node.isRequired,
  pageProps: PropTypes.any.isRequired,
};

export default appWithTranslation(MyApp, nextI18NextConfig);
