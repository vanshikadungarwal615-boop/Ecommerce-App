const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        // Get Authorization header
        const authHeader = req.headers.authorization;

        // Check if token exists and starts with "Bearer "
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access Denied. No Token Provided."
            });
        }

        // Extract token from "Bearer <token>"
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Save decoded user information in request
        req.user = decoded;

        // Continue to the next middleware or route
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or Expired Token"
        });
    }
};

module.exports = protect;