import React, { useState } from 'react';
import {
  AppBar,
  Link,
  Container,
  Box,
  Typography,
  Grid,
  Divider,
} from '@material-ui/core';
import {
  ToggleButton,
  ToggleButtonGroup,
} from '@material-ui/lab';
import Image from 'next/image';
import styled from 'styled-components';


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

type PageHeaderProps = {
  isFooter?: boolean,
}

const PageHeader = ({ isFooter = false }: PageHeaderProps) => {
  const [toggle, setToggle] = useState('УКР');
  const handleToggle = (_: any, newAlignment: string) => {
    setToggle(newAlignment);
  };

  return (
    <AppBarStyled color="transparent" position="static">
      <Container disableGutters maxWidth={false}>
        {isFooter && <DividerStyled />}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="flex-start">
            <Image src="/logo.png" alt="logo" width="130px" height="134px" />
            <Box display="flex" flexDirection="column" ml="20px">
              <ToggleButtonGroup size="small" exclusive value={toggle} onChange={handleToggle}>
                {PageHeader.langList.map((item) => (
                  <ToggleButton value={item} key={item}>
                    {item}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <Box mt="20px">
                <Typography color="textSecondary">
                  We share spirit of cider,<br/>
                  join us!
                </Typography>
              </Box>
              
            </Box>
          </Box>

          <Box display="inline-flex">
            {PageHeader.navList.map((item) => (
              <LinkStyled href="" key={item} color="textPrimary">
                {item}
              </LinkStyled>
            ))}
          </Box>
        </Box>
      </Container>
    </AppBarStyled>
  )
};

PageHeader.navList = [
  'про нас',
  'блог',
  'сидр та перри',
  'наши партнеры',
  'контакты',
];

PageHeader.langList = [
  'УКР',
  'РУС',
  'ESP',
  'ENG',
];

export default PageHeader;
