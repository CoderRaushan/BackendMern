import cloudinary from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
console.log("i reached here befote c cofig");
cloudinary.config({
  cloud_name:"duthu0r3j",
  api_key:"144852565252598",
  api_secret:"yIcqB0oJitbQW-yG_uV6o2SXtlM" ,
});
console.log("i reached here c cofig");

 const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_photos",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

console.log("i reached here after c cofig");
export const upload = multer({ storage: storage });

console.log("uploaded");
// import express from "express";
// const router=express.Router();
// import cloudinary from 'cloudinary';
// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import { SignUp } from "../controllers/userController.js";
// cloudinary.config({
//   cloud_name: "duthu0r3j",
//   api_key: "144852565252598",
//   api_secret: "yIcqB0oJitbQW-yG_uV6o2SXtlM",
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "user_photos",
//     allowed_formats: ["jpg", "png", "jpeg"],
//   },
// });

// // Define the multer upload middleware
// export const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit (optional)
// }).single("photo");

// // Add error handling in the route
// router.post("/register", upload, (err, req, res, next) => {
//   if (err) {
//     console.error("Multer error:", err);
//     return res.status(400).json({ error: "Image upload failed!" });
//   }
//   next();  // Pass control to the next middleware (SignUp function)
// }, SignUp);

