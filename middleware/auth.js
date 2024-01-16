const jwt = require('jsonwebtoken');
const catchAsyncError = require('./path-to-your-async-error-handler'); // Import your async error handler
const User = require('./path-to-your-user-model'); // Import your User model

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return next(new ErrorHandler('Please provide a token', 401));
  }

  try {
    const decodedUserData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedUserData.id);
    next();
  } catch (error) {
    return next(new ErrorHandler('Invalid token', 401));
  }
});
