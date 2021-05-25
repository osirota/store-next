import {
  Link,
  Box,
  Typography,
  Grid,
} from '@material-ui/core';
import Image from 'next/image';

import PageLayout from 'components/PageLayout/PageLayout';
import ProductsCarousel from 'components/ProductsCarousel';
import PartnerCarousel from 'components/PartnerCarousel';
import BlogCarousel from 'components/BlogCarousel';

import Mail from '../public/icons/mail.svg';


const LandingPage = () => (
  <PageLayout title="Landing">
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

    <ProductsCarousel title="Новинки" />
    <BlogCarousel title="Блог" />
    <ProductsCarousel title="Сидр та Перрі" />
    <PartnerCarousel title="Наші партнери" />
  </PageLayout>
);

export default LandingPage;
