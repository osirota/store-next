import React from 'react';
import { Box } from '@material-ui/core';
import useSwr from 'swr';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PageLayout from 'components/PageLayout/PageLayout';
import BoxesItem from 'components/BoxesItem';

interface IBoxes {
  count: number;
  name: string;
  price: number;
  _id: string;
  logo: string;
  description: string;
  mixes: string;
}

interface IFetch {
  boxes: IBoxes[];
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Boxes = () => {
  const { data } = useSwr('/api/boxes', fetcher);

  if (!data) {
    return null;
  }
  const { boxes }: IFetch = data;

  return (
    <PageLayout title="Сидр дегустатор | Купить сидр">
      <Box
        p={{
          xs: '2rem 1rem 0',
          lg: '5rem 0 0',
        }}
      >
        {boxes.map((box, index) => (
          <BoxesItem
            key={box.name}
            box={box}
            mb={index === boxes.length - 1 ? '0' : { xs: '3rem', lg: '10rem' }}
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

export default Boxes;
