import Head from 'next/head'
import React from 'react'
import Header from './Header'

function Layout({ title, children }) {

    return (
        <div className='h-screen'>
            <Head>
                <title>{`Amazon - ${title}`}</title>
            </Head>
            <Header />
            <main className=' min-h-full'>
                {children}
            </main>
            <footer className="flex justify-center items-center shadow-inner mt-20 bg-[#131921] text-white  py-10">
                <p>Copyright © 2022 Bhd Amazon</p>
            </footer>
        </div>
    )
}

export default Layout
