import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import ProductCard from '../../Pages/ProductCard/ProductCard';
import { animateScroll as scroll } from 'react-scroll'


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

    const scrolltop = () => {
        scroll.scrollToTop();
    }

    return (
        <div className=' bg-secondary my-5'>
            <div className=" py-8 bg-transparent rounded-xl mx-2 lg:mx-auto text-center">
                <span className='font-bold text-5xl text-accent underline decoration-neutral '>Trending Books</span>
            </div>
            <div className='grid lg:grid-cols-4 mx-auto gap-5 lg:gap-14 justify-items-center container'>
                {books &&
                    books.map(book => <ProductCard book={book} icon={<AiFillStar className='text-yellow-400' />} key={book._id} ></ProductCard>)
                }

            </div>
            <div className='flex justify-center items-center'>
                <Link to="/allads" onClick={scrolltop}><button className="btn btn-neutral border-none text-white hover:bg-secondary my-10">See More</button></Link>

            </div>
        </div>
    );
};

export default Trending;