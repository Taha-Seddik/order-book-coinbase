import { RouterProvider } from 'react-router-dom';
import { appRouter } from './routing/appRoutes';
import { ThemeProvider } from '@mui/material/styles';
import normalTheme from './styles/theme/normalTheme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const App: React.FC<{}> = () => {
  return (
    <ThemeProvider theme={normalTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <RouterProvider router={appRouter} />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
