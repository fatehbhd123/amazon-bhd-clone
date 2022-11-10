import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Layout from '../components/Layout'
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from '../../firebase';
import Order from '../components/Order';

function Orders({ orders }) {
    console.log(orders)

    return (
        <Layout title='Orders'>
            <div className='p-10 max-w-screen-lg mx-auto'>
                <h1 className='text-3xl border-b mb-2 pb-4 border-yellow-400'>Your orders</h1>
                <div className='mt-5 space-y-6'>
                    {orders && orders.map((o, i) => {
                        return (
                            <Order key={i} order={o} />
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}

export default Orders


export async function getServerSideProps(context) {
    const email = await getSession(context).then(e => e?.user?.email);
    if (email) {
        const q = query(collection(db, "orders"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        const orders = [];
        querySnapshot.forEach((doc, i) => {
            orders.push(doc.data())
        });
        return {
            props: {
                orders,
            }
        }
    } else {
        return {
            props: {
                orders: []
            }
        }
    }
}
Orders.auth = true;