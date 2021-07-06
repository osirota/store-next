import React, { useState } from 'react';
import {
  Link,
  Box,
  Typography,
  Container,
  Button,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Image from 'next/image';
import Head from 'next/head';
import styled from 'styled-components';

import InvitesModal from 'components/InvitesModal';

import Instagram from '../public/icons/instagram.svg';

const BoxIndex = styled(Box)`
  z-index: 1000;
`;

const LandingPage = () => {
  const [open, setOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackOpen = () => {
    setSnackOpen(true);
  };

  const handleSnackClose = (_: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  return (
    <Container>
      <Head>
        <title>Cider degustator soon...</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        pt="15rem"
      >
        <BoxIndex>
          <Typography variant="h3" color="textSecondary">
            Приключения начинаются
          </Typography>
        </BoxIndex>
        <BoxIndex m="1.5rem 0">
          <Typography variant="body1" color="textSecondary">
            Оставайтесь с нами, чтобы узнать про новики и акции
          </Typography>
        </BoxIndex>
        <Button
          color="primary"
          variant="outlined"
          size="large"
          onClick={handleClickOpen}
        >
          Сообщить мне
        </Button>
      </Box>
      <InvitesModal
        open={open}
        closeModal={handleClose}
        handleSnackOpen={handleSnackOpen}
      />
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackClose}
          severity="success"
        >
          Мы запомнили Вас ;)
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default LandingPage;
