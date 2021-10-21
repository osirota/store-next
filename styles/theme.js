import { createMuiTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

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
        color: grey[50],
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
          color: grey[50],
        },
      },
    },
    MuiButton: {
      root: {
        '&.Mui-disabled': {
          color: grey[50],
          border: `1px solid ${grey[50]}`,
        },
      },
      outlinedPrimary: {
        color: grey[50],
        border: `1px solid ${grey[50]}`,
        borderRadius: '40px',
        transition: 'all .5s',
        background: 'transparent',
        '&:hover': {
          border: `1px solid ${grey[50]}`,
          transition: 'all .5s',
          background: grey[50],
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
          color: grey[50],
        },
        '& .MuiInputBase-root': {
          color: grey[50],
        },
        '& .MuiInput-underline:before': {
          borderBottom: `1px solid ${grey[50]}`,
        },
      },
    },
  },
});

export default theme;
