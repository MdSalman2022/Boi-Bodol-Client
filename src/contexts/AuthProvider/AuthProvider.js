import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { useQuery } from '@tanstack/react-query';

export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({ children }) => {


    let [allUsers, setAllUsers] = useState([])

    const [loading, setLoading] = useState(true)


    const [grid, setGrid] = useState(true)

    // useEffect(() => {
    //     fetch(`${process.env.REACT_APP_SERVER_LINK}/users`)
    //         .then(res => res.json())
    //         .then(data => setAllUsers(data))
    // }, [allUsers])

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: () => fetch(`${process.env.REACT_APP_SERVER_LINK}/users`)
            .then(res => res.json())
    }, [allUsers])

    allUsers = users;


    let [searchText, setSearchText] = useState("")

    // let [items, setBooks] = useState("")
    const [books, setBooks] = useState([])


    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_LINK}/search?name=${searchText}`)
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [searchText])



    const { data: categories = [] } = useQuery({
        queryKey: ['catagories'],
        queryFn: () => fetch(`${process.env.REACT_APP_SERVER_LINK}/catagories`)
            .then(res => res.json())
    })





    // console.log(items)
    const [user, setUser] = useState(null)


    const createUser = (name, email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, name, email, password)
    }

    const updateUser = (userInfo) => {
        setLoading(true)

        return updateProfile(auth.currentUser, userInfo)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const providerLogin = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    if (loading) {
        <progress className="progress w-56"></progress>
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // console.log(currentUser)
            setUser(currentUser)
            setLoading(false)
        });

        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        allUsers,
        setAllUsers,
        setLoading,
        updateUser,
        createUser,
        signIn,
        providerLogin,
        logOut,
        setSearchText,
        searchText,
        books,
        setBooks,
        setGrid,
        grid,
        categories
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider