// CartContext.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([
    {
      id: 345782617,
      name: "WATERCOLOUR PRINT SHIRT",
      size: "s",
      quantity: "10",
      price: 3590,
      img: "https://static.zara.net/assets/public/89df/ea7f/b77d4c29a638/7f93b580c087/04427400047-p/04427400047-p.jpg?ts=1709222064735&w={width}",
    },
  ]);

  const addToCart = (item) => {
    // Check if the item is already in the cart
    const isItemInCart = cart.some(
      (cartItem) => cartItem.id === item.id && cartItem.size === cartItem.size
    );

    // If the item is not in the cart, add it
    if (!isItemInCart) {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
