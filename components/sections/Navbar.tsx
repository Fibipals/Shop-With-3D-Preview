"use client"

import Link from 'next/link'
import { FaCartShopping } from 'react-icons/fa6'
import Logo from '../Logo'
import { CartProvider, useCart } from './Cart'

interface NavbarLinkProps{
  href: string
  children: React.ReactNode
}

const NavbarLink = ({href, children}:NavbarLinkProps) => {
  return (
    <Link href={href} className='hidden md:block font-semibold text-sm text-slate-400 '>
      {children}
    </Link>
  )
}

const Navbar = () => {
  const { toggleCart } = useCart();
  return (
    <CartProvider>
      <div className='max-w-[1024px] flex justify-between items-center p-8 mx-auto'>
        <Logo size='lg'/>
        <div className='flex flex-row gap-8 items-center'>
          <NavbarLink href='#preview'>Catalog</NavbarLink>
          <NavbarLink href='#features'>Features</NavbarLink>
          <NavbarLink href='#reviews'>Reviews</NavbarLink>
        </div>
        <FaCartShopping className='w-6 h-6 text-slate-400 cursor-pointer' onClick={toggleCart}/>
      </div>
    </CartProvider>
  )
}

export default Navbar
