import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PageLayout from 'components/PageLayout/PageLayout';

const TermsAndConditions = () => {
  const { t } = useTranslation(['terms', 'common']);
  const style = {
    text: { marginBottom: '4rem' },
    title: { marginBottom: '1rem', fontWeight: 600 },
  };
  return (
    <PageLayout title="Сидр дегустатор | Купить сидр">
      <Box mt="4rem">
        <Typography variant="h5" style={style.title}>
          {t('title')}
        </Typography>
        <Typography variant="body1" style={style.text}>
          {t('titleText')}
        </Typography>
        <Typography variant="h5" style={style.title}>
          {t('pay')}
        </Typography>
        <Typography variant="body1" style={style.text}>
          {t('payText')}
        </Typography>
        <Typography variant="h5" style={style.title}>
          {t('delivery')}
        </Typography>
        <Typography variant="body1" style={style.text}>
          {t('deliveryText')}
        </Typography>
        <Typography variant="h5" style={style.title}>
          {t('when')}
        </Typography>
        <Typography variant="body1" style={style.text}>
          {t('when1')}
        </Typography>
        <Typography variant="body1" style={style.text}>
          {t('when2')}
        </Typography>
        <Typography variant="h5" style={style.title}>
          {t('price')}
        </Typography>
        <Typography variant="body1" style={style.text}>
          {t('priceText')}
        </Typography>
        <Typography variant="h5" style={style.title}>
          {t('take')}
        </Typography>
        <Typography variant="body1" style={style.text}>
          {t('takeText')}
        </Typography>
        <Typography variant="h5" style={style.title}>
          {t('return')}
        </Typography>
        <Typography variant="body1" style={style.text}>
          {t('returnText')}
        </Typography>
        <Typography variant="h5" style={style.title}>
          {t('save')}
        </Typography>
        <Typography variant="body1" style={style.text}>
          {t('saveText')}
        </Typography>
        <Typography variant="h5" style={style.title}>
          {t('order')}
        </Typography>
        <Typography variant="body1" style={style.text}>
          {t('orderText')}
        </Typography>
      </Box>
    </PageLayout>
  );
};

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['terms', 'common'])),
    },
  };
}

export default TermsAndConditions;
