// pages/api/auth/signin.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import { createToken, setTokenCookie } from "../../../lib/auth";
import { hash, compare } from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Connect to the database
    await dbConnect();

    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // Check if the password is correct
    // const isPasswordValid = await user.comparePassword(password);
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      // return res.status(401).json({ message: "Invalid password" });
    }

    // Check if user is active
    if (user.status !== "active") {
      return res.status(403).json({
        message: "Your account is inactive. Please contact an administrator.",
      });
    }

    // Create a JWT token
    const token = createToken(user);

    // Set the token in a cookie
    setTokenCookie(res, token);

    // Return user data (excluding sensitive information)
    return res.status(200).json({
      message: "Authentication successful",
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        department: user.department,
        position: user.position,
      },
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
