//"use client"

import Link from 'next/link'
import { FaCartShopping } from 'react-icons/fa6'
import Logo from '../Logo'
//import { CartProvider, useCart } from './Cart'

const Navbar = () => {
  //const { toggleCart } = useCart();
  return (
    //<CartProvider>
      <div className='max-w-[1024px] flex justify-between items-center p-8 mx-auto'>
        <Logo size='lg'/>
        <div className='flex flex-row gap-8 items-center'>
          <Link href='#preview' className='hidden md:block font-semibold text-sm text-slate-400 '>Catalog</Link>
          <Link href='#features' className='hidden md:block font-semibold text-sm text-slate-400 '>Features</Link>
          <Link href='#reviews' className='hidden md:block font-semibold text-sm text-slate-400 '>Reviews</Link>
        </div>
        <FaCartShopping className='w-6 h-6 text-slate-400 cursor-pointer' //onClick={toggleCart}
        />
      </div>
    //</CartProvider>
  )
}

export default Navbar
