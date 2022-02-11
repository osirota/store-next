import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import useSwr from 'swr';
import { useRouter } from 'next/router';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PageLayout from 'components/PageLayout/PageLayout';
import ProductItem from 'components/ProductItem';
import * as gtag from 'utils/gtag';

interface Product {
  alchol: string;
  count: number;
  name: string;
  partnerId: string;
  price: number;
  taste: string;
  _id: string;
  logo: string;
  description: string;
  color: string;
  matches: string;
  flavor: string;
  recommendation: string;
}

interface IFetch {
  products: Product[];
  partner: any;
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Products = () => {
  const { query } = useRouter();
  const { data } = useSwr(
    (): string => (query.id && `/api/partner/${query.id}`) || '',
    fetcher
  );

  useEffect(() => {
    gtag.event('screen_view', {
      screen_name: 'Bottles page',
    });
  }, []);

  if (!data) {
    return null;
  }
  const { products, partner }: IFetch = data.data;
  return (
    <PageLayout title={`Сидр дегустатор | Купить сидр ${partner.name}`}>
      <Box
        p={{
          xs: '2rem 1rem 0',
          lg: '5rem 0 0',
        }}
      >
        {products &&
          products.map((product, index) => (
            <ProductItem
              key={product.name}
              product={product}
              mb={
                index === products.length - 1
                  ? '0'
                  : { xs: '3rem', lg: '10rem' }
              }
            />
          ))}
      </Box>
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

export default Products;
