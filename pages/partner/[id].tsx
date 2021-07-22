/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import useSwr from 'swr';
import styled from 'styled-components';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import PageHeader from 'components/PageHeader/PageHeader';
import ProductsCarousel from 'components/ProductsCarousel';

const ContainerStyled = styled(Container)`
  max-width: 1140px;
  margin: 10rem auto 0;
  padding: 30px 0 10px;
`;

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Partner = () => {
  const { query } = useRouter();
  const { data } = useSwr(
    (): string => (query.id && `/api/partner/${query.id}`) || '',
    fetcher
  );
  if (!data) {
    return null;
  }
  const { partner, products } = data.data;
  return (
    <>
      <PageHeader />
      <ContainerStyled disableGutters maxWidth={false}>
        <Head>
          <title>{partner.name}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Box component="main" display="flex" justifyContent="space-between">
          <Box width={{ xs: '90%', lg: '45%' }}>
            <Image src={partner.logo} width="270px" height="136px" />
          </Box>
          <Box width={{ xs: '90%', lg: '45%' }}>
            <Box mb="4rem">
              <Typography variant="h2" color="textSecondary">
                {partner.name}
              </Typography>
            </Box>
            <Box>
              <Typography>{partner.description}</Typography>
            </Box>
          </Box>
        </Box>

        <ProductsCarousel title={`Товары ${partner.name}`} items={products} />
      </ContainerStyled>
      <PageHeader isFooter />
    </>
  );
};

export default Partner;
