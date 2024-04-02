import {asyncHandler} from '../utils/asyncHandler.js'
import  { ApiError } from '../utils/ApiError.js'
import  User  from '../models/user.model.js'

const registerUser = asyncHandler(async (req,res)=>{
    
    const {username,email,fullname,password} = req.body
    console.log('email',email,password);

    if (
        [fullname,email,password,username].some((field)=>{field?.trim()===""})
    ) {
        throw new ApiError(400,"All fields are mandatroy")
    }
    User.findOne() 
})

export {registerUser};