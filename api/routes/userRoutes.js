const router = require("express").Router();
const meddile = require("../middleware/authMiddleware");


const { getusers, Adduser, updateUser, getUserByID, deleteUser, deactive } = require("../controllers/userController");
const { signup, login, logout } = require("../controllers/authController")

router.route("/").post(meddile.protect, meddile.restrictTo("admin"), Adduser).get(meddile.protect, meddile.restrictTo("admin"), getusers);
router.route("/:id").patch(meddile.protect, meddile.restrictTo("admin"), updateUser).get(meddile.protect, meddile.restrictTo("admin"), getUserByID).delete(meddile.protect, meddile.restrictTo("admin"), deleteUser)
// .patch(deactive)

router.route("/singUp").post(signup)
router.route("/login").post(login)
router.route("/logout").post(logout);


module.exports = router

