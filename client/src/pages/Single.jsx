import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Swal from "sweetalert2";

// constrt = showAlert();
// console.log(alert ale);
export default function Single() {
  // console.log(postId);
  // console.log(postId);

  const [post, setPost] = useState([]);
  // console.log(post);
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];
  console.log(postId);
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const [err, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/blogs/${postId}`);
        setPost(res.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    getData();
  }, [postId]);
  function alert() {
    !currentUser &&
      Swal.fire({
        icon: "error",
        title: `You must Be login`,
        timer: 2000,

        text: "You must Be login!",
        // footer: '<a href="#">Why do I have this issue?</a>',
      });
    currentUser &&
      Swal.fire({
        icon: "error",
        title: "You can delete only your posts",
        timer: 2000,

        text: "delete only your posts!",
        // footer: '<a href="#">Why do I have this issue?</a>',
      });
  }
  function Editalert() {
    !currentUser &&
      Swal.fire({
        icon: "error",
        title: "You must Be login",
        timer: 2000,

        text: "You must Be login!",
        // footer: '<a href="#">Why do I have this issue?</a>',
      });
    currentUser &&
      Swal.fire({
        icon: "error",
        title: "You can Edit only your post",
        timer: 2000,

        text: "Edit only your posta!",
        // footer: '<a href="#">Why do I have this issue?</a>',
      });
  }

  // console.log(post);
  const handleDelete = async () => {
    try {
      // const alert = showAlert();
      // console.log(alert);

      await axios.delete(`http://localhost:8000/blogs/${postId}`);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
      alert();
    }
  };

  function showAlert() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        handleDelete();
      }
    });
  }

  return (
    <div>
      <section className="text-gray-700 body-font overflow-hidden bg-base-200">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt={`${post.title}`}
              className="lg:w-1/2 w-full object-cover  object-center rounded border border-gray-200 md:w-1/2"
              src={`../../public/images/${post.image}`}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-200 text-3xl title-font font-medium mb-1">
                {post.title}
              </h1>
              <p className=" text-gray-300 leading-relaxed">
                {post.description}
              </p>
              <span className="flex items-center">
                <span className="flex ml-3  py-2 ">
                  <button className="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </button>
                  <button className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </button>
                  <button
                    className="ml-2 text-gray-500"
                    // onClick={handleEdit}
                  >
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </button>
                  {/* </>
                  )} */}
                </span>
              </span>
              <div className="flex mt-6 items-center pt-5 border-t-2 border-gray-200 mt-5">
                {currentUser && currentUser.data.user._id === post.user ? (
                  <button
                    className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-red-600	 ml-4"
                    onClick={showAlert}
                  >
                    {/* {err && console.log("delete")} */}
                    {/* {!err && console.log("not")} */}
                    {console.log(err)}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 6l3.46 12.24A2 2 0 008.36 20H15.64a2 2 0 001.88-1.76L21 6M5 8h14M9 8V6a2 2 0 012-2h2a2 2 0 012 2v2"
                      ></path>
                    </svg>
                  </button>
                ) : (
                  <button
                    className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-red-600	 ml-4"
                    onClick={alert}
                  >
                    {/* {err && console.log("delete")} */}
                    {/* {!err && console.log("not")} */}
                    {console.log(err)}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 6l3.46 12.24A2 2 0 008.36 20H15.64a2 2 0 001.88-1.76L21 6M5 8h14M9 8V6a2 2 0 012-2h2a2 2 0 012 2v2"
                      ></path>
                    </svg>
                  </button>
                )}
                {/* <button
                  className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-red-600	 ml-4"
                  onClick={showAlert}
                >
                  {/* {err && console.log("delete")} */}
                {/* {!err && console.log("not")} */}
                {console.log(err)}
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 6l3.46 12.24A2 2 0 008.36 20H15.64a2 2 0 001.88-1.76L21 6M5 8h14M9 8V6a2 2 0 012-2h2a2 2 0 012 2v2"
                  ></path>
                </svg> */}
                {/* </button> */}
                {/* {!currentUser && (
                  <span
                    className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-sky-700	 ml-4"
                    // onClick={handleEdit}
                    onClick={Editalert}
                  >
                    <Link to={`/login`} state={post}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-[22px] inline-block text-primary ml-1 cursor-pointer hover:text-primary-focus"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </Link>
                  </span>
                )} */}
                {currentUser && currentUser.data.user._id === post.user ? (
                  <span
                    className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-sky-700	 ml-4"
                    // onClick={handleEdit}
                  >
                    <Link to={`/write?edit=${postId}`} state={post}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-[22px] inline-block text-primary ml-1 cursor-pointer hover:text-primary-focus"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                    </Link>
                  </span>
                ) : (
                  <span
                    className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-sky-700	 ml-4"
                    onClick={Editalert}
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-[22px] inline-block text-primary ml-1 cursor-pointer hover:text-primary-focus"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </span>
                )}

                <span className="title-font font-medium text-xs  text-gray-300 ml-5">
                  {/* user{" "} */}
                  {post.updatedAt}
                  {console.log(post.user)}
                  {/* {console.log(currentUser.data.user._id)} */}
                </span>
              </div>
              <h2>
                {err && (
                  <p className="text-xs	text-rose-700	text-center mt-1 mb-3	">
                    {err}
                  </p>
                )}
              </h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
