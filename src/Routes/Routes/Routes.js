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
import AllSeller from '../../components/Pages/Dashboard/AllSellers/AllSellers';
import AllBuyers from '../../components/Pages/Dashboard/AllBuyers/AllBuyers';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import ErrorPage from '../../components/Pages/ErrorPage/ErrorPage';
import AllReports from '../../components/Pages/Dashboard/AllReports/AllReports';
import SearchPage from '../../components/Pages/SearchPage/SearchPage';
import SearchRoute from '../SearchRoute/SearchRoute';
import Location from '../../components/Shared/Location/Location';
import AllBooks from '../../components/Shared/AllBooks/AllBooks';
import AllAds from '../../components/Pages/AllAds/AllAds';


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
                path: '/category/:category',
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.category}`),
                element: <PrivateRoute><CategoryPage></CategoryPage></PrivateRoute>
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
                loader: () => fetch('http://localhost:5000/homebooks'),
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
        element: <DashboardLayout></DashboardLayout>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/wishlist',
                element: <WishList></WishList>
            },
            // {
            //     path: '/dashboard/wishlist/',
            //     element: <PrivateRoute><MyOrders></MyOrders></PrivateRoute>
            // },
            {
                path: '/dashboard/addproduct/',
                element: <AddProduct></AddProduct>
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
                path: '/dashboard/allsellers/',
                element: <AllSeller></AllSeller>
            },
            {
                path: '/dashboard/allbuyers/',
                element: <AllBuyers></AllBuyers>
            },
            {
                path: '/dashboard/reports/',
                element: <AllReports></AllReports>
            },

            // could be used as a product details page 
            // {
            //     path: '/dashboard/payments/:id',
            //     element: <PrivateRoute><PaymentPage></PaymentPage></PrivateRoute>,
            //     loader: ({ params }) => fetch(`http://localhost:5000/bookedList/${params.id}`)
            // },
        ]
    }

])