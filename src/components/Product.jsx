import React, { useState } from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/outline'
function Product({ product }) {
    const MAX_RATING = 5;
    const MIN_Rating = 2;
    const [rating, setRating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_Rating + 1) + MIN_Rating)
    )
    return (
        <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{product.category}</p>
            <Image src={product.image}
                height={200}
                width={200}
                objectFit='contain'
            />
            <h4 className='my-3'>{product.title}</h4>
            <div className='flex'>
                {Array(product.rating).fill().map((_, i) => {
                    return (<StarIcon key={i} className='h-5 text-yellow-500' />)
                })}
            </div>
            <p className='text-xs my-2 line-clamp-2'>{product.description}</p>
            <div className='mb-5 '>
                {product.price}$
            </div>
            <div className='flex items-center space-x-2 -mt-5'>
                {product.hasPrime && (
                    <div>
                        <img
                            className='w-12'
                            src='https://links.papareact.com/fdw'
                            alt="" />
                        <p className='text-xs text-gray-500'>Free next-day delivery</p>
                    </div>)
                }
            </div>
            <div className='mt-auto button text-center cursor-pointer'>Add to cart</div>
        </div>
    )
}

export default Product
