const blog = require("../models/blogsModel");
const sharp = require('sharp');
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { promisify } = require("util");
// const { ObjectId } = require('mongodb');


const categories = ["Fruits and Vegetables", "Protien", "Starchy Food"];

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    // console.log(query);
    this.queryString = queryString;
    // console.log(queryString);
  }


  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      // console.log(this.queryString);
      // console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    // console.log(this.queryString);
    const limit = 6 * 1 || 0;
    const skip = (page - 1) * limit;
    // console.log(page);
    // console.log(this.query);
    // console.log(limit)
    // console.log(skip);
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
  filter() {
    if (this.queryString.cat) {
      const filterBy = this.queryString.cat.split(',').join(' ');
      console.log(this.queryString);
      console.log(filterBy);
      if (filterBy === "All") {
        this.query = this.query.find();
      }
      else {
        this.query = this.query.find().where("category").equals(filterBy);
      }

    } else {
      this.query = this.query;
    }

    return this;
  }
}
async function protect(req, res, next) {
  let token;
  token = req.cookies.jwt;
  if (!token) {
    return next(res.status(401).json({ error: "You are not logged in! Please log in to get access" }))
  }
  decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // res.status(401).json({ error: "invalid token" });
  console.log(decode);
  if (!decode) {
    return next(res.status(400).json({ error: 'token is not true' }))
  }
  const stillUser = await User.findById(decode.id);
  if (!stillUser) {
    return next(res.status(401).json({ error: 'user is no longer exist' }))
  }
  req.user = stillUser;
  next();

}

// const uploadBlogImage = uploadOneImage()
// const resizeBlogPhoto = async (req, res, next) => {

//   if (!req.file) return next();
//   console.log(req.file);

//   // const filename = `blog-${Date.now()}.jpeg`;

//   // await sharp(req.file.buffer)
//   //   .toFormat('jpeg')
//   //   .jpeg({ quality: 90 })
//   //   .toFile(`public/images/${filename}`);
//   // //saveImage as string
//   // req.body.image = filename
//   //saveImage as url
//   // req.body.image = req.hostname+filename

//   next();
// };

// app.post("/api/upload", upload.single("file"), function (req, res) {
//   const file = req.file;
//   res.status(200).json(file.filename);
// });
// app.post("/upload", upload.single("image"), function (req, res) {
//   const file = req.file;
//   res.status(200).json(file.filename);
// });
async function addBlog(req, res, next) {
  if (!req.body.user) req.body.user = req.user.id;
  const { title, description, category, user, image } = req.body;
  console.log(req.body.image);
  try {
    const newBlog = new blog({
      title,
      description,
      category, user, image
    });

    const savednewBlog = await newBlog.save();
    res.status(201).json("blog added successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getBlogs(req, res, next) {
  try {
    const features = new APIFeatures(blog.find(), req.query).filter()
      .sort();
    // .paginate();
    // console.log(req.query);
    const blogs = await features.query;
    // const blogs = await blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateBlog(req, res) {
  const blogId = req.params.id;
  const updates = req.body;
  const token = req.cookies.jwt;
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  try {
    const { user } = await blog.findById(blogId);
    let BlogUpdated = await blog.findById(blogId);
    if (!BlogUpdated) {
      return res.status(404).json({ message: "No blog found with that ID" });
    }
    // decode.id = new ObjectId(decode.id);
    // user.split()
    console.log(user == decode.id);
    console.log(user, decode.id);
    if (user != decode.id) {
      return res.status(403).json({ message: "You can Edit only your post!" });
    }
    // if (BlogUpdated && (user === decode.id)) {
    BlogUpdated = await blog.findByIdAndUpdate(blogId, updates, { new: true })
    res.status(200).json("added");
    // }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getBlogByID(req, res) {
  const blogId = req.params.id;
  try {
    const SpasificBlog = await blog.findById(blogId);
    if (!SpasificBlog) {
      return res.status(404).json({ message: "No blog found with that ID" });
    }
    res.status(200).json(SpasificBlog);
    // return blogId;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function deleteBlog(req, res) {
  try {
    const token = req.cookies.jwt;
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const blogId = req.params.id;
    const { user } = await blog.findById(blogId);
    console.log(user);

    // db.query(q, [postId, userInfo.id], (err, data) => {
    // if (err) return res.status(403).json("You can delete only your post!");

    // console.log(blogId);
    // let decodd = new ObjectId(decode.id);

    let deletedBlog = await blog.findById(blogId);
    if (!deletedBlog) {
      return res.status(404).json({ message: "No blog found with that ID" });
    }
    if (user != decode.id) {
      console.log(decode.id);
      return res.status(403).json({ message: "You can delete only your post!" });
    }
    // if (deletedBlog && (user == decodd)) {
    deletedBlog = await blog.findByIdAndDelete(blogId);
    return res.status(200).json({ message: "blog deleted successfully" });
  }
  catch (error) {
    res.status(400).json({ message: error.message });
    // }
  }
}

module.exports = {
  getBlogs,
  addBlog,
  updateBlog,
  getBlogByID,
  deleteBlog,
  // uploadBlogImage, resizeBlogPhoto
};
