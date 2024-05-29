import React, { useState } from "react";
import { IoIosLogIn } from "react-icons/io";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaJsfiddle, FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// axios.defaults.withCredentials = true;

const Login = () => {
  //   const [token, setToken, removeToken] = useCookies();
  const [hidePassword, setHidePassword] = useState(true);
  const navigate = useNavigate();

  function toggleShow() {
    setHidePassword(!hidePassword);
  }


  const handleLoginSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),

      });
      const resData = await res.json();
      if(resData.user.key) { 
        localStorage.setItem('key' , resData.user.key)
      }
      console.log(resData)
    } catch (e) {
      console.log("Error in Login : " + e);
    }
  };

  const loginValidateSchema = yup.object().shape({
    email: yup.string().email().required("email is a required field"),
    password: yup.string().required("Password is a required field"),
  });

  const formik = useFormik({
    initialValues: {
      email: "@rishi",
      password: "rishirishi",
    },
    validationSchema: loginValidateSchema,
    onSubmit: (values) => {
      handleLoginSubmit(values);
      console.log(JSON.stringify(values));
    },
  });

  return (
    <div>
      <div className="container flex flex-col gap-2 align-middle mx-auto mt-6 p-3 px-8 rounded w-[700px]">
        {/* logo */}
        <div className="logoCon text-center mx-auto rounded-full overflow-hidden mt-3">
          <IoIosLogIn className="text-5xl bg-sky-800  text-white font-thin p-2" />
        </div>
        <div className="login text-2xl mx-auto font-poppins font-normal mb-2">
          Login
        </div>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          {/* handle */}
          <div className="handle w-full mt-3">
            <label className=" font-inter text-base after:content-['*'] after:text-red-500">
              Email{" "}
            </label>
            <input
              type="text"
              name="email"
              value={formik.values.email}
              className="handleip mt-1 px-2 py-3 text-base w-full  border-slate-300 rounded border outline-none focus:border-sky-700 "
              onChange={formik.handleChange}
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}

          {/* password */}
          <div className="password w-full mt-3">
            <label className=" font-inter text-base after:content-['*'] after:text-red-500">
              Password{" "}
            </label>
            <div className="con flex align-middle ">
              <input
                type={hidePassword ? "password" : "text"}
                name="password"
                value={formik.values.password}
                className="password mt-1 px-2 py-3 text-base w-full h-full  border-slate-300 rounded border outline-none focus:border-sky-700 "
                onChange={formik.handleChange}
              />
              {hidePassword ? (
                <span>
                  <FaRegEyeSlash
                    className=" cursor-pointer h-[48px] w-[50px] p-3 border rounded mt-1"
                    onClick={toggleShow}
                  />
                </span>
              ) : (
                <span>
                  <FaRegEye
                    className=" cursor-pointer h-[48px] w-[50px] p-3 border rounded mt-1"
                    onClick={toggleShow}
                  />
                </span>
              )}
            </div>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500">{formik.errors.password}</div>
          ) : null}

          {/* {button} */}
          <div className="btn-cover flex gap-2">
            <button
              type="submit"
              className=" bg-blue-600 py-2 mt-5 w-full text-white rounded hover:bg-sky-500 transition-colors"
            >
              Login
            </button>{" "}
            <Link
              to="/register"
              className=" text-center text-blue-600 border-2 border-blue-600 py-2 mt-5 w-full cursor-pointer bg-white rounded hover:text-sky-700 transition-colors"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
