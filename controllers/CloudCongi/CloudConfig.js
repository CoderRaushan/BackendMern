import cloudinary from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name:"duthu0r3j",
  api_key:"144852565252598",
  api_secret:"yIcqB0oJitbQW-yG_uV6o2SXtlM" ,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_photos",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

export const upload = multer({ storage: storage });
