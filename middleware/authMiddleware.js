import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
  // Get the JWT token from the request headers
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];
    // Verify the JWT token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        // If token verification fails, send an error response
        return res.status(403).json({ error: 'Access denied. Invalid token.' });
      }
      // If verification succeeds, attach the user information to the request object
      req.user = user;
      // Call the next middleware or route handler
      next();
    });
  } else {
    // If no token is provided, send an error response
    res.status(401).json({ error: 'Access denied. No token provided.' });
  }
};

export default authenticateJWT;
