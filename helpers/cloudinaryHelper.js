const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async(filePath) => {
    try{
        const uploadResult = await cloudinary.uploader.upload(filePath)
        
        return {
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id
        }
    }catch(e){
        console.error('Error while uploading',e);
        throw new Error('Error while uploading')
    }
}

module.exports = {
    uploadToCloudinary
}