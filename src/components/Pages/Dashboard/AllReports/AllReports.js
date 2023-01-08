import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AllReports = () => {


    let [reports, setReport] = useState([])

    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_SERVER_LINK}/reportedProducts/`)
    //         .then(res => res.json())
    //         .then(data => setReport(data))
    // }, [])


    const { data: allreports = [] } = useQuery({
        queryKey: ['allproducts'],
        queryFn: async () => await fetch(`${process.env.REACT_APP_SERVER_LINK}/allproducts`)
            .then(res => res.json())
    })

    reports = allreports.filter(report => report?.isReported === true);

    const handleDelete = data => {
        fetch(`${process.env.REACT_APP_SERVER_LINK}/reportedProducts/${data?._id} `, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    toast.success('Report updated Successfully')
                    const remainingReports = reports?.filter(report => report?._id !== data?._id)
                    setReport(remainingReports)
                }
            })
    }



    return (
        <div>
            <h1 className="text-3xl my-5 text-center font-semibold">All Reports</h1>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='bg-secondary text-accent'></th>
                            <th className='bg-secondary text-accent'>Name</th>
                            <th className='bg-secondary text-accent'>Seller Name</th>
                            <th className='bg-secondary text-accent'>Email</th>
                            <th className='bg-secondary text-accent'>Report Reason</th>
                            <th className='bg-secondary text-accent'>Reported By</th>
                            <th className='bg-secondary text-accent'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports &&
                            reports?.map((report, index) =>
                                <tr key={report?._id}>
                                    <th>{index + 1}</th>
                                    <td>{report?.name}</td>
                                    <td>{report?.sname}</td>
                                    <td>{report?.reportType}</td>
                                    <td>{report?.reportByUser}</td>
                                    <td>{report?.email}</td>
                                    <td>
                                        <button onClick={() => handleDelete(report)} className="btn btn-error">Remove</button>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllReports;