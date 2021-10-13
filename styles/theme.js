import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    background: {
      default: '#000',
    },
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
        '&$selected': {
          color: '#fff',
        },
      },
    },
    MuiButton: {
      root: {
        '&.Mui-disabled': {
          color: '#fff',
          border: '1px solid #fff',
        },
      },
      outlinedPrimary: {
        color: '#fff',
        border: '1px solid #fff',
        borderRadius: '40px',
        transition: 'all .5s',
        background: 'transparent',
        '&:hover': {
          border: '1px solid #fff',
          transition: 'all .5s',
          background: '#fff',
        },
        '&.Mui-disabled': {
          color: '#4a4949',
          border: '1px solid #4a4949',
        },
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
