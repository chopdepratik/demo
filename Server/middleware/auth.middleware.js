import jwt from "jsonwebtoken";
import User from "../models/auth.models.js";

export const createToken = (id, email) => {
    const token = jwt.sign(
        {
            id,
            email,
        },
        process.env.SECRET,
        {
            expiresIn: "5d",
        }
    );
    return token;
};

export const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                isLogin: false,
                message: "Missing Token",
            });
        }

        jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    isLogin: false,
                    message: "Invalid or expired token",
                });
            }

            const user = await User.findById(decoded.id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    isLogin: false,
                    message: "User not found",
                });
            }

            req.user = user; // Add user to the request object
            next(); // Call the next middleware or route handler
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error: " + err.message,
        });
    }
};
