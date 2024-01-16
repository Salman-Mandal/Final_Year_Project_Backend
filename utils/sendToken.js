exports.sendToken = (user, res, statusCode) => {

    const token = user.getJWTToken();

    res.status(statusCode).json({
        success: true,
        user,
        token
    })
};