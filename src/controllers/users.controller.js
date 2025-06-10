import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js;"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const registerUser = asyncHandler( async (req, res)=>{    
    //get user details from frontend
    const { username, fullName, email, password } = req.body;
    
    //validation
    if(
        [username, fullName, email, password].some(field => field.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }
    
    //check if user allready exists: username, email
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })
    
    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }
    
    //check for images,check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath) throw new ApiError(400, "Avatar file is required")

    // upload on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar) throw new ApiError(400, "Avatar file is required")

    //create user object - create entry in db
   const user =  User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    //removed password and refresh token field from response
    //check for user creation
    //return res
})

export { registerUser }