import {asyncHandler} from '../utils/asyncHandler.js'
import  { ApiError } from '../utils/ApiError.js'
import  User  from '../models/user.model.js'
import uploadOnCloudinary from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'


const registerUser = asyncHandler(async (req,res)=>{
    
    const {username,email,fullname,password} = req.body
    console.log('email',email,password);

    if (
        [fullname,email,password,username].some((field)=>{field?.trim()===""})
    ) {
        throw new ApiError(400,"All fields are mandatroy")
    }
   const existedUser= User.findOne({
        $or:[{ username },{ email }]
    })
    if(existedUser){
        throw new ApiError(409,"Username is not available")
    }
    const avatartLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatartLocalPath){
        throw new ApiError(400,"Avatar is required")
    }
    const avatar = await uploadOnCloudinary(avatartLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if(!avatar){
        throw new ApiError(400,"Avatar is required")
    }
    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        email,
        password,
        username:username.toLowerCase()
    })
    const userCreated = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    if(!userCreated){
        throw new ApiError(500,"Something broke while registering user")
    }
    
    return res.statusCode(200).json(
        new ApiResponse(200,userCreated,"User Successfully Registerd")
    )
})

export {registerUser}