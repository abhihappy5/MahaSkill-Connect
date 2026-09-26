const jwt = require('jsonwebtoken');

const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

// Signs a token and sets it as an httpOnly cookie (used alongside returning it in the JSON body,
// so both cookie-based web clients and token-based mobile/API clients are supported).
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);
  const days = Number(process.env.COOKIE_EXPIRES_DAYS || 7);

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
  });

  res.status(statusCode).json({
    success: true,
    token,
    user: user.toSafeObject ? user.toSafeObject() : user,
  });
};

module.exports = { generateToken, sendTokenResponse };
