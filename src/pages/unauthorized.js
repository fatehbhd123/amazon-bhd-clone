import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';

export default function Unauthorized() {

    const router = useRouter();
    const { message } = router.query;
    const { data: session, status } = useSession();
    return (
        <Layout title="Unauthorized Page">
            <div className='max-w-screen-lg flex flex-col items-center mx-auto pt-10'>
                {session ? (<>
                    <h1 className="text-3xl mb-6">You are logged in!</h1>
                    <div className='button' onClick={() => router.push('/')}>Home page</div>
                </>
                ) : (
                    <>
                        <h1 className="text-3xl mb-6">Access Denied</h1>
                        {message && <div className="mb-4 text-red-500">{message}</div>}
                        <div className='button' onClick={signIn}>Sign in</div>
                    </>

                )}
            </div>
        </Layout>
    );
}