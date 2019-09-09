import React from 'react';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import AdminListPage from './pages/AdminListPage';

const routes = [
    {
        path : '/',
        axact : true,
        main: () => <HomePage/>
    },

    {
        path: '/admin-list',
        exact: true,
        main: () => <AdminListPage />
    },

    {
        path : '',
        axact : false,
        main: () => <NotFoundPage/>
    }
]

export default routes;