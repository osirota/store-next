/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Box, Typography } from '@material-ui/core';
import useSwr from 'swr';
import { useRecoilValue } from 'recoil';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PageLayout from 'components/PageLayout/PageLayout';
import ProductsCarousel from 'components/ProductsCarousel';
import { themeState } from 'recoils/themeType';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Partner = () => {
  const { t } = useTranslation();
  const { query } = useRouter();
  const mode = useRecoilValue(themeState);
  const { data } = useSwr(
    (): string => (query.id && `/api/partner/${query.id}`) || '',
    fetcher
  );
  if (!data) {
    return null;
  }
  const { partner, products } = data.data;
  const choosenLogo = (logoLight: string, logoDark: string) => {
    return mode === 'dark' && logoDark ? logoDark : logoLight;
  };
  return (
    <PageLayout title={partner.name}>
      <Box
        component="main"
        display="flex"
        justifyContent="space-between"
        flexDirection={{ xs: 'column', lg: 'row' }}
      >
        <Box
          width={{ xs: '100%', lg: '45%' }}
          padding={{ xs: '0 1.5rem', lg: '0' }}
          m={{ xs: '2rem 0', lg: '0' }}
          display="flex"
          justifyContent="center"
        >
          <Box position="relative" width="100%" height="240px">
            <Image
              src={choosenLogo(partner.logoLight, partner.logoDark)}
              layout="fill"
              objectFit="contain"
            />
          </Box>
        </Box>
        <Box
          width={{ xs: '100%', lg: '45%' }}
          padding={{ xs: '0 1.5rem', lg: '0' }}
          m={{ xs: '2rem 0', lg: '0' }}
        >
          <Box mb="4rem">
            <Typography variant="h2">{partner.name}</Typography>
          </Box>
          <Box>
            <Typography>{partner.description}</Typography>
          </Box>
        </Box>
      </Box>

      <ProductsCarousel
        title={`${t('products')} ${partner.name}`}
        items={products}
      />
    </PageLayout>
  );
};

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Partner;
