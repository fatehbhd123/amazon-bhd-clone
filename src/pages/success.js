import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react'
import Layout from '../components/Layout'

function Success() {
    const router = useRouter();
    return (
        <Layout title='Success' >
            <div className='bg-gray-300 max-w-screen-lg mx-auto'>
                <div className='flex flex-col p-10 bg-white'>
                    <div className='flex items-center space-x-2 mb-5'>
                        <CheckCircleIcon className='text-green-500 h-10' />
                        <h1 className='text-3xl'>Thank you, your order has been confirmed</h1>
                    </div>
                    <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
                    </p>
                    <div className='button mt-16' onClick={() => router.push('orders')}>Go to my orders</div>
                </div>
            </div>
        </Layout>
    )
}

export default Success

Success.auth = true;