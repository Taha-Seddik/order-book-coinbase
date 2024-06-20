import { createTheme } from '@mui/material/styles';
import { primaryColor } from '../../utils/constants';

const normalTheme = createTheme({
  palette: {
    primary: { main: primaryColor },
  },
  typography: {
    fontFamily: ['Inter Variable', 'sans-serif'].join(','),
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 35,
        },
      },
    },
  },
});

export default normalTheme;
