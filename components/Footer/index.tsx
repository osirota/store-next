import React from 'react';
import { Link, Box } from '@material-ui/core';

const Footer = () => {
  return (
    <Box
      m="10rem 0 2rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontWeight="bold"
    >
      <Link href="mailto:oleh.sirota@gmail.com" color="inherit">
        Made by Oleh Sirota
      </Link>
    </Box>
  );
};

export default Footer;
