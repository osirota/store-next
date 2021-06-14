import { createMuiTheme } from '@material-ui/core/styles';

import lcchalk from 'public/fonts/lcchalk';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    background: {
      default: "#000"
    },
  },
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
    MuiButton: {
      outlinedPrimary: {
        color: '#fff',
        border: '1px solid #fff',
        borderRadius: '40px',
        transition: 'all .5s',
        background: 'transparent',
        '&:hover': {
          border: '1px solid transparent',
          transition: 'all .5s',
          background: 'transparent',
        }
      },
    },
    MuiCssBaseline: {
      '@global': {
        '@font-face': [lcchalk],
      },
    },
    MuiTextField: {
      root: {
        '& .MuiFormLabel-root': {
          color: '#fff',
        },
        '& .MuiInputBase-root': {
          color: '#fff',
        },
        '& .MuiInput-underline:before': {
          borderBottom: '1px solid #fff',
        },
      },
    },
  },
});

export default theme;