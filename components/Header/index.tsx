import React, { useState } from 'react';
import {
  AppBar,
  Link,
  Container,
  Box,
  Typography,
  SwipeableDrawer,
  Switch,
} from '@material-ui/core';
import { useRecoilState } from 'recoil';
// import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import NextLink from 'next/link';
// import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { themeState } from 'recoils/themeType';

import Logo from '../../public/logo1.svg';

const AppBarStyled = styled(AppBar)`
  background-color: transparent;
  box-shadow: none;
`;

const LinkStyled = styled(Link)`
  margin: 0 10px;
  text-transform: uppercase;
  font-size: 18px;
`;

const HeaderWrapper = styled(Box)`
  @media (max-width: 992px) {
    padding: 0 3rem 2rem;
    flex-wrap: wrap-reverse;
  }
  @media (max-width: 500px) {
    padding: 0 1rem 1rem;
  }
`;

const SwipeableDrawerStyled = styled(SwipeableDrawer)`
  color: red;
  & .MuiDrawer-paper {
    width: 250px;
    background-color: #b2b2b2;
  }
`;

const Tagline = styled(Typography)`
  color: #243144;
  font-size: 24px;
  font-weight: 700;
  background: #eaef10;
  padding: 21px 15px;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media (max-width: 660px) {
    text-transform: uppercase;
    font-size: 14px;
  }
  @media (max-width: 510px) {
    font-size: 12px;
  }
`;

const LinkPhone = styled(Link)`
  font-size: 14px;
  font-weight: 700;
`;

const Header = () => {
  // const { locale, pathname, push } = useRouter();
  // const [toggle, setToggle] = useState(locale);
  const [theme, setTheme] = useRecoilState(themeState);
  const { t } = useTranslation('common');
  const isChecked = theme === 'dark';
  const handleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };
  // const handleToggle = (_: any, newAlignment: string) => {
  //   push(pathname, pathname, { locale: newAlignment });
  //   setToggle(newAlignment);
  // };

  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = () => {
    setDrawerState(!drawerState);
  };

  return (
    <AppBarStyled color="transparent" position="static">
      <Container disableGutters maxWidth={false}>
        <HeaderWrapper
          display="flex"
          alignItems="center"
          justifyContent={{ xs: 'center', sm: 'space-between' }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent={{ xs: 'space-between', sm: 'center' }}
            width={{ xs: '100%', sm: 'auto' }}
            mt={{ xs: '20px', sm: 'auto' }}
          >
            <Box
              style={{
                cursor: 'pointer',
                fill: theme === 'dark' ? '#fff' : '#243144',
              }}
            >
              <NextLink href="/">
                <Logo width="130px" height="134px" />
              </NextLink>
            </Box>
            <Box ml="26px">
              <Switch checked={isChecked} onChange={handleTheme} />
            </Box>
          </Box>
          <Box mt="20px">
            <Tagline>
              We share spirit of cider,
              <br />
              join us!
            </Tagline>
          </Box>
          <Box
            display="flex"
            alignItems="flex"
            justifyContent="center"
            ml="20px"
            flexBasis={{ xs: '100%', md: 'auto' }}
          >
            <Box m="0.5rem 30px 0 0">
              <LinkPhone href="tel:+380505008863" color="inherit">
                +38 (050) 500-88-63
              </LinkPhone>
            </Box>
            {/* <ToggleButtonGroup
              size="small"
              exclusive
              value={toggle}
              onChange={handleToggle}
            >
              {Header.langList.map((item) => (
                <ToggleButton value={item} key={item}>
                  {t(item)}
                </ToggleButton>
              ))}
            </ToggleButtonGroup> */}
          </Box>
        </HeaderWrapper>
      </Container>
      <SwipeableDrawerStyled
        anchor="left"
        open={drawerState}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <Box display="flex" flexDirection="column">
          {Header.navList.map(({ name, link }) => (
            <Box mt="2rem" key={name}>
              <LinkStyled href={link} key={name}>
                {t(name)}
              </LinkStyled>
            </Box>
          ))}
        </Box>
      </SwipeableDrawerStyled>
    </AppBarStyled>
  );
};

Header.defaultProps = {
  isFooter: false,
};

Header.navList = [
  {
    name: 'siders',
    link: '/products',
  },
];

Header.langList = ['ua', 'ru'];

export default Header;
