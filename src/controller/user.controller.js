import {asyncHandler} from '../utils/asyncHandler.js'
import  { ApiError } from '../utils/ApiError.js'
import  {User}  from '../models/user.model.js'
import uploadOnCloudinary from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'


const registerUser = asyncHandler(async (req,res)=>{
    
    const {username,email,fullname,password} = req.body

    if (
        [fullname,email,password,username].some((field)=>{field?.trim()===""})
    ) {
        throw new ApiError(400,"All fields are mandatroy")
    }
   const existedUser= await User.findOne({
        $or:[{ username },{ email }]
    })
    if(existedUser){
        throw new ApiError(409,"Username is not available")
    }
    // console.log(req);

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // console.log(avatarLocalPath)
    const coverImageLocalPath = req.files?.coverimage[0]?.path;
    // console.log(coverImageLocalPath)

    if(!avatarLocalPath){
        throw new ApiError(400,"AvatarLocal Path is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverimage = await uploadOnCloudinary(coverImageLocalPath);
    
    if(!avatar){
        throw new ApiError(400,"Avatar is required")
    }
    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverimage:coverimage?.url||"",
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
    
    return res.status(200).json(
        new ApiResponse(200,userCreated,"User registerd succesfully")
    )
})

export {registerUser}