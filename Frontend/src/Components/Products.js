import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import useSearchFilter from "../Hooks/useSearchFilter";

import { useNavigate } from "react-router-dom";

function Products() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filterProducts, setFilterProducts] = useState(allProducts);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    color: "",
    price: "",
    type: "",
  });


  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    console.log(filter);
    handleFilterChange();
    console.log("change");
  }, [allProducts, filter]);

  const getProductData = async () => {
    const res = await fetch("http://localhost:8000/home", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await res.json();

    setAllProducts(resData[0]?.elements);
    setFilterProducts(allProducts);
  };

  const navigateToProduct = (e) => {
    const id = e.currentTarget.dataset.value;
    navigate(`${id}`);
  };

  const searchFilterProducts = () => {
    const temp = useSearchFilter(allProducts, search);
    setFilterProducts(temp);
  };

  const applyFilter = (product) => {
    const { color, price, type } = filter;
    return (
      color == "" ||
      product.commercialComponents[0].detail.colors[0].name
        .toLowerCase()
        .includes(color.toLowerCase())
    );
  };

  const handleFilterChange = () => {
    const tempPro = allProducts.filter(applyFilter);
    console.log("temp");
    console.log(tempPro);
    setFilterProducts(tempPro);
  };

  return (
    <div className="con flex flex-col w-[100vw] justify-center overflow-hidden h-full">
      <div className="my-12 flex justify-center">
        {/* Search functionality */}
        <div className="search border border-gray-400 w-fit rounded-full flex justify-center items-center pr-4">
          <input
            type="text"
            placeholder="Search.."
            className="bg-gray p-2 pl-5 rounded-full w-[300px] outline-0 "
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <IoSearchOutline
            className="cursor-pointer"
            onClick={() => {
              searchFilterProducts();
            }}
          />
        </div>

        {/* Product Filtering */}
        <div className="filter text-2xl ml-32 flex items-center  rounded px-10 cursor-pointer ">
          <CiFilter
            className="bg-black w-[50px] h-[50px] p-3 font-extrabold rounded text-white"
            onClick={() => {
              setIsOpen(!isOpen);
              // handleFilterChange();
              console.log(isOpen);
            }}
          />
          {isOpen ? (
            <>
              <div className="drawer w-[490px] p-4 absolute right-0 top-[135px] bg-gray-50 border rounded text-small ml-10 pl-5  items-center ">
                <div className=" font-josefin text-xl p-1 mr-4">Color</div>
                <hr />
                <div className="flex gap-5">
                  <div className="flex border w-fit rounded-full p-2 mt-3 ring-2 ring-blue-400">
                    <input
                      type="radio"
                      className="mr-2"
                      value="blue"
                      name="color"
                      onClick={(e) => {
                        // let temp = filter;
                        setFilter((filter) => ({
                          ...filter,
                          color: "blue",
                        }));
                      }}
                    />
                    <span className=" text-sm bg-white"> Blue</span>
                  </div>
                  <div className="flex border w-fit rounded-full p-2 mt-3 ring-2 ring-white">
                    <input
                      type="radio"
                      className="mr-2"
                      value="white"
                      name="color"
                      onClick={(e) => {
                        // let temp = filter;
                        setFilter((filter) => ({
                          ...filter,
                          color: "white",
                        }));
                      }}
                    />
                    <span className=" text-sm bg-white"> White</span>
                  </div>
                  <div className="flex border w-fit rounded-full p-2 mt-3 ring-2 ring-black">
                    <input
                      type="radio"
                      className="mr-2"
                      value="black"
                      name="color"
                      onClick={(e) => {
                        // let temp = filter;
                        setFilter((filter) => ({
                          ...filter,
                          color: "black",
                        }));
                      }}
                    />
                    <span className=" text-sm bg-white"> Black</span>
                  </div>
                  <div className="flex border w-fit rounded-full p-2 mt-3 ring-2 ring-white">
                    <input
                      type="radio"
                      className="mr-2"
                      value="black"
                      name="color"
                      // checked = 'true'
                      defaultChecked="true"
                      onClick={(e) => {
                        // let temp = filter;
                        setFilter((filter) => ({
                          ...filter,
                          color: "",
                        }));
                      }}
                    />
                    <span className=" text-sm bg-white"> default</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        {filterProducts.map((ele) => {
          return (
            <div
              className="font-josefin flex flex-col justify-center m-4 cursor-pointer snap-center "
              data-value={
                ele.commercialComponents[0].seo.keyword +
                "-p" +
                ele.commercialComponents[0].seo.seoProductId +
                ".html?v1=" +
                ele.commercialComponents[0].id
              }
              onClick={navigateToProduct}
              key={ele.commercialComponents[0].seo.id}
            >
              <div className="imgcon flex justify-center  overflow-hidden ">
                {
                  <img
                    src={
                      ele?.commercialComponents[0]?.detail.colors[0].xmedia[0]
                        .url
                    }
                    alt="image"
                    value={"hii"}
                    className="hover:scale-110 duration-300 w-[370px] h-[400px] object-contain"
                    // onClick={navigateToProduct}
                  />
                }
              </div>
              <div className="prod-info ml-12 mt-3 font-light flex flex-col max-w-[460px]">
                <div className="productName overflow-hidden w-[100%]">
                  {ele?.commercialComponents[0]?.name}
                </div>
                <div className="price">
                  Rs. {parseFloat(ele?.commercialComponents[0]?.price) / 100}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
