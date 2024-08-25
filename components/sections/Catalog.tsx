import React from 'react'
import ProductCard from '../ProductCard';
import Cart, { CartProvider } from './Cart';

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
    price: 89.99,
    modelSrc: "/assets/keyboard2.glb",
  },
  {
    imgSrc: "/assets/keyboard3.png",
    title: "Gold Keyboard",
    price: 99.99,
    modelSrc: "/assets/keyboard3.glb",
  }
];

export interface ProductType {
  imgSrc: string;
  title: string;
  price: number;
  modelSrc: string;
}

interface CatalogProps {
  selectedProduct: ProductType;
  onProductClick: (product: ProductType) => void;
}

const Catalog = ({ selectedProduct, onProductClick }:CatalogProps) => {
  return (
    <CartProvider>
      <div className='max-w-[1024px] mx-auto'>
        <h2 className='text-2xl font-semibold pl-4 md:pl-16 pb-16'>
          <span className='animate-pulse'>/ </span> 
          catalog
        </h2>
        <div className='w-full flex flex-col lg:flex-row gap-6 mx-auto'>
          {products.map((product, index) => (
            <ProductCard 
              key={index} 
              index={index} 
              title={product.title} 
              imgSrc={product.imgSrc} 
              price={product.price} 
              isActive={selectedProduct.title === product.title} 
              onClick={() => onProductClick(product)}
            />
          ))}
        </div>
      </div>
    </CartProvider>
  )
}

export default Catalog