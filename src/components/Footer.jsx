"use client";

import Link from "next/link";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-[#0B1120] border-t border-white/10 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-14">

                {/* Main Footer */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Logo & Description */}
                    <div>
                        <h2 className="text-3xl font-extrabold text-white">
                            Focus<span className="text-cyan-400">Hub</span>
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-gray-400">
                            Discover and reserve quiet, modern study rooms designed
                            for productivity and focused learning.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 mt-6">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-white/10 hover:bg-cyan-500 hover:text-black duration-300 flex items-center justify-center"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="https://x.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-white/10 hover:bg-cyan-500 hover:text-black duration-300 flex items-center justify-center"
                            >
                                <FaXTwitter />
                            </a>

                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-white/10 hover:bg-cyan-500 hover:text-black duration-300 flex items-center justify-center"
                            >
                                <FaLinkedinIn />
                            </a>

                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full border border-white/10 hover:bg-cyan-500 hover:text-black duration-300 flex items-center justify-center"
                            >
                                <FaInstagram />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-5">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-cyan-400 duration-300"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/rooms"
                                    className="hover:text-cyan-400 duration-300"
                                >
                                    Rooms
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/add-room"
                                    className="hover:text-cyan-400 duration-300"
                                >
                                    Add Room
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/my-bookings"
                                    className="hover:text-cyan-400 duration-300"
                                >
                                    My Bookings
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-5">
                            Contact Info
                        </h3>

                        <div className="space-y-4 text-sm text-gray-400">
                            <p>Email: support@studynest.com</p>
                            <p>Phone: +880 1234-567890</p>
                            <p>Location: Dhaka, Bangladesh</p>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-5">
                            Newsletter
                        </h3>

                        <p className="text-sm text-gray-400 mb-4">
                            Subscribe to receive updates about new study rooms and
                            features.
                        </p>

                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
                            />

                            <button
                                type="submit"
                                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-xl duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                    <p>
                        © {new Date().getFullYear()} StudyNest. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/privacy-policy"
                            className="hover:text-cyan-400 duration-300"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="hover:text-cyan-400 duration-300"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;