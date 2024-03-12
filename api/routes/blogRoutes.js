const router = require("express").Router();
const meddile = require("../middleware/authMiddleware");

const {
  getBlogs,
  addBlog,
  updateBlog,
  getBlogByID,
  deleteBlog,
} = require("../controllers/blogController");

router.route("/").post(meddile.protect, addBlog).get(getBlogs);
router.route("/:id").put(meddile.protect, updateBlog).get(getBlogByID).delete(meddile.protect, deleteBlog);

module.exports = router;
