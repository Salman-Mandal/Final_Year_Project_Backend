const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const { sendToken } = require("../utils/sendToken");

// Register User

exports.registerUser = async (req, res, next) => {
    try {
        const { farmerId, fullname, email, mobileno, password, cnfpassword } = req.body;


        console.log("hi");

        //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        //     folder: "avaters",
        //     width: 150,
        //     crop: "scale",
        //   });

        if (password != cnfpassword) {
            return next(new ErrorHandler("Password does not matches Confirf Password"), 401);

        }

        const user = await User.create({
            farmerId,
            fullname,
            email,
            mobileno,
            password,
            cnfpassword,
            avatar: {
                public_id: "this is a sample id",
                url: "profilepicUrl"
            }
        });

        res.status(200).json({
            success: true,
            user,
        })


        // sendToken(user, res, 200);

    } catch (error) {
        next(error);
    }
};



exports.loginUser = catchAsyncError(
    async (req, res, next) => {

        const { email, password } = req.body;

        console.log(email, password);

        if (!email || !password) {
            return next(new ErrorHandler("Please enter Your Email and Password", 400));
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Invalid Email or Password", 401));
        }


        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return next(new ErrorHandler("Invalid email or password"), 401);
        }

        // res.status(200).json({
        //     success: true,
        //     user,
        // });

        sendToken(user, res, 200);
    }
)

// Get Logged In User Details
exports.getUserDetails = catchAsyncError(
    async (req, res, next) => {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            user,
        })
    }
)

//Logout User----------->
exports.logoutUser = catchAsyncError(
    async (req, res, next) => {
        const options = {
            httpOnly: true,
            expires: new Date(Date.now())
        }

        res.status(200).cookie("token", null, options).json({
            success: true,
            message: "User Loggout Out Successfully"
        })
    }
)

//Get All User (Admin Route)
exports.getAllUser = catchAsyncError(
    async (req, res, next) => {
        const user = await User.find();
        if (!user) {
            return next(new ErrorHandler("User not Found", 404));
        }
        res.status(200).json({
            success: true,
            user
        });
    }
)


