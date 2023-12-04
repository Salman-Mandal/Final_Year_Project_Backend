const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internal server Error";

    // console.log(err);

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
      }

    res.status(err.statuscode).json({
        success: false,
        error: {
            statusCode: err.statuscode,
            message: err.message,
        },
    });
}