"use client"
import { Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';
// import React from 'react';
// import Home from './page';

const NotFound = () => {
    
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="text-center max-w-xl w-full">

                {/* 404 Text */}
                <h1 className="text-7xl md:text-9xl font-black text-cyan-400">
                    404
                </h1>

                {/* Title */}
                <h2 className="mt-4 text-2xl md:text-4xl font-bold text-gray-900">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="mt-4 text-sm md:text-base text-gray-500 leading-relaxed">
                    The page you are looking for does not exist or may have been moved.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

                    {/* Home Button */}
                    <Link href="/">
                        <button className="w-full sm:w-auto bg-cyan-400 hover:bg-cyan-500 transition-all duration-300 text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg">
                            <Home size={20} />
                            Go Home
                        </button>
                    </Link>

                    {/* Reload Button */}
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full sm:w-auto border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white transition-all duration-300 font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                        <RefreshCw size={20} />
                        Reload Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;