import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import ProductCard from '../../Pages/ProductCard/ProductCard';

const AllBooks = () => {

    const [books, setBooks] = useState([])

    let { grid } = useContext(AuthContext)

    // useEffect(() => {
    //     fetch('${process.env.REACT_APP_SERVER_LINK}/products')
    //         .then(res => res.json())
    //         .then(data => setBooks(data))
    // }, [])
    // const pathname = window.location.pathname

    // console.log(pathname)


    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_LINK}/homebooks`)
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [])



    return (
        <div className=''>
            <div className='grid lg:grid-cols-4 gap-5 mx-auto  justify-items-center '>
                {books &&
                    books.map(book => <ProductCard book={book} key={book._id} grid={grid}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default AllBooks;