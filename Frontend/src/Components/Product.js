import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser"
import { CartContext } from "../CartContext";


// https://www.zara.com/in/en/abstract-print-shirt-p04416021.html?v1=336869710&v2=2351804&a

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [size , setSize] = useState("")
  const [quantity , setQuantity] = useState()

  const {addToCart } = useContext(CartContext)
  const {cart} = useContext(CartContext)

  const imgArr = [
    "https://static.zara.net/assets/public/33be/41c1/548048199382/813e91792f15/04416021620-p/04416021620-p.jpg?ts=1709736269357&w={width}",
    "https://static.zara.net/assets/public/50ce/556f/42a94ab0a274/df337273edbf/04416021620-a1/04416021620-a1.jpg?ts=1709736268402&w={width}",
    "https://static.zara.net/assets/public/f476/6c50/6f4140749aa4/185106202b6e/04416021620-a2/04416021620-a2.jpg?ts=1709736269038&w={width}",
    "https://static.zara.net/assets/public/bf75/7585/7a5d43368883/ab6a17d794ad/04416021620-a3/04416021620-a3.jpg?ts=1709736396473&w={width}",
    "https://static.zara.net/assets/public/306a/6644/ebfa4984bb61/f6b5b46ffb1d/04416021620-a4/04416021620-a4.jpg?ts=1709736269075&w={width}",
    "https://static.zara.net/assets/public/d150/809f/857547c49d61/726f3a606a26/04416021620-a5/04416021620-a5.jpg?ts=1709736400862&w={width}",
    "https://static.zara.net/assets/public/221d/b124/70cc4618841e/37cf0f7d14f6/04416021620-e1/04416021620-e1.jpg?ts=1709567837977&w={width}",
    "https://static.zara.net/assets/public/c016/fceb/1fac4d81b4ed/aaa546d81999/04416021620-e2/04416021620-e2.jpg?ts=1709567837399&w={width}",
  ];

  const getProduct = async () => {
    try {
      const res = await fetch(`http://localhost:8000/product/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });

      const resData = await res.json();
      setProduct(resData);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddingCart = () => {
    console.log(size)
    if(!size || !quantity) {
      return
    }
    const temp = {}
    temp.id = product.id
    temp.name = product.name
    temp.size = size
    temp.quantity = quantity
    temp.price = parseFloat(product.detail.colors[0].price) / 100
    temp.img = product.detail.colors[0].mainImgs[0].url
    console.log(temp)
    addToCart(temp)
  }

  function sizeSelected(e) {
    const s = document.getElementById("s");
    const m = document.getElementById("m");
    const l = document.getElementById("l");
    const xl = document.getElementById("xl");

    const temp = e.target.dataset.value
    console.log(temp)
    setSize(temp);

    s.style.backgroundColor = "white";
    m.style.backgroundColor = "white";
    l.style.backgroundColor = "white";
    xl.style.backgroundColor = "white";

    m.style.color = "black";
    s.style.color = "black";
    l.style.color = "black";
    xl.style.color = "black";

    e.target.style.backgroundColor = "black";
    e.target.style.color = "white";
  }

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <div className="container flex ">
        {console.log(product)}
        <div className="thumb h-[90vh] flex gap-1 flex-col overflow-y-scroll w-fit ml-10  ">
          {product.detail != undefined ? (
            Array.from(product.detail.colors[0].mainImgs).map((ele) => {
              // console.log(ele.url);
              return (
                <img
                  src={ele.url}
                  className="small w-[70px] p-1 mr-2 cursor-pointer"
                  data-value={ele.url}
                  onClick={(e) => {
                    const big = document.getElementById("big");
                    console.log(e.target.src);
                    big.setAttribute("src", e.target.src);
                  }}
                />
              );
            })
          ) : (
            <h1>Loading...</h1>
          )}
        </div>

        {product.detail != undefined ? (
          <div className="big w-[700px] h-[700px] flex justify-center align-top overflow-hidden ">
            <img
              src={product.detail.colors[0].mainImgs[0].url}
              className=" object-contain duration-300 cursor-zoom-in"
              id="big"
              onClick={(e) => {
                console.log(e.target.style.scale);
                if (e.target.style.scale == 1.5) {
                  e.target.style.scale = 1;
                } else {
                  e.target.style.scale = 1.5;
                }
              }}
            />
          </div>
        ) : (
          <h1></h1>
        )}

        {product.detail != undefined ? (
          <div className="details m-5 font-josefin p-4 pr-12 ">
            <div className="detail mb-10">
              <div className="name text-3xl">{product?.name}</div>
              <div className="price font-light">
                Rs. {parseFloat(product.detail.colors[0].price) / 100}
              </div>
              <div className="light font-light"> MRP incl.of all taxes</div>
            </div>
            <div className="desc font-light mb-10">
              {parse(product.seo.description)}
            </div>
            <div className="s" data-value="-1">
              <div className="sizes grid grid-cols-2 mb-1">
                <div
                  className="size border border-black p-1 text-center cursor-pointer duration-200 mr-1"
                  onClick={(e) => sizeSelected(e)}
                  id="s"
                  data-value='s'
                >
                  S
                </div>
                <div
                  className="size border border-black p-1 text-center cursor-pointer duration-200"
                  onClick={(e) => sizeSelected(e)}
                  id="m"
                  data-value='m'
                >
                  M
                </div>
              </div>

              <div className="sizes grid grid-cols-2 mb-10">
                <div
                  className="size border border-black p-1 text-center cursor-pointer duration-200 mr-1"
                  onClick={(e) => sizeSelected(e)}
                  id="l"
                  data-value='l'

                >
                  L
                </div>
                <div
                  className="size border border-black p-1 text-center cursor-pointer duration-200"
                  onClick={(e) => sizeSelected(e)}
                  id="xl"
                  data-value='xl'
                >
                  XL
                </div>
              </div>
            </div>

            <div className="quan p-2">
              <span className="mr-4">Quantity</span>
              <input type="number" className="border p-1 w-[50px] text-right" name="quantity" onChange={(e) => {
                setQuantity(e.target.value)
              }}></input>
              </div>

            <div className="add border text-center bg-black text-white p-2 cursor-pointer" onClick={() => handleAddingCart()}>
              ADD
            </div>
          </div>
        ) : (
          <h1></h1>
        )}
      </div>
    </>
  );
}

export default Product;
