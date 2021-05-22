import React, { useState } from 'react';
import {
  AppBar,
  Link,
  Container,
  Box,
  Typography,
  Grid,
} from '@material-ui/core';
import {
  ToggleButton,
  ToggleButtonGroup,
} from '@material-ui/lab';
import styled from 'styled-components';
import Image from 'next/image';
import Mail from '../../public/icons/mail.svg';

const AppBarStyled = styled(AppBar)`
  background-color: transparent;
  box-shadow: none;
`;

const LinkStyled = styled(Link)`
  margin: 0 10px;
  text-transform: uppercase;
`;

const PageHeader = () => {
  const [toggle, setToggle] = useState('УКР');
  const handleToggle = (_: any, newAlignment: string) => {
    setToggle(newAlignment);
  };

  return (
    <AppBarStyled color="transparent" position="sticky">
      <Container disableGutters maxWidth={false}>
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

        <Box mt="40px">
          <Grid container spacing={2}>
            <Grid xs={7} item>
                <Box display="flex" flexDirection="column" justifyContent="space-between" paddingTop="10rem">
                  <Box>
                    <Typography color="textSecondary" variant="h3">
                      Підбірка найкращих сидрів спеціально для Вас
                    </Typography>
                    <Box width="60%" mt="2rem">
                      <Typography>
                        Cider Enthusiasts ретельно відібрали найкращі позиції, які  не залишать байдужим нікого.
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Link href="tel:80000000" color="textPrimary">
                      <Mail /> +38 (097) 33-234-23
                    </Link>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Link href="https://www.instagram.com/livekharkov/">
                        <Mail />
                      </Link>
                      <Box m="0 2rem">
                        <Link href="https://www.instagram.com/livekharkov/">
                          <Mail />
                        </Link>
                      </Box>
                      <Link href="mailto:oleh.sirota@gmail.com">
                        <Mail />
                      </Link>
                    </Box>
                  </Box>
                </Box>
            </Grid>

            <Grid container xs={5} item alignItems="center" justify="center" direction="column">
              <Image src="/sider.png" alt="bottle" width={160} height={600} />
              <Box mt="1.5rem">
                <Typography>
                  Сидр "Poma Aurea"
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box mt="10rem" p="8rem 0 0 32rem">
          <Typography variant="h4" color="textSecondary">Про нас</Typography>
          <Box mt="2rem">
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
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
