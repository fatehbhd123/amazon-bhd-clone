import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CheckoutProduct from '../components/CheckoutProduct'
import Layout from '../components/Layout'
import { selectItems, selectTotal } from '../slices/cartSlice'

function Checkout() {
    const router = useRouter();
    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);
    const { data: session, status } = useSession();
    console.log(session)
    const [cartItemsCount, setCartItemsCount] = useState(0);
    useEffect(() => {
        setCartItemsCount(items.reduce((a, c) => a + c.quantity, 0));
    }, [items]);
    return (
        <Layout title='Checkout'>
            <div className='bg-gray-100'>
                <main className='grid grid-cols-7 max-w-screen-2xl mx-auto'>
                    {/* Left section */}
                    <div className='m-5 shadow-sm col-span-7 lg:col-span-5'>
                        <div className='flex flex-col space-y-10 p-5 bg-white '>
                            <h1 className='text-3xl border-b pb-4'>
                                {items.length === 0 ? ' Your cart is empty.' : 'Shopping cart'}
                            </h1>
                            {items.map((item, i) => {
                                return (
                                    <CheckoutProduct key={i} product={item} />
                                )
                            })}
                            {items.length === 0 && (<div className='flex flex-col lg:justify-evenly lg:flex-row items-center'>
                                <img
                                    src='/basket.png'
                                    className='h-60'
                                />
                                <div className='button cursor-pointer' onClick={() => router.push('/')}>
                                    Go shopping
                                </div>
                            </div>)}
                        </div>
                    </div>

                    {/* Right section */}
                    <div className='flex flex-col bg-white p-10 shadow-md col-span-7 lg:col-span-2'>
                        {items.length > 0 && (
                            <>
                                <h2 className='font-bold'>Subtotal  ({cartItemsCount} items) :{total}$</h2>
                                <div
                                    disabled={!session}
                                    className={`button mt-8 text-center 
                                ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                                    {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
                                </div>
                            </>
                        )}
                    </div>
                </main>
            </div>
        </Layout>
    )
}

export default Checkout
