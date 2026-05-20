"use client"
import React, { useContext } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import FocusContext from './context/FocusContext';

const Root = ({ data: children }) => {
    const { dark } = useContext(FocusContext)


    return (
        <div className={`${dark && 'dark'} flex flex-col min-h-dvh`}>
            <Navbar></Navbar>
            <div className="flex-1">
                {children}
            </div>
            <Footer></Footer>
            <Toaster />
        </div>
    );
};

export default Root;