import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'next-i18next';

import Button from 'components/button';
import styled from 'styled-components';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  transform: rotatex(10deg);
  width: 100%;
  -webkit-animation: rotateAngle 6s linear infinite;
  animation: rotateAngle 6s linear infinite;
  @keyframes rotateAngle {
    0% {
      transform: rotateY(0deg) rotateX(10deg);
      -webkit-animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
      animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
    }
    25% {
      transform: rotateY(20deg) rotateX(10deg);
    }
    50% {
      transform: rotateY(0deg) rotateX(10deg);
      -webkit-animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
      animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
    }
    75% {
      transform: rotateY(-20deg) rotateX(10deg);
    }
    100% {
      transform: rotateY(0deg) rotateX(10deg);
    }
  }
`;

const WrapperSwitch = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LandingPage = () => {
  const { t } = useTranslation(['common']);
  const { pathname, push } = useRouter();

  const changeRouter = (route = 'en') => () => {
    push(pathname, pathname, { locale: route });
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        position="relative"
      >
        <WrapperSwitch>
          <Box style={{ cursor: 'pointer' }} m={1} onClick={changeRouter('ua')}>
            <Image
              src="https://wise.com/public-resources/assets/flags/rectangle/uah.png"
              layout="fixed"
              width={30}
              height={20}
            />
          </Box>
          <Box style={{ cursor: 'pointer' }} onClick={changeRouter('en')}>
            <Image
              src="https://wise.com/public-resources/assets/flags/rectangle/gbp.png"
              layout="fixed"
              width={30}
              height={20}
            />
          </Box>
        </WrapperSwitch>
        <Image
          src="https://res.cloudinary.com/df6zjl5hp/image/upload/v1659688768/cd2_qvlzje-removebg-preview_qpnk36.png"
          layout="fixed"
          width={96}
          height={96}
        />
        <Typography
          style={{ margin: '2rem 0', fontWeight: 'bold' }}
          variant="h3"
          component="h1"
        >
          {t('title')}
        </Typography>
        <Wrapper>
          <Button
            href="https://www.ciderdegustator.com/"
            title={t('store')}
            img="https://res.cloudinary.com/df6zjl5hp/image/upload/v1659688593/c333_ylqs2t.png"
          />
          <Button
            href="https://www.instagram.com/cider_degustator/"
            title={t('instagram')}
            img="https://res.cloudinary.com/df6zjl5hp/image/upload/v1659688594/cd_1_jrlvp8.png"
          />
        </Wrapper>
      </Box>
    </Container>
  );
};

// @ts-ignore
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default LandingPage;
