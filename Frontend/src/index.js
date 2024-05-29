import React from "react";
import ReactDom from "react-dom/client";
import AppLayout from "./Components/AppLayout";
import Home from "./Components/Home";
import Product from "./Components/Product";
import Products from "./Components/Products";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Cart from "./Components/Cart";
import { CartProvider } from "./CartContext"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <Product />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
);
