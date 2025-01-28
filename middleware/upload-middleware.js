const multer = require('multer');
const path = require('path');

//set multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/kings/node/Nodejs-Auth/uploads') //path to upload
    },
    filename: function (req, file, cb) {
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
}) 

//file filter function
const checkFileFilter = (req, file, cb) => {

    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb(new Error('Please upload only images'))
    }
}

//multer middleware
module.exports = multer({
    storage: storage,
    fileFilter: checkFileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 //5mb
    }
})