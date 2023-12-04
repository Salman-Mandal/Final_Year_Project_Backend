exports.sendToken = (user, res, statusCode) => {

    const token = user.getJWTToken();

    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    }

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    })
}