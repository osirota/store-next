/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Box, Typography } from '@material-ui/core';
import useSwr from 'swr';
import Image from 'next/image';
import { useRouter } from 'next/router';

import PageLayout from 'components/PageLayout/PageLayout';
import ProductsCarousel from 'components/ProductsCarousel';

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
    <PageLayout title={products.name}>
      <Box component="main" display="flex" justifyContent="space-between">
        <Box width={{ xs: '90%', lg: '45%' }}>
          <Image src={partner.logo} width="270px" height="250px" />
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
    </PageLayout>
  );
};

export default Partner;
