import { Navigate, createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '*',
    element: <Navigate to={'/'} />,
    index: true,
  },
]);
