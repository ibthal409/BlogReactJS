// // const multer = require("multer");

// // const uploadOneImage = () => {

// //   console.log("ok multer");

// //   const storage = multer.diskStorage(
// //     {
// //       destination: function (req, file, cb) {
// //         cb(null, "../public/images/");
// //       }, filename: function (req, file, cb) {
// //         const extention = file.mimetype.split("/")[1];
// //         newName = `blog-${Date.now()}.`
// //         cb(null, newName);
// //       },

// //     }
// //   );
// //   const fileFilter = function (req, file, cb) {
// //     if (file.mimetype.startsWith("image")) {
// //       cb(null, true)
// //     } else {
// //       cb(res.status(400).json({ message: 'image allowed' }), false)
// //     }
// //   }

// //   const upload = multer({ storage, fileFilter });
// //   return upload.single("image")
// // }



// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../public/images");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({ storage });

// module.exports = {
//   uploadOneImage

// }