import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import CheckoutProduct from '../components/CheckoutProduct'
import Layout from '../components/Layout'
import { selectItems, selectTotal } from '../slices/cartSlice'
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from '../../firebase'

function Checkout() {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const router = useRouter();
    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);
    const { data: session, status } = useSession();
    const [cartItemsCount, setCartItemsCount] = useState(0);
    useEffect(() => {
        setCartItemsCount(items.reduce((a, c) => a + c.quantity, 0));
    }, [items]);
    return (
        <Layout title='Checkout'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
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
                    <div className='flex flex-col bg-white p-10 shadow-md col-span-7 lg:col-span-2'>
                        {items.length > 0 && (
                            <>
                                <h2 className='font-bold mb-4'>Subtotal  ({cartItemsCount} items) :{parseFloat(total).toFixed(3)}$</h2>
                                {!session ?
                                    (<div
                                        className={`button mt-8 text-center from-gray-300 to-gray-500 border-gray-200 text-white `}
                                        onClick={signIn}
                                    >
                                        Sign in to Checkout
                                    </div>) :
                                    (<div>
                                        <PayPalScriptProvider >
                                            <PayPalButtons
                                                createOrder={(data, actions) => {
                                                    return actions.order
                                                        .create({
                                                            purchase_units: [
                                                                {
                                                                    amount: {
                                                                        value: total,
                                                                    },
                                                                },
                                                            ],
                                                        })
                                                        .then((orderId) => {
                                                            // Your code here after create the order
                                                            return orderId;
                                                        });
                                                }}
                                                onApprove={function (data, actions) {
                                                    return actions.order.capture().then(async function () {
                                                        const docRef = await addDoc(collection(db, "orders"), {
                                                            email: session.user.email,
                                                            total: total,
                                                            products: JSON.stringify(items),
                                                            delivery: false,
                                                        });
                                                        router.push('/success')
                                                    });
                                                }}
                                                onError={(err) => {
                                                    console.log(err.message)
                                                    toast.error(err.message)
                                                }}
                                            />
                                        </PayPalScriptProvider>
                                    </div>
                                    )
                                }
                            </>
                        )}
                    </div>
                </main>
            </div>
        </Layout>
    )
}

export default Checkout
