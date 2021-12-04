/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createGlobalStyle } from 'styled-components';
import theme from 'styles/theme';
import { themeState } from 'recoils/themeType';
import Snowfall from 'react-snowfall';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Montserrat;
    overflow-x: hidden;
    height: 100%;
    widht: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

interface IAppComponentsProps {
  Component: any;
  pageProps: any;
}

const AppComponents = ({ Component, pageProps }: IAppComponentsProps) => {
  const [mode, setMode] = useRecoilState(themeState);
  useEffect(() => {
    setMode(localStorage.getItem('theme') || 'dark');
  }, [setMode]);
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme(mode)}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      <Snowfall />
    </>
  );
};

export default AppComponents;
