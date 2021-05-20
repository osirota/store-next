import { createMuiTheme } from '@material-ui/core/styles';

import lcchalk from 'public/fonts/lcchalk';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'LC Chalk, Arial',
  },
  overrides: {
    MuiTypography: {
      root: {
        color: '#ADADAD',
      },
      colorTextPrimary: {
        color: '#ADADAD',
      },
      colorTextSecondary: {
        color: '#fff',
      },
    },
    MuiContainer: {
      root: {
        maxWidth: '1140px',
        margin: '0 auto',
        padding: '30px 0 10px',
      },
    },
    MuiToggleButton: {
      root: {
        color: '#ADADAD',
        border: 'none',
        "&$selected": {
          "color": "#fff"
        }
      },
    },
    MuiCssBaseline: {
      '@global': {
        '@font-face': [lcchalk],
      },
    },
  },
});

export default theme;