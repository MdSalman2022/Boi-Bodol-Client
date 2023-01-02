import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import ProductCard from '../ProductCard/ProductCard';
import { CiGrid41, CiGrid2H } from 'react-icons/ci';

const AllAds = () => {

    let { books, setBooks, grid, setGrid } = useContext(AuthContext)


    // const [books, setBooks] = useState([])
    const [data, setData] = useState([])


    useEffect(() => {
        fetch(`http://localhost:5000/products`)
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [data])


    console.log(books);



    const handleFilter = event => {
        event.preventDefault()

        const sortedData = books.sort((a, b) => (a.dateAdded < b.dateAdded ? 1 : -1));
        setData(sortedData)
    }


    const handleFilterPriceHtoL = event => {
        event.preventDefault()

        const sortedData = books.sort((a, b) => {
            return b.price - a.price
        })
        setData(sortedData)
    }

    const handleFilterPriceLtoH = event => {
        event.preventDefault()

        const sortedData = books.sort((a, b) => {
            return a.price - b.price
        })
        setData(sortedData)
    }



    const handleClick = event => {
        // event.preventDefault()
        // setGrid(`${grid === "grid grid-cols-4 gap-5 justify-items-center" ? 'flex gap-5 justify-center' : 'grid grid-cols-4 gap-5 justify-items-center '}`)
        setGrid(!grid)

        console.log(grid);
    }

    return (
        <div className='mx-auto max-w-screen-2xl  '>

            <section className='text-center h-96 flex flex-col justify-center  border-b-2 border-neutral '>
                <h1 className='text-5xl font-semibold text-neutral'>Find the right item for you</h1>
                <p className='text-xl font-semibold text-neutral'>Our developer team has implemented an optimal algorithm <br /> to facilitate the easy discovery of your desired book.</p>
            </section>
            <br />
            <div className='flex justify-between '>
                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Category</option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>


                <div className='flex justify-between gap-3'>
                    <div>
                        <label className="swap swap-rotate" >

                            {/* <!-- this hidden checkbox controls the state --> */}
                            <input type="checkbox" />


                            {/* <!-- sun icon --> */}
                            <svg onClick={handleClick} className="swap-off fill-current w-14 h-14 p-4 border-2 border-neutral rounded-lg " width="21px" height="20px" viewBox="0 0 21 20" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Dribbble-Light-Preview" transform="translate(-139.000000, -200.000000)" fill="#000000">
                                        <g id="icons" transform="translate(56.000000, 160.000000)">
                                            <path d="M101.9,57.009 C101.9,57.56 101.38235,58 100.80275,58 L97.65275,58 C97.0742,58 96.65,57.56 96.65,57.009 L96.65,54.009 C96.65,53.458 97.0742,53 97.65275,53 L100.80275,53 C101.38235,53 101.9,53.458 101.9,54.009 L101.9,57.009 Z M100.80275,51 L97.65275,51 C95.9129,51 94.55,52.352 94.55,54.009 L94.55,57.009 C94.55,58.666 95.9129,60 97.65275,60 L100.80275,60 C102.5426,60 104,58.666 104,57.009 L104,54.009 C104,52.352 102.5426,51 100.80275,51 L100.80275,51 Z M90.35,57.009 C90.35,57.56 89.83235,58 89.25275,58 L86.10275,58 C85.5242,58 85.1,57.56 85.1,57.009 L85.1,54.009 C85.1,53.458 85.5242,53 86.10275,53 L89.25275,53 C89.83235,53 90.35,53.458 90.35,54.009 L90.35,57.009 Z M89.25275,51 L86.10275,51 C84.3629,51 83,52.352 83,54.009 L83,57.009 C83,58.666 84.3629,60 86.10275,60 L89.25275,60 C90.9926,60 92.45,58.666 92.45,57.009 L92.45,54.009 C92.45,52.352 90.9926,51 89.25275,51 L89.25275,51 Z M101.9,46.009 C101.9,46.56 101.38235,47 100.80275,47 L97.65275,47 C97.0742,47 96.65,46.56 96.65,46.009 L96.65,43.009 C96.65,42.458 97.0742,42 97.65275,42 L100.80275,42 C101.38235,42 101.9,42.458 101.9,43.009 L101.9,46.009 Z M100.80275,40 L97.65275,40 C95.9129,40 94.55,41.352 94.55,43.009 L94.55,46.009 C94.55,47.666 95.9129,49 97.65275,49 L100.80275,49 C102.5426,49 104,47.666 104,46.009 L104,43.009 C104,41.352 102.5426,40 100.80275,40 L100.80275,40 Z M90.35,46.009 C90.35,46.56 89.83235,47 89.25275,47 L86.10275,47 C85.5242,47 85.1,46.56 85.1,46.009 L85.1,43.009 C85.1,42.458 85.5242,42 86.10275,42 L89.25275,42 C89.83235,42 90.35,42.458 90.35,43.009 L90.35,46.009 Z M89.25275,40 L86.10275,40 C84.3629,40 83,41.352 83,43.009 L83,46.009 C83,47.666 84.3629,49 86.10275,49 L89.25275,49 C90.9926,49 92.45,47.666 92.45,46.009 L92.45,43.009 C92.45,41.352 90.9926,40 89.25275,40 L89.25275,40 Z" id="menu_navigation_grid-[#1528]"></path>
                                        </g>
                                    </g>
                                </g>
                            </svg>



                            {/* <!-- moon icon --> */}
                            <svg onClick={handleClick} className='swap-on fill-current w-14 h-14 p-4 border-2 border-neutral rounded-lg ' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>




                        </label>
                    </div>
                    <div className="dropdown dropdown-end  justify-between gap-3">
                        <button tabIndex={0} className='btn btn-secondary w-14 h-14 mb-2 border-2 border-neutral hover:bg-[#f4f4f4] hover:border-neutral'><HiOutlineAdjustmentsHorizontal className='text-2xl text-neutral' /></button>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li className='rounded-xl mb-2'><a onClick={handleFilter}>Recently Added</a></li>
                            <li className='rounded-xl mb-2'><a onClick={handleFilterPriceLtoH} >Low To High</a></li>
                            <li className='rounded-xl mb-2'><a onClick={handleFilterPriceHtoL}>High To Low</a></li>
                        </ul>
                    </div>
                </div>

            </div>
            <br />


            <div className={`${grid ? 'grid grid-cols-4 gap-5 justify-items-center' : 'flex justify-center flex-wrap gap-5'} `} >
                {books && !data.length ?
                    books?.map(book => <ProductCard book={book} key={book._id}></ProductCard>)
                    :
                    data.map(d => <ProductCard grid={grid} book={d} key={d._id}></ProductCard>
                    )
                }
            </div>
        </div >
    );
};

export default AllAds;