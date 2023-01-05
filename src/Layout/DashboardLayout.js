import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ErrorPage from '../components/Pages/ErrorPage/ErrorPage';
import Header from '../components/Shared/Header/Header';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';

const DashboardLayout = () => {

    const { user } = useContext(AuthContext)

    const [role, setRole] = useState('')

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_LINK}/users?email=${user?.email}`)
            .then(res => res.json())
            .then(data => setRole(data[0]?.role))
    }, [user?.email])

    if (!role) {
        return <ErrorPage />
    }
    else
        return (
            <div className='my-5'>

                <Header></Header>
                <div className="drawer drawer-mobile container mx-auto ">
                    <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content ">

                        <label htmlFor="dashboard-drawer" className="btn btn-primary drawer-button lg:hidden">Dashboard sidebar</label>
                        <Outlet></Outlet>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80  text-base-content">
                            <li><Link to='/dashboard'>Dashboard</Link></li>
                            {
                                role === 'user' ?
                                    <>
                                        <li className='my-1'><Link to='/dashboard/wishlist'>My Wishlist</Link></li>
                                        <li className='my-1'><Link to='/dashboard/addproduct'>Add Product</Link></li>
                                        <li className='my-1'><Link to='/dashboard/myproducts'>My Products</Link></li>
                                        <li className='my-1'><Link to='/dashboard/mycontacts'>My Contacts</Link></li>
                                    </>
                                    :
                                    ''
                            }
                            {
                                role === 'admin' ?
                                    <>
                                        <li className='my-1'><Link to='/dashboard/allbuyers'>All Users</Link></li>
                                        <li className='my-1'><Link to='/dashboard/allproducts'>All Products</Link></li>
                                        <li className='my-1'><Link to='/dashboard/reports'>Reported Items</Link></li>
                                    </>
                                    :
                                    ''
                            }
                        </ul>

                    </div>
                </div>
            </div>
        );
};

export default DashboardLayout;