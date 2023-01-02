import React from 'react';
import { Link } from 'react-router-dom';
import AllBooks from '../../Shared/AllBooks/AllBooks';
import Trending from '../../Shared/Trending/Trending';
import CategoryList from '../Category/CategoryList';
import SearchBox from '../SearchBox/SearchBox';
import Testimonial from './Testimonial';

const Home = () => {

    const olddate = new Date()
    olddate.toString();
    console.log(olddate);
    console.log(typeof olddate)
    const date = new Date().toLocaleDateString()
    console.log(date)

    return (
        <div className="container mx-auto ">
            <SearchBox></SearchBox>
            <div className=" py-8 bg-transparent rounded-xl mx-2 lg:mx-auto text-center">
                <span className='font-semibold text-5xl text-[#000000] '>Category</span>
            </div>
            <CategoryList></CategoryList>
            <div className=" py-8 bg-transparent rounded-xl mx-2 lg:mx-auto text-center">
                <span className='font-semibold text-5xl text-[#000000] '>Trending Books</span>
            </div>
            <Trending />
            <div className=" py-8 bg-transparent rounded-xl mx-2 lg:mx-auto text-center">
                <span className='font-semibold text-5xl text-[#000000] '>All Books</span>
            </div>
            <AllBooks />
            <div className='flex justify-center items-center'>
                <Link to="/allads"><button className="btn btn-outline btn-neutral hover:bg-neutral my-10">See More</button></Link>
            </div>
            <Testimonial />
        </div>
    );
};

export default Home;