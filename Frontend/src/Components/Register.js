import React, { useState } from "react";
import { FaExclamation, FaSignInAlt } from "react-icons/fa";
import { useFormik } from "formik";
import * as yup from "yup";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Firstname is an required field")
    .min(4, "Too Short")
    .max(40, "Too Long"),
  lastName: yup.string(),
  //   handle: yup.string().required("handle is an required field").min(5,"Too Short"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be 8-12 characters long...")
    .max(12, "Password must be 8-12 characters long...")
    .required("Password is an required field"),
  cpassword: yup
    .string()
    .min(8, "Password must be 8-12 characters long...")
    .max(12, "Password must be 8-12 characters long...")
    .required("Password is an required field"),
});

const handleSubmit = async (data) => {
  try {
    const res = await fetch('http://localhost:8000/auth/register' ,{
      method : 'POST' ,
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(data)
    })
    const resData = await res.json();
    console.log(resData);
  }catch(e){
    console.log('Error in registering : ' + e)
  }
}

function Register() {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideCPassword, setHideCPassword] = useState(true);
  const navigate = useNavigate();

  function toggleShow() {
    setHidePassword(!hidePassword);
  }
  function toggleShowC() {
    setHideCPassword(!hideCPassword);
  }


  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cpassword: "",
      // bgfile: null,
      // firstName: "Rishi",
      // lastName: "Dhimmar",
      // handle: "@rishi",
      // password: "rishirishi",
      // cpassword: "rishirishi",
      // file: null,
    },
    validationSchema: registerSchema,
    validate: (values) => {
      const errors = {};

      if (values.cpassword !== values.password) {
        errors.cpassword = "This field must be same as Password";
      }
      return errors;
    },

    onSubmit: (values) => {
      console.log(JSON.stringify(values));
      handleSubmit(values)
    },
  });

  return (
    <div>
      <div className="container flex flex-col gap-2 align-middle mx-auto mt-6 p-3 px-8 rounded w-[700px]">
        {/* logo */}
        <div className="logoCon text-center mx-auto rounded-full overflow-hidden mt-3">
          <FaSignInAlt className="text-5xl bg-sky-800  text-white font-thin p-2" />
        </div>
        <div className="signin text-2xl mx-auto font-poppins font-normal mb-2">
          Signin
        </div>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          {/* fname lname */}
          <div className="name flex flex-col justify-between lg:flex-row">
            <div className="fname lg:w-[45%] w-full">
              <label className=" font-inter text-base after:content-['*'] after:text-red-500">
                First Name{" "}
              </label>
              <input
                type="text"
                name="firstName"
                value={formik.values.firstName}
                className="fnameip mt-1 px-2 py-3 text-base w-full  border-slate-300 rounded border outline-none focus:border-sky-700 "
                onChange={formik.handleChange}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-red-500">{formik.errors.firstName}</div>
              ) : null}
            </div>
            <div className="lname lg:w-[45%] w-full">
              <label className=" font-inter text-base ">Last Name </label>
              <input
                type="text"
                name="lastName"
                value={formik.values.lastName}
                className="lnameip mt-1 px-2 py-3 text-base w-full  border-slate-300 rounded border outline-none focus:border-sky-700 "
                onChange={formik.handleChange}
              />
            </div>
          </div>
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="text-red-500">{formik.errors.lastName}</div>
          ) : null}

          {/* handle */}
          <div className="handle w-full mt-3">
            <label className=" font-inter text-base after:content-['*'] after:text-red-500">
              email{" "}
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

          <div className="cpassword w-full mt-3">
            <label className=" font-inter text-base after:content-['*'] after:text-red-500">
              Confirm Password{" "}
            </label>
            <div className="con flex align-middle">
              <input
                type={hideCPassword ? "password" : "text"}
                name="cpassword"
                value={formik.values.cpassword}
                className="password mt-1 px-2 py-3 text-base w-full  border-slate-300 rounded border outline-none focus:border-sky-700 "
                onChange={formik.handleChange}
              />
              {hideCPassword ? (
                <span>
                  <FaRegEyeSlash
                    className=" cursor-pointer h-[48px] w-[50px] p-3 border rounded mt-1"
                    onClick={toggleShowC}
                  />
                </span>
              ) : (
                <span>
                  <FaRegEye
                    className=" cursor-pointer h-[48px] w-[50px] p-3 border rounded mt-1"
                    onClick={toggleShowC}
                  />
                </span>
              )}
            </div>
          </div>
          {formik.touched.cpassword && formik.errors.cpassword ? (
            <div className="text-red-500">{formik.errors.cpassword}</div>
          ) : null}


          {/* {button} */}
          <button
            type="submit"
            className=" bg-blue-600 py-2 mt-5 w-full text-white rounded hover:bg-sky-500 transition-colors"
          >
            Register
          </button>
          <div className="text-sm text-center font-poppins mt-4">
            Already have an account ?{" "}
            <Link
              to="../login"
              className="text-sky-800 hover:text-sky-600 cursor-pointer "
            >
              Signin
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
