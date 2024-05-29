import React, { useState } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import { Outlet } from "react-router-dom";

function AppLayout() {
  const [cart, setCart] = useState([
    { product_name: "", quantity: 0, size: "", price: 0 },
  ]);

  return (
    <>
        <Navbar />
        <Outlet cart={cart} setCart={setCart} />
    </>
  );
}

export default AppLayout;
