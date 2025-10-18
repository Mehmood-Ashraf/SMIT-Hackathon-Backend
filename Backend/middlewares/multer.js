import multer from "multer";

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

export const diskUpload = multer({storage: diskStorage, fileFilter})


const memoryStorage = multer.memoryStorage()
export const memoryUpload = multer({storage: memoryStorage, fileFilter})

