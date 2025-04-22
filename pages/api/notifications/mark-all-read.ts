// pages/api/notifications/mark-all-read.ts
import type { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "../../../lib/mongodb"
import Notification from "../../../models/Notification"
import { verifyToken, getTokenFromCookies } from "../../../lib/auth"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  // Only allow POST requests
  if (method !== "POST") {
    res.setHeader("Allow", ["POST"])
    return res.status(405).json({ message: `Method ${method} Not Allowed` })
  }

  // Connect to the database
  await dbConnect()

  // Get the token from cookies
  const token = getTokenFromCookies(req)
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  // Verify the token
  const decoded = verifyToken(token)
  if (!decoded || typeof decoded !== "object") {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    // Mark all notifications as read
    await Notification.updateMany({ recipient: decoded.id, read: false }, { read: true })

    return res.status(200).json({ message: "All notifications marked as read" })
  } catch (error) {
    console.error("Error marking notifications as read:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}
