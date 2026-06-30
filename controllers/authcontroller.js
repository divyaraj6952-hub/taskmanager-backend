const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.register = async(req,res)=>{
    try{
        const {name,email,password} = req.body;   // extracted name etc values into req.body
       
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Please provide name, email and password."
            });
        }

     const existingUser = await User.findOne({ email });   // finds the email from db
     
if (existingUser) {
    return res.status(400).json({
        success: false,
        message: "User already exists"
    });
}

const hashedPassword = await bcrypt.hash(password, 10);  //  first hash then create user

const user = await User.create({   // since extracted so only name is writing would work
    // name : req.body.name,
    // email : req.body.email,
    // password : req.body.password,
     name,
    email,
    password  : hashedPassword,
});

const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    {
        expiresIn: "7d",
    }
);

return res.status(201).json({
    success: true,
    message: "User registered successfully!",
    token,
    user: {
        id: user._id,
        name: user.name,
        email: user.email
    }
});
        }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.login = async(req,res)=> {
    const {email , password} = req.body;
    if(!email || !password){
         return res.status(400).json({
                success: false,
                message: "Please provide  email or password."
            });
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
         return res.status(401).json({
        success: false,
        message: "Invalid email or password"
    });
    }

    const isMatch = await bcrypt.compare(password , user.password);
    // user.password ==> hashed password
    // password => given after login
if (!isMatch) {
    return res.status(401).json({
        success: false,
        message: "Invalid email or password"
    });
}


// generate the token 
const token = jwt.sign(
    { id : user._id} ,   // payload ==> data inside the token
    process.env.JWT_SECRET ,
    {
        expiresIn : process.env.JWT_EXPIRE,
    }
);

return res.status(200).json({
    success: true,
    token,
    user : {
        id : user._id,
        name : user.name,
        email : user.email,
    },
});

}