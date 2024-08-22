import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const itemIndex = prevCart.findIndex(cartItem => cartItem.id === item.id);
      if (itemIndex > -1) {
        const newCart = [...prevCart];
        newCart[itemIndex].quantity += 1;
        return newCart;
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId, quantity) => {
    setCart(prevCart => {
      return prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: Math.max(quantity, 1) } : item
      );
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price.replace('R', '')) * item.quantity, 0).toFixed(2);
  };

  const clearCart = () => setCart([]);

  const getItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, calculateTotal, clearCart, getItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
