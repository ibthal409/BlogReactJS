import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

import Login from "./Login";

export default function Register() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [err, setError] = useState(null);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(inputs);
      navigate("/");
      console.log(res);
    } catch (err) {
      setError(err.response.data.error || null);
      // setError("eeroor");
    }
  };
  console.log(err);
  console.log(inputs);
  return (
    <div
      className="Container-Form"
      style={
        {
          // backgroundImage: `url("../public/reset.svg")`,
          // minHeight: "100vh",
        }
      }
    >
      <div className="flex container  justify-center items-center ">
        <div className="MainForm mt-8 w-4/12">
          <div>
            <h1 className="mt-5 ">Register</h1>
          </div>
          <div className="Form ">
            <form
              className="mt-5 container mx-auto"
              // onSubmit={handleSubmit(onSubmit)}
            >
              <label className="form-control w-full max-w-xl mt-3">
                <div className="label">
                  <span className="label-text">UserName</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="name"
                  className="input input-bordered w-full max-w-xl px-10"
                  onChange={handleChange}
                />
              </label>
              {/* <h2>{errors.Email && <p>Email is required.</p>}</h2> */}
              <label className="form-control w-full max-w-xl mt-3">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  name="email"
                  className="input input-bordered w-full max-w-xl px-10"
                  onChange={handleChange}
                />
              </label>
              {/* <h2>{errors.Email && <p>Email is required.</p>}</h2> */}

              <label className="form-control w-full max-w-xl  mt-3">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="password"
                  placeholder="Enter the password"
                  name="password"
                  className="input input-bordered w-full max-w-xl px-10 "
                  onChange={handleChange}
                />
              </label>
              {/* <h2>{errors.Password && <p>Password is required.</p>}</h2> */}
              <label className="form-control w-full max-w-xl mt-3">
                <div className="label">
                  <span className="label-text">confirm password</span>
                </div>
                <input
                  type="password"
                  placeholder="Enter the password"
                  name="passwordConfirm"
                  className="input input-bordered w-full max-w-xl px-10  py-3"
                  onChange={handleChange}
                />
              </label>
              <button
                className="btn w-full max-w-xl  mt-5 bg-[#425FEB] hover:bg-blue-600 text-white	"
                // disabled={isLoading}
                onClick={handleSubmit}
              >
                Register
              </button>
              <h2>
                {err && (
                  <p className="text-xs	text-rose-700	text-center mt-1 mb-3	">
                    {err}
                  </p>
                )}
              </h2>
              <span className="mt-1">
                You Don't have an account yet?
                <Link to="/login" className="SmallLink text-sky-800	pl-1">
                  login
                </Link>
              </span>
            </form>
          </div>
        </div>
        <img
          src="../../public/log2.png"
          className="max-w-0	 h-96	 md:max-w-md 	 rounded-lg shadow-2xl mt-16 ml-24"
        />
      </div>
    </div>
  );
}
