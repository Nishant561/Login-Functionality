const User = require("../db/Models/userModel");
const errorHandler = require("../utils/errorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });


function asyncHandler(func) {
  return (request, response, next) => {
    func(request, response, next).catch((err) => next(err));
  };
}

exports.signup = asyncHandler(async (request, response, next) => {
  const { username, email, password } = request.body;

  if (!username || !email || !password) {
    return next(errorHandler(400, "All fields are required."));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) return next(errorHandler(404, "User already exists."));
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ email, username, password: hashedPassword });

  await user.save();
  const { password: undefined, ...rest } = user._doc;

  return response.status(201).json({
    success: true,
    message: "User created successfully.",
    user: rest,
  });
});

exports.login = asyncHandler(async (request, response, next) => {
  const { email, password } = request.body;

  if (!email || !password)
    return next(errorHandler(409, "All fields are required to login."));

  const user = await User.findOne({ email });

  if (!user) return next(errorHandler(409, "User dosent exits."));

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
  if (!isPasswordCorrect)
    return next(errorHandler(404, "password dosent matched"));

  const { password: undefined, ...rest } = user._doc;

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  response.cookie("token", token, {
    maxAge:24 * 60 * 60 * 1000
  });

  return response.status(200).json({
    success: true,
    message: "Logged in successfully.",
    data: {
      user: rest,
    },
  });
});

exports.handelSignout = asyncHandler(async(request , response , next)=>{
    const token = request.cookies.token
    if(!token){
      return next(errorHandler(404,"You need to login to signout."))
    }

    response.clearCookie('token')

    return response.status(200).json({
      success:true,
      message:"Signout successfully."
    })

} )

exports.handelGoogleSignin = asyncHandler(async(request, response,next)=>{
    const {username , email, profilePicture} = request.body
    
    const existingUser = await User.findOne({email})
    if(existingUser){
      const token = jwt.sign({id:existingUser._id},process.env.SECRET_KEY,{
        expiresIn:"1h"
      })
      response.cookie('token',token,{
        maxAge: 24 * 60 * 60 * 1000
      })
      return response.status(200).json({
        success:true,
        message:"Logged in successfully.",
        data:{
          user:existingUser
        }
      })
    }

    const modUsername = username.split(" ").join("") + String(Math.floor(Math.random()*1000))
    
    const user = new User({
      username:modUsername,
      email,
      profilePicture:profilePicture
    })

    await user.save({validateBeforeSave:false})

    const token = jwt.sign({id:user._id} , process.env.SECRET_KEY,{
      expiresIn:"1h"
    })

    response.cookie('token', token ,{
      maxAge:24*60*60*1000
    })

    return response.status(200).json({
      success:true,
      message:"logged in successfully.",
      data:{
        user:user
      }
    })



})