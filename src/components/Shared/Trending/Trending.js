import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import ProductCard from '../../Pages/ProductCard/ProductCard';


const Trending = () => {

    // const [books, setBooks] = useState([])

    let { grid, books, setBooks } = useContext(AuthContext)

    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_SERVER_LINK}/products`)
    //         .then(res => res.json())
    //         .then(data => setBooks(data))
    // }, [])


    const { data: products = [] } = useQuery({
        queryKey: ['products'],
        queryFn: async () => await fetch(`${process.env.REACT_APP_SERVER_LINK}/trending`)
            .then(res => res.json())
    })

    // books = products?.filter(book => book.trending === true)
    books = products;

    console.log(books);

    return (
        <div className=''>

            <div className='grid lg:grid-cols-4 mx-auto  justify-items-center '>
                {books &&
                    books.map(book => <ProductCard book={book} icon={<AiFillStar className='text-yellow-400' />} key={book._id} grid={grid}></ProductCard>)
                }

            </div>
            <div className='flex justify-center items-center'>
                <Link to="/allads"><button className="btn btn-outline btn-neutral hover:bg-neutral my-10">See More</button></Link>
            </div>
        </div>
    );
};

export default Trending;