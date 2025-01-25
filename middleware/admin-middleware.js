const adminMiddleware = (req, res, next) => {
    const { userId, username, role } = req.userInfo;

    if (role != 'admin'){
        return res.status(401).json({
            success: false,
            message: 'You Are Unauthorized For This Page'
        })
    }
    next();
}

module.exports = adminMiddleware