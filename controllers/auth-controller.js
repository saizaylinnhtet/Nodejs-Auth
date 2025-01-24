const User = require('../models/User');
const bcrypt = require('bcrypt');

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