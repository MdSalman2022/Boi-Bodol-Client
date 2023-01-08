import React, { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider/AuthProvider';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const AllUser = () => {

    let { allUsers, setAllUsers, deleteUser } = useContext(AuthContext)

    // let buyers = allUsers?.filter(allUser => allUser?.role === 'buyer')


    const handleDelete = data => {
        const permission = window.confirm(`Are you sure you want to delete: ${data?.name}`)

        if (permission) {
            fetch(`${process.env.REACT_APP_SERVER_LINK}/users/${data._id} `, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        //delete user 
                        deleteUser(data.uid)
                        toast.success('User Deleted Successfully')
                        const remainingUsers = allUsers?.filter(user => user._id !== data._id)
                        setAllUsers(remainingUsers)
                    }
                })
        }
    }

    const handleAdmin = data => {
        const user = {
            role: 'admin'
        }
        console.log(user)
        fetch(`http://localhost:5000/users/${data._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    alert('Admin role updated')
                    console.log(data)
                }
            })
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
                            <th className='bg-secondary text-accent' >Status</th>
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
                                    <td>{customer?.role}</td>
                                    <td>
                                        <div className="dropdown dropdown-end space-y-3">
                                            <label tabIndex={0} className="btn btn-ghost text-2xl">
                                                <BiDotsHorizontalRounded />
                                            </label>
                                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-secondary rounded-box w-52 ">
                                                <li><button onClick={() => handleAdmin(customer)} className="btn btn-secondary text-white hover:text-neutral">Make Admin</button></li>
                                                <li><button onClick={() => handleDelete(customer)} className="btn btn-secondary text-white hover:text-neutral">Delete</button></li>
                                            </ul>
                                        </div>
                                        {/* <BiDotsHorizontalRounded />
                                        <button onClick={() => handleDelete(customer)} className="btn btn-error mr-2">Admin</button>
                                        <button onClick={() => handleDelete(customer)} className="btn btn-error">Delete</button> */}
                                    </td>
                                </tr>
                            )

                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;