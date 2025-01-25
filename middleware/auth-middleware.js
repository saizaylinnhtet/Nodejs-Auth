const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token){
        res.status(401).json({
            success: false,
            message: "Invalid Credential"
        })
    }

    //decode token
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userInfo = decodedToken
        next();

    } catch(e){
        return res.status(500).json({
            success: false,
            message: "Something Went Wrong"
        })
    }    
};

module.exports = authMiddleware