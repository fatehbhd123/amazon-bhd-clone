import Image from 'next/image';
import React from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateProduct } from "../slices/cartSlice"
function CheckoutProduct({ product }) {
    const dispatch = useDispatch();
    const handleUpdate = (i) => {
        if ((parseInt(product.quantity) + i) > 0) {
            dispatch(updateProduct({ id: product.id, qty: i }))
        }
    }
    return (
        <div className='grid grid-cols-5'>
            <Image src={product.image} height={200} width={200} objectFit='contain' />
            <div className='col-span-3 mx-5'>
                <p>{product.title}</p>
                {Array(product.rating).fill().map((_, i) => {
                    return (<StarIcon key={i} className='h-5 text-yellow-500' />)
                })}
                <p className='text-xs my-2 line-clamp-3'>{product.description}</p>
                <div className='mb-5 '>
                    {product.price}$
                </div>
            </div>

            <div className='flex flex-col space-y-2 my-auto justify-self-end text-2xl'>
                <div className='flex items-center justify-evenly'>
                    <span className={`${product.quantity > 1 ? 'text-red-500' : 'text-red-300'}  cursor-pointer font-bold`} onClick={() => handleUpdate(-1)}>-</span>
                    <span>{product.quantity}</span>
                    <span className='text-green-600 cursor-pointer font-bold' onClick={() => handleUpdate(1)}>+</span>
                </div>
                <div className='button cursor-pointer' onClick={() => dispatch(removeFromCart({ id: product.id }))}>Remove from cart</div>
            </div>
        </div>
    )
}

export default CheckoutProduct;