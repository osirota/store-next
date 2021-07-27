import React, { useState } from 'react';
import {
  AppBar,
  Link,
  Container,
  Box,
  Typography,
  Divider,
  SwipeableDrawer,
  IconButton,
} from '@material-ui/core';
import Image from 'next/image';
import styled from 'styled-components';

import Menu from '../../public/icons/menu.svg';

const AppBarStyled = styled(AppBar)`
  background-color: transparent;
  box-shadow: none;
`;

const LinkStyled = styled(Link)`
  margin: 0 10px;
  text-transform: uppercase;
`;
const DividerStyled = styled(Divider)`
  margin: 5rem 0;
  background-color: #fff;
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
    width: 400px;
    background-color: #b2b2b2;
  }
`;

type PageHeaderProps = {
  isFooter?: boolean;
};

const PageHeader = ({ isFooter }: PageHeaderProps) => {
  // const [toggle, setToggle] = useState('УКР')
  // const handleToggle = (_: any, newAlignment: string) => {
  //   setToggle(newAlignment)
  // }

  const [drawerState, setDrawerState] = useState(false);

  const toggleDrawer = () => {
    setDrawerState(!drawerState);
  };

  return (
    <AppBarStyled color="transparent" position="static">
      <Container disableGutters maxWidth={false}>
        {isFooter && <DividerStyled />}
        <HeaderWrapper
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="flex-start">
            <Link href="/">
              <Image src="/logo.png" alt="logo" width="130px" height="134px" />
            </Link>
            <Box display="flex" flexDirection="column" ml="20px">
              {/* <ToggleButtonGroup size="small" exclusive value={toggle} onChange={handleToggle}>
                {PageHeader.langList.map((item) => (
                  <ToggleButton value={item} key={item}>
                    {item}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup> */}
              <Box mt="20px">
                <Typography color="textSecondary">
                  We share spirit of cider,
                  <br />
                  join us!
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box display={{ xs: 'none', md: 'inline-flex' }}>
            {PageHeader.navList.map(({ name, link }) => (
              <LinkStyled href={link} key={name} color="textPrimary">
                {name}
              </LinkStyled>
            ))}
          </Box>
          <Box display={{ xs: 'flex', md: 'none' }}>
            <IconButton onClick={toggleDrawer}>
              <Menu />
            </IconButton>
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
          {PageHeader.navList.map((item) => (
            <Box mt="2rem" key={item}>
              <LinkStyled href="" key={item} color="textSecondary">
                {item}
              </LinkStyled>
            </Box>
          ))}
        </Box>
      </SwipeableDrawerStyled>
    </AppBarStyled>
  );
};

PageHeader.defaultProps = {
  isFooter: false,
};

PageHeader.navList = [
  {
    name: 'сидри',
    link: '/products',
  },
];

PageHeader.langList = ['УКР', 'РУС', 'ESP', 'ENG'];

export default PageHeader;
