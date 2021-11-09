import { createMuiTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const theme = (mode) =>
  createMuiTheme({
    typography: {
      fontFamily: 'Montserrat',
    },
    palette: {
      primary: {
        main: grey[50],
      },
      secondary: {
        main: '#243144',
      },
      background: {
        default: mode === 'dark' ? '#171B26' : grey[50],
      },
      text: {
        primary: mode === 'dark' ? '#fff' : '#243144',
      },
      type: mode,
    },
    overrides: {
      MuiSwitch: {
        root: {
          width: 57,
          height: 25,
          padding: 0,
          margin: 8,
        },
        thumb: {
          width: 24,
          height: 24,
          color: '#EAEF10',
        },
        switchBase: {
          padding: 1,
          '&$checked': {
            transform: 'translateX(31px)',
          },
        },
        track: {
          borderRadius: 26 / 2,
          backgroundColor: '#3A3B01',
          opacity: 1,
        },
        colorSecondary: {
          '&.Mui-checked': {
            color: '#EAEF10',
          },
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: grey[50],
            opacity: 1,
          },
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
          border: 'none',
        },
      },
      MuiButton: {
        root: {
          '&.Mui-disabled': {
            border: `1px solid ${grey[50]}`,
          },
        },
        outlinedPrimary: {
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
            border: '1px solid #4a4949',
          },
        },
      },
      MuiTextField: {
        root: {
          '& .MuiInput-underline:before': {
            borderBottom: `1px solid ${grey[50]}`,
          },
        },
      },
    },
  });

export default theme;
