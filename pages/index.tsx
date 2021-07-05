import React from 'react';
import { Link, Box, Typography, Container } from '@material-ui/core';
import Image from 'next/image';
import styled from 'styled-components';

import Instagram from '../public/icons/instagram.svg';

const BoxIndex = styled(Box)`
  z-index: 1000;
`;

const LandingPage = () => (
  <Container>
    <Image layout="fill" objectFit="cover" src="/bg.jpeg" quality={100} />
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Image src="/logo.png" alt="logo" width="130px" height="134px" />
        <BoxIndex m="0 2rem">
          <Typography variant="h4" color="textSecondary">
            Soon
          </Typography>
        </BoxIndex>
      </Box>
      <BoxIndex m="0 2rem">
        <Link href="https://instagram.com/cider_degustator">
          <Instagram />
        </Link>
      </BoxIndex>
    </Box>
    <Box display="flex" alignItems="center" justifyContent="center" pt="15rem">
      <BoxIndex>
        <Typography variant="h2" color="textSecondary">
          Приключения начинаются
        </Typography>
      </BoxIndex>
    </Box>
  </Container>
);

export default LandingPage;
