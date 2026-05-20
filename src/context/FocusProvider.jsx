"use client"
import React, { useEffect, useState } from 'react';
import FocusContext from './FocusContext';
import { authClient } from '@/lib/auth-client';

const FocusProvider = ({ children }) => {


    const [dark, setDark] = useState(false)

    const data = {

        dark,
        setDark
    }
    console.log(dark)
    return <FocusContext value={data}>{children}</FocusContext>
};

export default FocusProvider;