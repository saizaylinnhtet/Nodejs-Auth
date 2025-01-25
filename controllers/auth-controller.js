const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//register controllers
const registerUser = async(req,res) => {
    try{
        const {username, email, password, role} = req.body;

        //check if the user is already exist
        const checkExistingUser = await User.findOne({$or: [{username},{email}]})
        if (checkExistingUser){
            return res.status(400).json({
                success: false,
                message: 'User with same username or email is already exist, try with different username or password'
            });
        }

        //hash user password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        //create new user and commit in db
        const createdUser = await User.create({
            username,
            email,
            "password": hashPassword,
            "role": role || 'user'
        });

        if(createdUser){
            res.status(201).json({
                success: true,
                message: 'User Registered Successfully'
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Unable To Register User! Please Try Again'
            })
        }

    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}


//login controllers
const loginUser = async(req,res) => {
    try{
        const {username, password} = req.body;
        
        //find if the user is exist
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Invalid Username'
            })
        }
        //find if password is entered
        if(!password){
            return res.status(400).json({
                success: false,
                message: 'Enter Your Password'
            })
        }
        //check password is correct
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: 'Password Invalid'
            })
        }
        //create user token
        const accessToken = jwt.sign({
            userId: user._id,
            username: user.username,
            role: user.role
        },process.env.JWT_SECRET_KEY,{
            expiresIn: '15m'
        });
        
        res.status(200).json({
            success: true,
            message: 'Log In Successful',
            accessToken: accessToken
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

module.exports = {registerUser, loginUser}