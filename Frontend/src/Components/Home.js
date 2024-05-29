import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// https://www.zara.com/in/en/category/2351804/products?regionGroupId=72&ajax=true
function Home() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    getBestSellers();
  }, []);

  const getBestSellers = async () => {
    const res = await fetch("http://localhost:8000/home", {
      method: "GET",
      headers: {
        "Content-Type": "appliaction/json",
      },
    });
    const resData = await res.json();
    setAllProducts(resData[0]?.elements);

    console.log(resData);
  };

  const navigateToProduct = (e) => {
    navigate("/products")
  }

  return (
    <div className="homePage">
      <div className=" w-full flex items-start overflow-hidden h-[800px] bg-main-pic  relative bg-cover">
        <div className=" absolute bottom-4 left-10 text-3xl font-josefin text-[#222831] flex flex-col">
          <span className="">Trendings . . .</span>
          <button className="text-xl bg-white text-[#76ABAE] p-4 cursor-pointer">
            Shop Now
          </button>
        </div>
      </div>
      {/* b2f1f4 */}
      <div className="con flex justify-center bg-[#76ABAE] ">
        <div className="tagLine mt-9 w-[80%] border-2 border-[#76ABAE] py-9 text-xl font-josefin text-center pb-20">
          Experience the epitome of men’s fashion with UrbanMacho, your ultimate
          online destination for high-quality, stylish clothing. Our curated
          collection is designed to cater to the modern man, ensuring you feel
          confident and look impeccable in every situation
        </div>
      </div>
      <div className="mustHave flex flex-col p-3 ">
        <div className="must py-24 flex flex-col justify-center w-full font-josefin">
          <span className="text-center text-7xl ">Must Haves</span>
          <span className="text-center">Some Of Our Best This Week</span>
        </div>

        <div className="carousel flex overflow-x-scroll snap-x scroll-smooth ">
          {/* {console.log(allProducts.length)} */}
          {allProducts.slice(0,10).map((ele) => {
            return(
            <>
              <div className="font-josefin flex flex-col justify-center m-4 cursor-pointer snap-center" data-value={ele.commercialComponents[0].id} onClick={navigateToProduct}>
                <div className="imgcon w-[400px] h-[500px] overflow-hidden  ">
                  {
                    <img
                      src={
                        ele?.commercialComponents[0]?.detail
                          .colors[0].xmedia[0].url
                      }
                      alt="image"
                      value={"hii"}
                      className="hover:scale-110 duration-300 "
                      // onClick={navigateToProduct}
                    />
                  }
                </div>
                <div className="productName text-center mt-3">
                  {ele?.commercialComponents[0]?.name}
                </div>
                <div className="price text-center">
                  Rs. {ele?.commercialComponents[0]?.price}
                </div>
                <div className="size flex justify-center mb-3">
                  <li className="list-none border-2 ml-3 border-black px-1">
                    X
                  </li>
                  <li className="list-none border-2 ml-3 border-black px-1">
                    M
                  </li>
                  <li className="list-none border-2 ml-3 border-black px-1">
                    L
                  </li>
                </div>
              </div>
              {/* </div> */}
            </>);
          })}
        </div>
      </div>
      //{" "}
    </div>
  );
}

export default Home;
