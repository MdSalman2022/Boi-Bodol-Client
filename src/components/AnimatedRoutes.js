import React from 'react'
import { RouterProvider, Routes, useLocation } from 'react-router-dom'
import { router } from '../Routes/Routes/Routes'
import { AnimatePresence } from 'framer-motion'

function AnimatedRoutes() {


    const location = useLocation()

    return (
        <RouterProvider router={router}>
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>


                </Routes>
            </AnimatePresence>
        </RouterProvider>
    )
}

export default AnimatedRoutes