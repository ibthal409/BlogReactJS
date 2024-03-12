import React, { useState } from "react";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function Write() {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.description || "");
  const [title, setTitle] = useState(state?.title || "");
  const [image, setImage] = useState(null);
  const [cat, setCat] = useState(state?.category || "");
  console.log(state);
  console.log(title);
  function showAlert() {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your data has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  const navigate = useNavigate();
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const res = await axios.post("http://localhost:8000/upload/", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const [err, setError] = useState(null);

  // const [value, setValue] = useState("");
  // console.log(value);
  // const [form, setForm] = useState({
  //   title: "",
  //   description: "",
  //   photo: "",
  //   category: "",
  //   UserId: "",
  // });
  // const schema = yup
  //   .object({
  //     Title: yup.string().required(),
  //     Description: yup.string().required("You must Enter Description"),
  //     ImageFile: yup.string().required(),
  //   })
  //   .required();
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });
  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };
  // const [Image, setImage] = useState("");
  // const TitleVal = watch("Title");
  // const CatVal = watch("Category");
  // const DescVal = watch("Description");
  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      state
        ? await axios.put(`http://localhost:8000/blogs/${state._id}`, {
            title,
            description: value,
            category: cat,
            image: image ? imgUrl : "",
          })
        : await axios.post(`http://localhost:8000/blogs`, {
            title: title,
            description: value,
            category: cat,
            image: image ? imgUrl : "",
          });
      showAlert();
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <>
      {console.log(state)}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left"></div>
          <div className="card shrink-0 w-full max-w-sm  ">
            <div className="Form mt-3">
              {state ? <h1>Edit the Post</h1> : <h1>Add Post</h1>}
              <form className="mt-1 card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    placeholder="Title"
                    className="input input-bordered"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <input
                    type="text"
                    value={value}
                    placeholder="Description"
                    className="input input-bordered"
                    required
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">category</span>
                  </label>
                  <select
                    name="category"
                    value={cat}
                    onChange={(e) => setCat(e.target.value)}
                    className="select select-[#425FEB]"
                  >
                    <option id="DefaultSelect">--Choose Category--</option>
                    <option value="food">Food 🍏</option>
                    <option value="education">Education 👨‍🏫</option>
                    <option value="fashion">Fashion 🧚‍♀️</option>
                    <option value="health">Health 👩‍⚕️</option>
                    <option value="technology">Technology 🤳</option>
                  </select>
                </div>

                <input
                  type="file"
                  className="Add-input file-input w-full max-w-xs mt-5 file:bg-[#425FEB] file:text-white
            hover:file:bg-[#425FEB]"
                  name="photo"
                  // value=/{image}
                  onChange={(e) => {
                    console.log(e.target.files[0]);
                    setImage(e.target.files[0]);
                  }}
                />

                <button
                  className="btn bg-[#425FEB] hover:bg-blue-600 text-white my-3"
                  type="submit"
                  onClick={handleClick}
                >
                  {state ? `update` : `Add`}
                </button>
                <h2>
                  {err && (
                    <p className="text-xs	text-rose-700	text-center mt-1 mb-3	">
                      {err}
                    </p>
                  )}
                </h2>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
