import React from 'react';
import { Box } from '@material-ui/core';
import NextLink from 'next/link';
import { useTranslation } from 'next-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Box
      m="10rem 0 2rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontWeight="bold"
      color="inerhit"
    >
      <NextLink href="/terms-and-conditions">
        {t('terms-and-conditions')}
      </NextLink>
    </Box>
  );
};

export default Footer;
