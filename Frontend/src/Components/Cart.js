import React, { useContext, useEffect } from "react";
import { CartContext } from "../CartContext";
import CartProduct from "./CartProduct";

function Cart() {
  let total = 0;
  useEffect(() => getCartItems, []);

  const { cart } = useContext(CartContext);

  const getCartItems = async () => {
    try {
      const res = await fetch("http://localhost:8000/cart/getCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: localStorage.getItem("key"),
        }),
      });
      const resData = await res.json();
      console.log("getting cart");
      console.log(resData);
    } catch (e) {
      console.log("Error in Login : " + e);
    }
  };
  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <h2 className="text-xl font-medium mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="flex w-full justify-around flex-wrap">
            {cart.map((item) => {
              {
                total += item.price * item.quantity;
              }

              return (
                <>
                  <CartProduct key={item.id} {...item} />
                </>
              );
            })}
            {/* Add logic for calculating total price here */}
            
          </div>
          <div className="flex justify-end mt-4">
              <p className="text-gray-800 font-medium">Total: </p>
              <p className="text-green-500 font-medium ml-2">{total} </p>{" "}
              {/* Replace with calculated total */}
            </div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md mt-4">
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
