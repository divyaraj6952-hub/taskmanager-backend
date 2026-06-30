// it is a securoity guard for a id card of (token) and  protected route is entering college gate.
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    try {

        // 1. Get token from header  // it holds a string
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }
        const token = authHeader.split(" ")[1];
        // 2. Verify token  // gives true or throws an error
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // 3. Find user from token id
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        // 4. Attach user to request
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token failed"
        });
    }
};
module.exports = protect;