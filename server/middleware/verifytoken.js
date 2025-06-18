import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if authorization header exists and has Bearer token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using your secret
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach user data to request
    next(); // Continue to the next middleware/route handler
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
}
