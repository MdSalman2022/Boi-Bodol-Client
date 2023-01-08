import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../../Layout/Main';
import Home from '../../components/Pages/Home/Home';
import CategoryPage from '../../components/Pages/Category/CategoryPage';
import Login from '../../components/Shared/Login/Login';
import Register from '../../components/Shared/Register/Register';
import WishList from '../../components/Pages/Dashboard/WishList/WishList';
import Dashboard from '../../components/Pages/Dashboard/Dashboard/Dashboard'
import AddProduct from '../../components/Pages/Dashboard/AddProduct/AddProduct';
import MyProducts from '../../components/Pages/Dashboard/MyProducts/MyProducts';
import MyContacts from '../../components/Pages/Dashboard/MyContacts/MyContacts';
import DashboardLayout from '../../Layout/DashboardLayout';
import AllUser from '../../components/Pages/Dashboard/AllUser/AllUser';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import ErrorPage from '../../components/Pages/ErrorPage/ErrorPage';
import AllReports from '../../components/Pages/Dashboard/AllReports/AllReports';
import SearchPage from '../../components/Pages/SearchPage/SearchPage';
import SearchRoute from '../SearchRoute/SearchRoute';
import AllBooks from '../../components/Shared/AllBooks/AllBooks';
import AllAds from '../../components/Pages/AllAds/AllAds';
import CardDetail from '../../components/Shared/CardDetail/CardDetail';
import AllProducts from '../../components/Pages/Dashboard/AllProducts/AllProducts';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/search/:name',
                element: <SearchRoute><SearchPage></SearchPage></SearchRoute>
            },
            {
                path: '/category/:id',
                loader: ({ params }) => fetch(`${process.env.REACT_APP_SERVER_LINK}/category/${params.id}`),
                element: <CategoryPage></CategoryPage>
            },
            {
                path: '/details/:id',
                loader: ({ params }) => fetch(`${process.env.REACT_APP_SERVER_LINK}/products/${params.id}`),
                element: <CardDetail></CardDetail>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/homebooks',
                loader: () => fetch(`${process.env.REACT_APP_SERVER_LINK}/homebooks`),
                element: <AllBooks></AllBooks>
            },
            {
                path: '/allads',
                element: <AllAds></AllAds>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
            },
            {
                path: '/dashboard/wishlist',
                element: <WishList></WishList>
            },
            {
                path: '/dashboard/addproduct/',
                element: <PrivateRoute><AddProduct></AddProduct></PrivateRoute>
            },
            {
                path: '/dashboard/addproduct/',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/dashboard/myproducts/',
                element: <MyProducts></MyProducts>
            },
            {
                path: '/dashboard/mycontacts/',
                element: <MyContacts></MyContacts>
            },
            {
                path: '/dashboard/allusers/',
                element: <AllUser></AllUser>
            },
            {
                path: '/dashboard/allproducts',
                element: <AllProducts></AllProducts>
            },
            {
                path: '/dashboard/reports/',
                element: <AllReports></AllReports>
            },
        ]
    }

])