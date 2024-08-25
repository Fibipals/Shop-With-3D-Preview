import Image from 'next/image'
import React from 'react'

interface LogoProps{
    size?: 'sm' | 'lg';
}

const Logo = ({size = 'sm'} : LogoProps) => {
    const iconSize = size === 'lg' ? 35 : 25;
    return (
      <div className='flex flex-row gap-2 items-center'>
        <Image src='/assets/logo.png' alt="logo" width={iconSize} height={iconSize} />
        <p className={`text-slate-400 ${size === 'sm' ? 'text-xs' : ''}`}>keyboard</p>
      </div> 
    )
  }
export default Logo
