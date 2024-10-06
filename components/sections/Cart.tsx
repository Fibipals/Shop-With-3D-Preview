"use client"

import Link from 'next/link'
import React, { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5'

export interface CartProduct {
  imgSrc: string;
  title: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  addToCart: (product: CartProduct) => void;
  isOpen: boolean;
  toggleCart: () => void;
  cartItems: CartProduct[];
  handleAddProduct: (index: number) => void;
  handleRemoveProduct: (index: number) => void; 
  handleDeleteProduct: (index: number) => void; 
}

const CartContext = createContext<CartContextType>({
  addToCart: () => {},
  isOpen: false,
  toggleCart: () => {},
  cartItems: [],
  handleAddProduct: () => {},
  handleRemoveProduct: () => {},
  handleDeleteProduct: () => {},
});

export const useCart = () => useContext(CartContext);

interface CartProductProps{
    imgSrc: string;
    title: string;
    price: number;
    quantity: number;
    onAdd: () => void;
    onRemove: () => void;
    onDelete: () => void;
}

const CartProduct = ({imgSrc, title, price, quantity, onAdd, onRemove, onDelete}:CartProductProps) => {
    return (
      <div className='h-32 flex flex-row justify-between pr-3 md:pr-8  bg-stone-950 rounded-xl'>

      <div className='flex flex-row gap-4 md:gap-8'>
        <img src={imgSrc} alt="product" width={128} height={128} className='rounded-xl'/>

        <div className='flex flex-col justify-between px-4 py-6 text-slate-200'>
          <h3 className='text-lg font-semibold'>{title}</h3>
          <div className='flex flex-row items-center justify-between'>
            <p className='text-slate-400'>${price}</p>
          </div>
        </div>

      </div>

      <div className='flex flex-row gap-3 md:gap-6 items-center'>

        <div className='flex flex-col md:flex-row gap-y-2 gap-x-4 items-center bg-stone-900 px-2 py-3 md:py-1 md:px-3 rounded-full'>
          <FaPlus className='w-3 h-3 cursor-pointer' onClick={onAdd}/>
          <div>{quantity}</div>
          <FaMinus className='w-3 h-3 cursor-pointer' onClick={onRemove} />
        </div>

        <FaTrash className='w-3 h-3 cursor-pointer' onClick={onDelete}/>
      </div>

    </div>
    )
}


const Cart = () => {
  const { isOpen, toggleCart, cartItems, handleAddProduct, handleRemoveProduct, handleDeleteProduct } = useCart();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    // Update total whenever the cart items change
    const newTotal = cartItems.reduce((sum, product) => sum + product.price * product.quantity, 0);
    setTotal(newTotal);

    // Save cart data to localStorage whenever it changes
    if (cartItems.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } 
  }, [cartItems]);

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: cartItems }),
      });
  
      const { url } = await response.json();
      if (url) {
        window.location.href = url; // Redirect to Stripe Checkout page
      }
    } catch (error) {
      console.error('Error processing checkout:', error);
      toast.error('Checkout failed. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed h-screen w-screen top-0 left-0 flex items-center justify-center  z-50 bg-opacity-75 bg-stone-950'>

      <div className='w-full max-w-4xl h-full md:h-[600px] bg-stone-800 rounded-3xl overflow-hidden'>
        
        <div className='w-full flex items-center justify-between p-8'>
          <h2 className='text-2xl font-semibold'>Your Cart</h2>
          <IoClose className='w-6 h-6 cursor-pointer' onClick={toggleCart} />
        </div>

        {cartItems.length > 0 ? (
          <div className='w-full h-max flex flex-col md:flex-row p-4 md:p-12 gap-8'>
            <div className='h-full md:h-96 flex flex-col gap-y-4 overflow-y-auto'>
              {cartItems.map((product, index) => (
                <CartProduct 
                  key={index}
                  imgSrc={product.imgSrc} 
                  title={product.title} 
                  price={product.price} 
                  quantity={product.quantity}
                  onAdd={() => handleAddProduct(index)}
                  onRemove={() => handleRemoveProduct(index)}
                  onDelete={() => handleDeleteProduct(index)}
                />
              ))}
            </div>
            <div className='w-full md:w-52 flex flex-row md:flex-col items-center justify-between border-t-2 md:border-t-0 md:border-l-2 border-t-slate-200 md:border-l-slate-200 py-6 md:py-0 md:px-8'>
              <p className='text-lg font-semibold text-slate-300'>Total: ${total.toFixed(2)}</p>
              <div onClick={handleCheckout} className='w-36 flex flex-col items-center py-3 rounded-xl font-semibold bg-gradient-to-br from-rose-400 to-fuchsia-700'>
                Pay
              </div>
            </div>
          </div>
        ) : (
          <p className='text-slate-400 text-center mt-32'>👏 There`s currently nothing in here.</p>
        )}
      </div>
    </div>
  );
};

const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartProduct[]>([]);

    useEffect(() => {
      // Load cart data from localStorage on component mount (client-side)
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    }, []);

    const addToCart = (product: CartProduct) => {
  
      const existingProduct = cartItems.find((p) => p.title === product.title);
  
      if (existingProduct) {
        toast('Product already in Cart', {icon: '👏'})
      } else {
        const newCart = [...cartItems, { ...product, quantity: 1 }];
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        toast.success('Product added to cart!')
      }

    };

    const handleAddProduct = (index: number) => {
      const updatedCart = cartItems.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
  
    const handleRemoveProduct = (index: number) => {
      const updatedCart = cartItems.map((item, i) =>
        i === index && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
  
    const handleDeleteProduct = (index: number) => {
      const updatedCart = cartItems.filter((_, i) => i !== index);
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
  
    const toggleCart = () => {
      setIsOpen(!isOpen)
    };
  
    return (
      <CartContext.Provider value={{ 
        addToCart, 
        isOpen, 
        toggleCart, 
        cartItems, 
        handleAddProduct, 
        handleRemoveProduct, 
        handleDeleteProduct  
      }}>
        {children}
      </CartContext.Provider>
    );
};
  
export default Cart;
export { CartProvider };
