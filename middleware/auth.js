const jwt = require('jsonwebtoken');

function generateToken(user) {
  const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // Set expiry time to 7 days or any desired time
  );
  return token;
}

module.exports = function (req, res, next) {
  // Get token from header
  const authHeader = req.header('Authorization');

  // Log the header to see what is being received
  console.log('Authorization Header:', authHeader);

  // Check if the header is present
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Extract the token from the header
  const token = authHeader.replace('Bearer ', '').trim();

  // Log the extracted token
  console.log('Token:', token);

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
