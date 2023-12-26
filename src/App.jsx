import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import BookPage from './pages/bookPage';
import PayPage from './pages/payment';
import HomePage from './pages/homePage';
import LoginPage from './pages/auth/login';
import SignUpPage from './pages/auth/register';
import BookDetailPage from './pages/bookDetailPage';
import { refeshToken } from './service/api';
import { useDispatch, useSelector } from 'react-redux';
import { isLogin } from './redux/login/action';
import loginReducer from './redux/login/asscess';
import AdminPage from './pages/auth/adminPage';
import TableUser from './component/admin/tableUser';
import TableBook from './component/admin/tableBook';
import ViewOrder from './pages/viewOrder';
import Dashboard from './component/admin/dashboard';
import TableOrder from './component/admin/ordeTable';

export default function App() {
  const dispatch = useDispatch()


  const getInfo = async () => {
    const token = await refeshToken()
    dispatch(isLogin(token.data.user))

  }
  useEffect(() => {

    getInfo()

  }, [])

  const router = createBrowserRouter([
    {
      path: "",
      element: <div>
        <HomePage></HomePage>
      </div>,
      children: [
        {
          path: '/',
          element: <BookPage />

        },

      ]
    },

    {
      path: '/book-detail/:id',
      element: <BookDetailPage />
    },
    {
      path: "/login",
      element: <LoginPage></LoginPage>,
    },
    {
      path: '/payment',
      element: <PayPage />
    },
    {
      path: "/sign-up",
      element: <SignUpPage></SignUpPage>,
    },
    {
      path: "/admin",
      element: <AdminPage></AdminPage>,
      children: [
        {
          path: 'user',
          element: <TableUser></TableUser>
        },
        {
          path: 'book',
          element: <TableBook></TableBook>
        },
        {
          path: 'dashboard',
          element: <Dashboard></Dashboard>
        },
        {
          path: 'order',
          element: <TableOrder></TableOrder>
        },
      ]
    },
    {
      path: '/history',
      element: <ViewOrder></ViewOrder>
    }
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
