import multer from "multer";

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

export const diskUpload = multer({storage: diskStorage})


const memoryStorage = multer.memoryStorage()
export const memoryUpload = multer({storage: memoryStorage})

