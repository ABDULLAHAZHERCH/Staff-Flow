// pages/api/notifications/[id].ts
import type { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "../../../lib/mongodb"
import Notification from "../../../models/Notification"
import { verifyToken, getTokenFromCookies } from "../../../lib/auth"
import mongoose from "mongoose"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req

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

  // Validate MongoDB ID
  if (!mongoose.Types.ObjectId.isValid(id as string)) {
    return res.status(400).json({ message: "Invalid notification ID" })
  }

  // Handle different HTTP methods
  switch (method) {
    case "GET":
      try {
        // Get the notification with populated sender data
        const notification = await Notification.findById(id).populate("sender", "firstName lastName email")

        // Check if notification exists
        if (!notification) {
          return res.status(404).json({ message: "Notification not found" })
        }

        // Check if user has permission to view this notification
        if (notification.recipient.toString() !== decoded.id) {
          return res.status(403).json({ message: "Forbidden: You don't have permission to view this notification" })
        }

        return res.status(200).json({ notification })
      } catch (error) {
        console.error("Error fetching notification:", error)
        return res.status(500).json({ message: "Internal server error" })
      }
      break

    case "PUT":
      try {
        // Get the notification
        const notification = await Notification.findById(id)

        // Check if notification exists
        if (!notification) {
          return res.status(404).json({ message: "Notification not found" })
        }

        // Check if user has permission to update this notification
        if (notification.recipient.toString() !== decoded.id) {
          return res.status(403).json({ message: "Forbidden: You don't have permission to update this notification" })
        }

        // Update the notification (only the read status can be updated)
        const { read } = req.body
        if (read === undefined) {
          return res.status(400).json({ message: "Missing read status" })
        }

        const updatedNotification = await Notification.findByIdAndUpdate(
          id,
          { read },
          { new: true, runValidators: true },
        ).populate("sender", "firstName lastName email")

        return res.status(200).json({ notification: updatedNotification })
      } catch (error) {
        console.error("Error updating notification:", error)
        return res.status(500).json({ message: "Internal server error" })
      }
      break

    case "DELETE":
      try {
        // Get the notification
        const notification = await Notification.findById(id)

        // Check if notification exists
        if (!notification) {
          return res.status(404).json({ message: "Notification not found" })
        }

        // Check if user has permission to delete this notification
        if (notification.recipient.toString() !== decoded.id) {
          return res.status(403).json({ message: "Forbidden: You don't have permission to delete this notification" })
        }

        // Delete the notification
        await Notification.findByIdAndDelete(id)

        return res.status(200).json({ message: "Notification deleted successfully" })
      } catch (error) {
        console.error("Error deleting notification:", error)
        return res.status(500).json({ message: "Internal server error" })
      }
      break

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"])
      return res.status(405).json({ message: `Method ${method} Not Allowed` })
  }
}
