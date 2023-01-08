import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import { BsChevronDoubleDown } from 'react-icons/bs';

const HeroSection = () => {

    const { user } = useContext(AuthContext)


    return (
        <div className='transition-opacity duration-500 opacity-100 ease-in-out delay-500'>
            <div className={`relative hero min-h-screen bg-opacity-0 transition-all bg-opacity-100 duration-300 ${user ? "hidden" : ""}`} style={{ backgroundImage: `url("https://i.ibb.co/Ny6JrTL/book.jpg")` }}>
                {/* <div className="hero-overlay  "></div> */}
                <div className="hero-content text-center text-neutral-content flex flex-col ">
                    <h1 className='lg:text-5xl text-2xl text-white'>Got no place to keep your <span className="font-semibold text-neutral">old unnecessary</span> books?</h1>
                    <h1 className='lg:text-5xl text-2xl text-white'>Tired of <span className='text-neutral font-semibold'>searching</span> your desired book? </h1>
                    <h1 className='lg:text-5xl text-2xl text-white'>Can't <span className='font-semibold text-neutral '>Afford</span> to buy new ones? </h1>
                    <h1 className='lg:text-5xl text-2xl text-white  '>Want to <span className="font-semibold text-neutral">exchange</span> your book to get the book your were <span className="text-neutral font-semibold">looking</span> for? </h1>
                    <h1 className='lg:text-7xl text-2xl font-bold text-neutral drop-shadow-lg'>You've come to the <span className='bg-neutral text-base-100 rounded-xl px-3 py-2'>right place</span></h1>

                    <div className="max-w-md text-white grid lg:grid-cols-3 justify-items-center gap-5 lg:gap-52 mt-10">
                        <Link to="/allads"><button className="w-52 mx-2 btn btn-neutral hover:btn-secondary text-secondary text-lg font-bold ">Buy Books</button></Link>
                        <Link to="/dashboard/addproduct"><button className="w-52 mx-2 btn btn-neutral hover:btn-secondary text-secondary  text-lg font-bold">Sell Books</button></Link>
                        <button className="w-52 mx-2 btn btn-neutral hover:btn-secondary text-secondary  text-lg font-bold">Exchange Books</button>
                    </div>

                    <div className="absolute bottom-20 text-5xl text-white animate-bounce">
                        <BsChevronDoubleDown />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default HeroSection;