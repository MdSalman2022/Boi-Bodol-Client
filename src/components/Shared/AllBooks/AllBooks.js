import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import ProductCard from '../../Pages/ProductCard/ProductCard';

const AllBooks = () => {

    const [books, setBooks] = useState([])

    let { grid } = useContext(AuthContext)

    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setBooks(data))
    // }, [])
    // const pathname = window.location.pathname

    // console.log(pathname)


    useEffect(() => {
        fetch(`http://localhost:5000/homebooks`)
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [])


    console.log(books);

    return (
        <div className=''>
            <div className='grid lg:grid-cols-4 mx-auto  justify-items-center '>
                {books &&
                    books.map(book => <ProductCard book={book} key={book._id} grid={grid}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default AllBooks;