import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import ProductCard from '../ProductCard/ProductCard';
import SearchBox from '../SearchBox/SearchBox';

const SearchPage = () => {

    let { searchText, setBooks, books, setSearchText } = useContext(AuthContext)

    // console.log(items);


    console.log(books);


    return (
        <div className='container mx-auto max-w-6xl'>
            <SearchBox></SearchBox>
            {books.length > 0 ?
                <h1 className="lg:text-5xl px-4 font-semibold">{searchText === "" ? "" : `You searched for "${searchText}"`}</h1>
                :
                <h1 className="lg:text-5xl px-4 font-semibold">{`No result found for "${searchText}"`}</h1>
            }

            <div className='grid lg:grid-cols-3 mt-5 justify-items-center  gap-5'>
                {books &&
                    books.map(book => <ProductCard book={book} key={book.id}></ProductCard>)
                }
            </div>

        </div>
    );
};

export default SearchPage;