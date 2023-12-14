import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import '@/styles/globals.css';
import SignUpPage from './features/auth/signup/signup_view.tsx';
import LogInPage from './features/auth/login/login_page.tsx';
import { Toaster } from './components/ui/toaster.tsx';
import HomePage from './pages/home_page.tsx';
import { MustBeLoggedInMiddleware } from './features/auth/middleware.ts';
import CalculatorPage from './features/calculator/calculator_page.tsx';
import Routes from './constants/routes.ts';

const router = createBrowserRouter([
  {
    path: Routes.LOG_IN_PAGE,
    element: <LogInPage />,
  },
  {
    path: Routes.SIGN_UP_PAGE,
    element: <SignUpPage />,
  },
  {
    path: Routes.HOME_PAGE,
    loader: MustBeLoggedInMiddleware,
    element: <HomePage />,
  },
  {
    path: Routes.CALCULATOR_PAGE,
    loader: MustBeLoggedInMiddleware,
    element: <CalculatorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    <Toaster />
  </>
);
