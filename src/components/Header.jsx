import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/cartSlice';
function Header() {
    const { data: session, status } = useSession();
    const router = useRouter()
    const items = useSelector(selectItems)
    const [cartItemsCount, setCartItemsCount] = useState(0);
    useEffect(() => {
        setCartItemsCount(items.reduce((a, c) => a + c.quantity, 0));
    }, [items]);
    return (
        <header>
            <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2 '>
                <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
                    <Image
                        onClick={() => router.push('/')}
                        src='https://links.papareact.com/f90'
                        width={150}
                        height={40}
                        objectFit='contain'
                        className='cursor-pointer'
                    />
                </div>
                <div className='hidden sm:flex items-center h-10 rounded-md flex-grow  cursor-pointer bg-yellow-400 hover:bg-yellow-500'>
                    <input type="text" className='p-2 h-full w-6 flex-grow rounded-l-md focus:outline-none' />
                    <MagnifyingGlassIcon className='h-12 p-4' />
                </div>
                <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
                    <div className='link' onClick={!session ? signIn : signOut}>
                        <p>{session ? `Hello, ${session.user.name}` : 'Sign in'}</p>
                        <p className='font-extrabold md:text-sm'>Accounts & lists</p>
                    </div>
                    <div className='link'
                        onClick={() => router.push('/orders')}
                    >
                        <p>Returns</p>
                        <p className='font-extrabold md:text-sm'>& Orders</p>
                    </div>
                    <div className='link relative flex items-center' onClick={() => router.push('/checkout')}>
                        <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 rounded-full text-center text-black font-bold'>
                            {cartItemsCount}
                        </span>
                        <ShoppingCartIcon className='h-10' />
                        <p className='font-extrabold md:text-sm hidden md:inline mt-2'>Cart</p>
                    </div>
                </div>
            </div>
            <div className='flex items-center bg-amazon_blue-light text-white text-sm space-x-3 p-2 pl-6'>
                <p className='link flex items-center'>
                    <Bars3Icon className='h-6 mr-1' />
                    All
                </p>
                <p className='link'>
                    Prime Video
                </p>
                <p className='link'>
                    Prime Business
                </p>
                <p className='link'>
                    Today's Deals
                </p>
                <p className='link hidden lg:inline-flex'>
                    Electronics
                </p>
                <p className='link hidden lg:inline-flex'>
                    Food & Grocery
                </p>
                <p className='link hidden lg:inline-flex'>
                    Prime
                </p>
                <p className='link hidden lg:inline-flex'>
                    Buy Again
                </p>
                <p className='link hidden lg:inline-flex'>
                    Shipper Toolkit
                </p>
                <p className='link hidden lg:inline-flex'>
                    Health & Personal Care
                </p>
            </div>
        </header>
    )
}

export default Header
