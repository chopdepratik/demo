import jwt from "jsonwebtoken";
import Emp from "../models/employee.models.js";

// Function to create a JWT token for an employee
export const createToken = (empId, empEmail) => {
    const token = jwt.sign(
        {
            empId,
            empEmail,
        },
        process.env.SECRET,
        {
            expiresIn: "5d",
        }
    );
    return token;
};

// Middleware to check if the user is authenticated
export const isAuthenticated = async (req, res, next) => {
    try {
        // Extract token from the Authorization header
        const token = req.headers.authorization?.split(" ")[1];

        // Check if the token is missing
        if (!token) {
            return res.status(401).json({
                success: false,
                isLogin: false,
                message: "Missing Token",
            });
        }

        // Verify the token and extract user information
        jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    isLogin: false,
                    message: "Invalid or expired token",
                });
            }

            // Fetch the employee details from the database
            const employee = await Emp.findById(decoded.empId);

            // Check if the employee exists in the database
            if (!employee) {
                return res.status(404).json({
                    success: false,
                    isLogin: false,
                    message: "Employee not found",
                });
            }

            // Attach the employee details to the request object
            req.user = employee;
            next(); // Proceed to the next middleware or route handler
        });
    } catch (err) {
        // Handle unexpected errors
        res.status(500).json({
            success: false,
            message: "Internal Server Error: " + err.message,
        });
    }
};
