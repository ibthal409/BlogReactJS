import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

export default function Login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  // console.log(currentUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
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
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          {/* <h1 className="text-5xl font-bold">Login now!</h1> */}
          <img
            src="../../public/log2.png"
            className="max-w-0	 md:max-w-md max-h-screen rounded-lg  mt-20 ml-24"
          />
        </div>
        <div className="card shrink-0 w-full max-w-sm  ">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                name="password"
                required
                onChange={handleChange}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-3">
              <button
                className="btn bg-[#425FEB] hover:bg-blue-600 text-white"
                onClick={handleSubmit}
              >
                Login
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
                <Link to="/register" className="SmallLink pl-1 text-sky-800	">
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
