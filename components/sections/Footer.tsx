import React from 'react'
import Logo from '../Logo'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import { FiYoutube } from 'react-icons/fi'

const Social = () => {
  return(
    <div className='flex flex-col gap-4'>
      <Logo />
      <div className='flex flex-row gap-4'>
        <Link href="#" className='flex items-center justify-center rounded-full bg-white p-1'>
          <FaInstagram className='text-stone-950'/>
        </Link>
        <Link href="#" className='flex items-center justify-center rounded-full bg-white p-1'>
          <FaFacebookF className='text-stone-950'/>
        </Link>
        <Link href="#" className='flex items-center justify-center rounded-full bg-white p-1'>
          <FaTwitter className='text-stone-950'/>
        </Link>
        <Link href="#" className='flex items-center justify-center rounded-full bg-white p-1'>
          <FiYoutube className='text-stone-950'/>
        </Link>
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <div className='container max-w-[1024px] mx-auto pt-32 relative z-20'>
      <div className='flex flex-col gap-12 md:flex-row justify-between pb-8 px-8'>
        <Social />
        <div className='flex flex-col gap-8'>
          <div className='w-32 flex flex-col gap-2'>
            <p className='p-xs font-semibold text-slate-400'>Location:</p>
            <p>Some Address 121, USA, 12345</p>
          </div>
          <div className='w-32 flex flex-col gap-2'>
            <p className='p-xs font-semibold text-slate-400'>Phone:</p>
            <p>+123456789012</p>
          </div>
        </div>
        <div className='flex flex-col gap-2 text-sm text-slate-400'>
          <Link href="#">Home</Link>
          <Link href="#">Preview</Link>
          <Link href="#">Catalog</Link>
          <Link href="#">About</Link>
          <Link href="#">Contact us</Link>
          <Link href="#">Privacy policy</Link>
        </div>
      </div>
      <hr className='px-16 border-slate-400'/>
      <div className='w-full flex flex-col-reverse gap-y-2 md:flex-row items-center justify-between py-4 text-xs text-slate-400'>
        <p >&copy; Fibipals Co.</p>
        <p>Contact us | keyboard@gamil.com</p>
      </div>
    </div>
  )
}

export default Footer
