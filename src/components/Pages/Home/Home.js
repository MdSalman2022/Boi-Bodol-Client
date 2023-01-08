import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import AllBooks from '../../Shared/AllBooks/AllBooks';
import HeroSection from '../../Shared/HeroSection/HeroSection';
import Trending from '../../Shared/Trending/Trending';
import CategoryList from '../Category/CategoryList';
import Testimonial from './Testimonial';

const Home = () => {


    return (
        <div className=" mx-auto ">
            <HeroSection />
            {/* <SearchBox></SearchBox> */}
            <div className="font-semibold text-center flex justify-center lg:hidden my-2">
                <LazyLoadImage src="https://i.ibb.co/NsGx83q/logoboi.png" className='w-44' alt="logo" border="0" />
            </div>

            <CategoryList></CategoryList>

            <Trending />
            <div className=" py-8 bg-transparent rounded-xl mx-2 lg:mx-auto text-center">
                <span className='font-bold text-5xl text-secondary underline decoration-neutral '>All Books</span>
            </div>
            <AllBooks />
            <div className='flex justify-center items-center'>
                <Link to="/allads"><button className="btn btn-neutral border-none text-white hover:bg-secondary my-10">See More</button></Link>
            </div>
            <Testimonial />
        </div>
    );
};

export default Home;