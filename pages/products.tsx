import React from 'react';
import { Box } from '@material-ui/core';
import useSwr from 'swr';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PageLayout from 'components/PageLayout/PageLayout';
import ProductItem from 'components/ProductItem';

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
}

interface IFetch {
  products: Product[];
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Products = () => {
  const { data } = useSwr('/api/products', fetcher);

  if (!data) {
    return null;
  }
  const { products }: IFetch = data;

  return (
    <PageLayout title="Сидр дегустатор | Купить сидр">
      <Box
        p={{
          xs: '2rem 1rem 0',
          lg: '5rem 0 0',
        }}
      >
        {products.map((product, index) => (
          <ProductItem
            key={product.name}
            product={product}
            mb={
              index === products.length - 1 ? '0' : { xs: '3rem', lg: '10rem' }
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
