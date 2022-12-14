import React from 'react'
import Product from './Product'

function ProductFeed({ products }) {
    return (
        <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
            {products.slice(0, 4).map((product, i) => {
                return (<Product key={i} product={product} />)
            })}
            <img
                src="https://links.papareact.com/dyz"
                alt=""
                className='md:col-span-full'
            />
            <div className='md:col-span-2'>
                {products.slice(4, 5).map((product, i) => {
                    return (<Product key={i} product={product} />)
                })}
            </div>
            {products.slice(5, products.length).map((product, i) => {
                return (<Product key={i} product={product} />)
            })}
        </div>
    )
}

export default ProductFeed
