/* eslint-disable @next/next/no-img-element */
"use client"
import FocusContext from "@/context/FocusContext";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import { ClipboardClock, ListTodo, Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

const Navbar = () => {
    const { dark, setDark } = useContext(FocusContext)

    const { data: session } = authClient.useSession()

    const user = session?.user

    const handleSignOut = async () => {

        await authClient.signOut()
    }

    const [dropdown, setDropDown] = useState(false)

    const links = <>
        {
            user ?
                <>
                    <li><Link href={'/'} className="font-semibold">Home</Link></li>
                    <li><Link href={'/rooms'} className="font-semibold" >Rooms</Link></li>
                    <li><Link href={'/add-rooms'} className="font-semibold" >Add Rooms</Link></li>
                    <li><Link href={'/my-listing'} className="font-semibold" >My Listing</Link></li>
                    <li><Link href={'/my-bookings'} className="font-semibold" >My Bookings</Link></li>


                </> :


                <>
                    <li><Link href={'/'} className="font-semibold" >Home</Link></li>
                    <li><Link href={'/rooms'} className="font-semibold" >Rooms</Link></li>

                </>

        }

    </>

    return (
        <div className="shadow-sm bg-base-100 dark:bg-[#0b1120]">
            <section>
                <div className="navbar">

                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow dark:text-white dark:hover:bg-gray-200">
                                {links}
                            </ul>
                        </div>
                        <a className="text-xl font-extrabold text-black dark:text-white">
                            Focus<span className="text-cyan-400">Hub</span></a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 dark:text-white *:dark:hover:bg-white/5">
                            {links}
                        </ul>
                    </div>
                    <div className="navbar-end">

                        {
                            user ?
                                <div className="relative">
                                    <div className="flex items-center gap-3">
                                        <Button onClick={() => setDark(!dark)} className={'border border-gray-500 bg-white text-black rounded-full aspect-square'}>{dark ? <Moon /> : <Sun />}</Button>
                                        <Avatar onClick={() => setDropDown(!dropdown)} className="border-2">
                                            <Avatar.Image referrerPolicy="no-referrer" alt="user image" src={user?.image} />
                                            <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
                                        </Avatar>
                                    </div>

                                    {/* dropdown */}
                                    {/* {dropdown && */}
                                    <div className={` shadow-sm absolute right-0 top-12 bg-white rounded-xl overflow-hidden origin-top-right w-max ${dropdown ? "opacity-100 scale-100 " : 'opacity-0 scale-90'} duration-150`}>
                                        <div className="flex items-center gap-2 bg-cyan-500 p-5 ">
                                            <div className="border-2 border-blue-900 rounded-full">
                                                <Image className="rounded-full "
                                                    src={user?.image}
                                                    alt="user image"
                                                    height={80}
                                                    width={80}

                                                />
                                            </div>
                                            <div>
                                                <h1 className="capitalize font-semibold">{user.name}</h1>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                            </div>

                                        </div>

                                        <div className="space-y-2 mt-3 p-2">
                                            <Link className="flex gap-3 hover:bg-cyan-50" href={'/my-listing'}>

                                                <span className="flex items-center justify-center  bg-cyan-100 text-cyan-900 h-10 w-10 rounded ">
                                                    <ListTodo />
                                                </span>

                                                <div >
                                                    <h1 className="text-cyan-900 font-semibold">My Listing</h1>
                                                    <p className="text-gray-500 text-sm">List of your rooms</p>
                                                </div>
                                            </Link>

                                            <Link className="flex gap-3 hover:bg-green-50" href={'/my-bookings'}>
                                                <span className="flex items-center justify-center  bg-green-100 text-green-900 h-10 w-10 rounded">
                                                    <ClipboardClock />

                                                </span>
                                                <div>
                                                    <h1 className="text-green-900 font-semibold">My Bookings</h1>
                                                    <p className="text-gray-500 text-sm">All your booked rooms</p>
                                                </div>

                                            </Link>
                                            <div className="w-full border-t border-gray-200  mt-3"></div>
                                            <Button onClick={handleSignOut} className={'bg-cyan-400 rounded-none w-full'}>LogOut</Button>

                                        </div>

                                    </div>
                                    {/* } */}



                                </div>
                                : <div className="flex gap-2 ">
                                    <Link href={'/login'} className="btn bg-blue-100 text-blue-900">Login</Link>
                                    <Link href={'/register'} className="btn bg-cyan-50 text-cyan-900">Register</Link>
                                </div>

                        }



                    </div>
                </div>
            </section>
        </div>

    );
};

export default Navbar;