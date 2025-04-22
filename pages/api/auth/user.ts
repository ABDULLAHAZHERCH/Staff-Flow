// pages/api/auth/user.ts
import type { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "../../../lib/mongodb"
import User from "../../../models/User"
import { getTokenFromCookies, verifyToken } from "../../../lib/auth"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    // Get the token from cookies
    const token = getTokenFromCookies(req)

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" })
    }

    // Verify the token
    const decoded = verifyToken(token)
    if (!decoded || typeof decoded !== "object") {
      return res.status(401).json({ message: "Invalid token" })
    }

    // Connect to the database
    await dbConnect()

    // Find the user by ID
    const user = await User.findById(decoded.id).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Return user data
    return res.status(200).json({ user })
  } catch (error) {
    console.error("Get user error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}
