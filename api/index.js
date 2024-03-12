const http = require("http");
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const usersRouter = require("./routes/userRoutes.js")
const blogsRouter = require("./routes/blogRoutes")
const dotenv = require("dotenv")
const { connect } = require("./db");
const cors = require('cors');
const multer = require("multer");

const cookieParser = require('cookie-parser')



app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `blog-${Date.now()}.jpeg`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});
dotenv.config({ path: './config.env' })



app.get("/", (req, res) => {
  console.log("Hello", req.url);
  res.send("Welcome")
})

app.use("/user", usersRouter)
app.use("/blogs", blogsRouter);

app.use((req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'Authorization');
  // console.log(req.cookies);
  next();
});


connect()

app.listen(process.env.PORT, () => {
  console.log("Hello");
})