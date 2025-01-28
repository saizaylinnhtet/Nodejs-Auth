const Image = require('../models/Image');
const {uploadToCloudinary} = require('../helpers/cloudinaryHelper')
const fs = require('fs')

const uploadImage = async(req,res) => {
    try{
        //check if file is missing in req object
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File is required. Please upload and image'
            })
        }

        //upload to cloudinary 
        const {url, publicId} = await uploadToCloudinary(req.file.path)
        
        //store the image url and public id along with uploaded user id in database
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        })
        await newlyUploadedImage.save();

        // fs.unlinkSync(req.file.path); to delete image from local upload file

        res.status(201).json({
            success: true,
            message: 'Image Uploaded',
            image: newlyUploadedImage
        })
        
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

module.exports = {
    uploadImage
};