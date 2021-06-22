import React, { useState } from 'react'
import { AppBar, Link, Container, Box, Typography, Divider, IconButton, SwipeableDrawer } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import Image from 'next/image'
import styled from 'styled-components'

import Menu from '../../public/icons/menu.svg';

const AppBarStyled = styled(AppBar)`
  background-color: transparent;
  box-shadow: none;
`

const LinkStyled = styled(Link)`
  margin: 0 10px;
  text-transform: uppercase;
`
const DividerStyled = styled(Divider)`
  margin: 5rem 0;
  background-color: #fff;
`
const HeaderWrapper = styled(Box)`
  @media(max-width: 992px) {
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
  isFooter?: boolean
}

const PageHeader = ({ isFooter }: PageHeaderProps) => {
  const [toggle, setToggle] = useState('УКР')
  const handleToggle = (_: any, newAlignment: string) => {
    setToggle(newAlignment)
  }

  const [drawerState, setDrawerState] = useState(false);

	const toggleDrawer = () => {
		setDrawerState(!drawerState);
	};

  return (
    <AppBarStyled color="transparent" position="static">
      <Container disableGutters maxWidth={false}>
        {isFooter && <DividerStyled />}
        <HeaderWrapper display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="flex-start">
            <Image src="/logo.png" alt="logo" width="130px" height="134px" />
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

          <Box display={{ xs: "none", md: "inline-flex"  }}>
            {PageHeader.navList.map((item) => (
              <LinkStyled href="" key={item} color="textPrimary">
                {item}
              </LinkStyled>
            ))}
          </Box>
          <Box display={{  xs: "flex", md: "none" }}>
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
				123
			</SwipeableDrawerStyled>
    </AppBarStyled>
  )
}

PageHeader.defaultProps = {
  isFooter: false,
}

PageHeader.navList = ['про нас', 'блог', 'сидр та перри', 'наши партнеры', 'контакты']

PageHeader.langList = ['УКР', 'РУС', 'ESP', 'ENG']

export default PageHeader
