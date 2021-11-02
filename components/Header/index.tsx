import React, { useState } from 'react';
import {
  AppBar,
  Link,
  Container,
  Box,
  Typography,
  SwipeableDrawer,
  IconButton,
  Switch,
} from '@material-ui/core';
import { useRecoilState } from 'recoil';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { themeState } from 'recoils/themeType';

import Menu from '../../public/icons/menu.svg';

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
    border-bottom: 1px solid #fff;
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
`;

const Header = () => {
  const { locale, pathname, push } = useRouter();
  const [toggle, setToggle] = useState(locale);
  const [theme, setTheme] = useRecoilState(themeState);
  const { t } = useTranslation('common');
  const isChecked = theme === 'dark';
  const handleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };
  const handleToggle = (_: any, newAlignment: string) => {
    push(pathname, pathname, { locale: newAlignment });
    setToggle(newAlignment);
  };

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
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <Link href="/">
              <Image src="/logo.png" alt="logo" width="130px" height="134px" />
            </Link>
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
          <Box display="flex" flexDirection="column" ml="20px">
            <ToggleButtonGroup
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
            </ToggleButtonGroup>
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
