import {asyncHandler} from '../utils/asyncHandler.js'

const registerUser = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"user registration work in progress"
    })
    console.log('registerUser@',Date())
})

export {registerUser};