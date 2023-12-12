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

const router = createBrowserRouter([
  {
    path: "/",
    loader: MustBeLoggedInMiddleware,
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LogInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
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
