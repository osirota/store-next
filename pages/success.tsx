import React from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Head from 'next/head';
import PageHeader from 'components/PageHeader/PageHeader';

const ContainerStyled = styled(Container)`
  max-width: 1140px;
  margin: 0 auto;
  padding: 30px 0 10px;
`;

const gifsList = [
  'https://giphy.com/embed/E3L5goMMSoAAo',
  'https://giphy.com/embed/l4Jzgmad24DGBqQ4U',
  'https://giphy.com/embed/xUPGcJjbg9V801eBhK',
  'https://giphy.com/embed/3ov9jEE0R2rdtWUKlO',
  'https://giphy.com/embed/8Iv5lqKwKsZ2g',
  'https://giphy.com/embed/HloNK1z39EkEQcreIo',
  'https://giphy.com/embed/f9RzoxHizH72k15FKS',
];
const Success = () => {
  const { t } = useTranslation('success');
  const randomIndex = Math.floor(Math.random() * gifsList.length);
  const src = gifsList[randomIndex];
  return (
    <>
      <PageHeader />
      <ContainerStyled disableGutters maxWidth={false}>
        <Head>
          <title>Оформлення Замовлення</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box width="400px" height="400px">
            <iframe
              src={src}
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              title="1"
            />
          </Box>
          <Typography style={{ margin: '3rem 0' }} variant="h1">
            {t('Thank you')}
          </Typography>
          <Typography>{t('thankTitle')}</Typography>
        </Box>
      </ContainerStyled>
    </>
  );
};

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['success', 'common'])),
    },
  };
}

export default Success;
