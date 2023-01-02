import React, { useContext, useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import ProductCard from '../../Pages/ProductCard/ProductCard';


const Trending = () => {

    let [books, setBooks] = useState([])

    let { grid } = useContext(AuthContext)

    useEffect(() => {
        fetch(`http://localhost:5000/products`)
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [])


    console.log(books);

    books = books?.filter(book => book.trending === true)


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