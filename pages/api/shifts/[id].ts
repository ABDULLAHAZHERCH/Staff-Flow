// pages/api/shifts/[id].ts
import type { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "../../../lib/mongodb"
import Shift from "../../../models/Shift"
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
    return res.status(400).json({ message: "Invalid shift ID" })
  }

  // Handle different HTTP methods
  switch (method) {
    case "GET":
      try {
        // Get the shift with populated employee and manager data
        const shift = await Shift.findById(id)
          .populate("employee", "firstName lastName email")
          .populate("manager", "firstName lastName email")

        // Check if shift exists
        if (!shift) {
          return res.status(404).json({ message: "Shift not found" })
        }

        // Check if user has permission to view this shift
        if (decoded.role === "employee" && shift.employee._id.toString() !== decoded.id) {
          return res.status(403).json({ message: "Forbidden: You don't have permission to view this shift" })
        }

        return res.status(200).json({ shift })
      } catch (error) {
        console.error("Error fetching shift:", error)
        return res.status(500).json({ message: "Internal server error" })
      }
      break

    case "PUT":
      // Only managers can update shifts
      if (decoded.role !== "manager") {
        return res.status(403).json({ message: "Forbidden: Only managers can update shifts" })
      }

      try {
        const { startTime, endTime, location, hourlyRate, status, notes } = req.body

        // Get the current shift
        const currentShift = await Shift.findById(id)
        if (!currentShift) {
          return res.status(404).json({ message: "Shift not found" })
        }

        // Update the shift
        const updatedShift = await Shift.findByIdAndUpdate(
          id,
          {
            startTime: startTime || currentShift.startTime,
            endTime: endTime || currentShift.endTime,
            location: location || currentShift.location,
            hourlyRate: hourlyRate || currentShift.hourlyRate,
            status: status || currentShift.status,
            notes: notes !== undefined ? notes : currentShift.notes,
          },
          { new: true, runValidators: true },
        ).populate("employee", "firstName lastName email")

        // Create a notification for the employee
        await Notification.create({
          recipient: updatedShift.employee._id,
          sender: decoded.id,
          type: "shift_updated",
          title: "Shift Updated",
          message: `Your shift on ${new Date(updatedShift.startTime).toLocaleDateString()} has been updated.`,
          relatedId: updatedShift._id,
          relatedModel: "Shift",
        })

        return res.status(200).json({ shift: updatedShift })
      } catch (error) {
        console.error("Error updating shift:", error)
        return res.status(500).json({ message: "Internal server error" })
      }
      break

    case "DELETE":
      // Only managers can delete shifts
      if (decoded.role !== "manager") {
        return res.status(403).json({ message: "Forbidden: Only managers can delete shifts" })
      }

      try {
        // Get the shift to be deleted
        const shiftToDelete = await Shift.findById(id).populate("employee", "firstName lastName email")
        if (!shiftToDelete) {
          return res.status(404).json({ message: "Shift not found" })
        }

        // Delete the shift
        await Shift.findByIdAndDelete(id)

        // Create a notification for the employee
        await Notification.create({
          recipient: shiftToDelete.employee._id,
          sender: decoded.id,
          type: "shift_cancelled",
          title: "Shift Cancelled",
          message: `Your shift on ${new Date(shiftToDelete.startTime).toLocaleDateString()} has been cancelled.`,
          relatedId: shiftToDelete._id,
          relatedModel: "Shift",
        })

        return res.status(200).json({ message: "Shift deleted successfully" })
      } catch (error) {
        console.error("Error deleting shift:", error)
        return res.status(500).json({ message: "Internal server error" })
      }
      break

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"])
      return res.status(405).json({ message: `Method ${method} Not Allowed` })
  }
}
