import { RouterProvider } from 'react-router-dom';
import { appRouter } from './routing/appRoutes';
import { ThemeProvider } from '@mui/material/styles';
import normalTheme from './styles/theme/normalTheme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Provider } from 'react-redux';
import store from './store/store';
import { AppSpinner } from './components/SpinnerComponent';

const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={normalTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <RouterProvider router={appRouter} />
          <AppSpinner />
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
