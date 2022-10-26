import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../slices/cartSlice"

function Product({ product }) {
    const dispatch = useDispatch();
    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    }
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
            <div
                onClick={addToCartHandler}
                className='mt-auto button text-center cursor-pointer'>Add to cart</div>
        </div>
    )
}

export default Product
