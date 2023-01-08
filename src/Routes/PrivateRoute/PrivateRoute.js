import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import SyncLoader from 'react-spinners/SyncLoader';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const PrivateRoute = ({ children }) => {

    const { user, loading, setLoading } = useContext(AuthContext)
    const location = useLocation()

    // useEffect(() => {
    //     setLoading(true)
    //     setTimeout(() => {
    //         setLoading(false)
    //     }, 8000)
    // }, [])

    if (loading) {
        return (
            <div className='flex justify-center items-center my-96'>
                <SyncLoader color={'#F97F40'} loading={loading} // cssOverride={override}
                    size={15}
                    data-testid="loader"
                />
            </div>
        );
    }

    if (user) {
        return children;
    }


    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;