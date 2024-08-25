"use client"

import Link from 'next/link'
import React, { createContext, useContext, useState } from 'react'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5'

const products = [
    {
      imgSrc: "/assets/keyboard1.png",
      title: "Magic Keyboard",
      price: 79.99,
      modelSrc: "/assets/keyboard.glb", 
    },
    {
      imgSrc: "/assets/keyboard2.png",
      title: "Dragon Keyboard",
      price: 129.99,
      modelSrc: "/assets/keyboard2.glb",
    },
    {
      imgSrc: "/assets/keyboard3.png",
      title: "Gold Keyboard",
      price: 99.99,
      modelSrc: "/assets/keyboard3.glb",
    }
];

const CartContext = createContext({ isOpen: true, toggleCart: () => {} });

export const useCart = () => useContext(CartContext);

interface CartProductProps{
    imgSrc: string;
    title: string;
    price: number;
}

const CartProduct = ({imgSrc, title, price}:CartProductProps) => {
    return (
        <div className='h-32 flex flex-row justify-between pr-16'>
            <div className='flex flex-row gap-8'>
                <img src={imgSrc} alt="keyboard photo" width={128} height={128} className='rounded-xl'/>
                <div className='flex flex-col justify-between px-4 py-6 text-slate-200'>
                    <h3 className='text-lg  font-semibold'>{title}</h3>
                    <div className='flex flex-row items-center justify-between'>
                    <p className='text-slate-400'>${price}</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-row gap-6 items-center'>
                <div className='flex flex-row gap-4 items-center bg-stone-950 py-1 px-3 rounded-full'>
                    <FaPlus className='w-3 h-3'/>
                    <div>1</div>
                    <FaMinus className='w-3 h-3'/>
                </div>
                <FaTrash className='w-3 h-3'/>
            </div>
        </div>
    )
}


const Cart = () => {
    const { isOpen, toggleCart } = useCart();

    if (!isOpen) return null

    //const total = products.reduce((sum, product, index) => sum + product.price * quantities[index], 0);
  return (
    <div className='fixed h-screen w-screen top-0 left-0 flex items-center justify-center z-50 bg-opacity-75 bg-stone-950'>
      <div className='w-full lg:w-[1024px] h-full md:h-[600px] bg-stone-800 rounded-3xl'>
        <div className='w-full flex items-center justify-between p-8'>
            <h2 className='text-xl font-semibold'>Your Cart</h2>
            <IoClose className='w-6 h-6' onClick={toggleCart}/>
        </div>
        <div className='w-full flex flex-col md:flex-row p-12'>
            <div className='flex-1'>
                {products.map((product, index) => (
                    <CartProduct key={index} imgSrc={product.imgSrc} title={product.title} price={product.price}/>
                ))}
            </div>
            <div className='w-52 flex flex-col justify-between border-l-2 border-l-slate-200 px-8'>
                <p className='text-lg'>Total: $1717</p>
                <Link href="#preview" className='w-36 flex flex-col items-center py-3 rounded-xl font-semibold bg-gradient-to-br from-rose-400 to-fuchsia-700'>Pay</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(true);
  
    const toggleCart = () => setIsOpen(!isOpen);
  
    return (
      <CartContext.Provider value={{ isOpen, toggleCart }}>
        {children}
      </CartContext.Provider>
    );
};
  
export default Cart;
export { CartProvider };
