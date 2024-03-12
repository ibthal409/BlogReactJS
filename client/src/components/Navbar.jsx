import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Swal from "sweetalert2";

export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  // console.log(currentUser.data.user.name);
  function alert() {
    Swal.fire({
      icon: "error",
      title: "You must Be login",
      timer: 2000,

      text: "You must Be login!",
      // footer: '<a href="#">Why do I have this issue?</a>',
    });
  }
  return (
    <div className="navbar bg-[#3D4451] w-full">
      <div className="navbar-start ">
        <div className="dropdown ">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-700 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li tabIndex={0}>
              <Link to="/" className="justify-between text-white">
                {currentUser?.data.user.name}{" "}
              </Link>
            </li>
            {!currentUser ? (
              <li tabIndex={0}>
                <Link to="/login" className="justify-between text-white">
                  Login
                </Link>
              </li>
            ) : (
              <li tabIndex={0}>
                <button onClick={logout}>
                  <Link className="justify-between text-white">Logout</Link>
                </button>
              </li>
            )}

            <li tabIndex={0}>
              <Link to="/write" className="justify-between text-white">
                write
              </Link>
            </li>
          </ul>
        </div>
        <Link className="ml-7 normal-case text-xl ">
          <img src="/assets/images/logo.png" className="w-20" alt="" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex gap-4 ">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link className="text-white" to="/">
              Home
            </Link>
          </li>
          {currentUser && (
            <li tabIndex={0}>
              <Link to="/write" className=" justify-between text-white">
                Add Post
              </Link>
            </li>
          )}
          {!currentUser && (
            <li tabIndex={0} onClick={alert}>
              <Link to="/login" className=" justify-between text-white">
                Add post
              </Link>
            </li>
          )}
          <li tabIndex={0}>
            <Link to="/" className="justify-between text-white">
              {currentUser?.data.user.name}
              {/* {console.log(currentUser)} */}
            </Link>
          </li>
          {!currentUser ? (
            <li tabIndex={0}>
              {}
              <Link to="/login" className="justify-between text-white">
                Login
              </Link>
            </li>
          ) : (
            <li tabIndex={0}>
              <button onClick={logout}>
                <Link className="justify-between text-white">Logout</Link>
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
