import React from "react";
import { FaRegUser } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { FaOpencart } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
    return (
    <div className="nav py-7 flex justify-around bg-[#222831] text-white">
      <div className=" font-josefin text-2xl  cursor-pointer">UrbanMacho</div>
      <div className="flex justify-between items-center">
        <li className=" list-none mr-5 cursor-pointer hover:border-b-white border-b-2 border-transparent duration-500 font-josefin text-sm" onClick={() => navigate('/home')}>
          HOME
        </li>
        <li className=" list-none mr-5 cursor-pointer hover:border-b-white border-b-2 border-transparent duration-500 font-josefin text-sm" onClick={() => navigate('/products')}>
          PRODUCTS
        </li>
        <li className=" list-none mr-5 cursor-pointer hover:border-b-white border-b-2 border-transparent duration-500 font-josefin text-sm">
          ABOUT US
        </li>
        {/* <li>SHOP</li> */}
      </div>
      <div className="flex">
        <li className=" list-none mr-5 cursor-pointer flex items-center text-xl" onClick={() => {
          navigate('/login')
        }}>
          <FaRegUser />
        </li>
        <li className=" list-none mr-5 cursor-pointer flex items-center text-xl">
          <IoSearchOutline />
        </li>
        <li className=" list-none mr-5 cursor-pointer flex items-center text-xl">
          <Link to={'/cart'}>
          <FaOpencart />

          </Link>
        </li>
      </div>
    </div>
  );
}

export default Navbar;
