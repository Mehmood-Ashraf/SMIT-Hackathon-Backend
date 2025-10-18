import { v2 as cloudinary} from 'cloudinary'
import fs from 'fs'


cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

export const uploadOnCloudinary = async (file, storageType = "memory") => {
    console.log(file)
    if(!file) return null;

    try {
        let result ;

        if(storageType === "memory"){
            result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`)
        }else{
            result = await cloudinary.uploader.upload(file.path)
            fs.unlinkSync(file.path)
        }
        console.log("Cloudinary result=====>",result)
        return result.secure_url
    } catch (error) {
        console.log("Cloudinary error======>",error)
        if(storageType === "disk") fs.unlinkSync(file.path)
        return null
    }
}