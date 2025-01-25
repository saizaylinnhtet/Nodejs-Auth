const Image = require('../models/Image');

const uploadImage = async(req,res) => {
    try{
        
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}