

import React from 'react'
import { IconType } from 'react-icons';
import AnimatedContainer from './AnimatedContainer';

interface FeaturesCardProps{
    index: number;
    icon: IconType;
    title: string;
    description: string;
}

const FeaturesCard = ({index, icon: Icon, title, description}: FeaturesCardProps) => {
  return (
    <AnimatedContainer delay={index % 2 === 0 ? 0.2 : 0.7} styles='w-80 h-72 bg-stone-800 rounded-xl overflow-hidden relative'>
      <Icon className='absolute top-0 right-0 w-40 h-40 text-stone-900 z-0'/>
      <div className='flex flex-col gap-4 relative px-4 py-6 z-10'>
        <Icon className='w-8 h-8 mb-4'/>
        <h3 className='text-2xl font-semibold'>{title}</h3>
        <p className=' text-slate-300'>{description}</p>
      </div>
    </AnimatedContainer>
  )
}

export default FeaturesCard
