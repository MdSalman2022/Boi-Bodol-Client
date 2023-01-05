import React, { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';

const AllBuyers = () => {

    let { allUsers, setAllUsers } = useContext(AuthContext)

    // let buyers = allUsers?.filter(allUser => allUser?.role === 'buyer')


    const handleDelete = data => {
        const permission = window.confirm(`Are you sure you want to delete: ${data.name}`)

        if (permission) {
            fetch(`${process.env.REACT_APP_SERVER_LINK}/users/${data._id} `, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        toast.success('User Deleted Successfully')
                        const remainingUsers = allUsers?.filter(user => user._id !== data._id)
                        setAllUsers(remainingUsers)
                    }
                })
        }
    }

    return (
        <div>
            <h1 className="text-3xl my-5 text-center font-semibold">All Buyers</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='bg-secondary text-accent' ></th>
                            <th className='bg-secondary text-accent' >Name</th>
                            <th className='bg-secondary text-accent' >Email</th>
                            <th className='bg-secondary text-accent' >Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers &&
                            allUsers?.map((customer, index) =>
                                <tr key={customer?._id}>
                                    <th>{index + 1}</th>
                                    <td>{customer?.name}</td>
                                    <td>{customer?.email}</td>
                                    <td><button onClick={() => handleDelete(customer)} className="btn btn-error">Delete</button></td>
                                </tr>
                            )

                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;