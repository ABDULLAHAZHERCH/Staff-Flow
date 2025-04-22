// pages/api/payroll/[id].ts
import type { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "../../../lib/mongodb"
import Payroll from "../../../models/Payroll"
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
    return res.status(400).json({ message: "Invalid payroll ID" })
  }

  // Handle different HTTP methods
  switch (method) {
    case "GET":
      try {
        // Get the payroll record with populated data
        const payroll = await Payroll.findById(id)
          .populate("employee", "firstName lastName email")
          .populate("manager", "firstName lastName email")
          .populate("shifts")

        // Check if payroll record exists
        if (!payroll) {
          return res.status(404).json({ message: "Payroll record not found" })
        }

        // Check if user has permission to view this payroll record
        if (decoded.role === "employee" && payroll.employee._id.toString() !== decoded.id) {
          return res.status(403).json({ message: "Forbidden: You don't have permission to view this payroll record" })
        }

        return res.status(200).json({ payroll })
      } catch (error) {
        console.error("Error fetching payroll record:", error)
        return res.status(500).json({ message: "Internal server error" })
      }
      break

    case "PUT":
      // Only managers can update payroll records
      if (decoded.role !== "manager") {
        return res.status(403).json({ message: "Forbidden: Only managers can update payroll records" })
      }

      try {
        const { status, paymentDate, paymentMethod, notes } = req.body

        // Get the current payroll record
        const currentPayroll = await Payroll.findById(id)
        if (!currentPayroll) {
          return res.status(404).json({ message: "Payroll record not found" })
        }

        // Update the payroll record
        const updatedPayroll = await Payroll.findByIdAndUpdate(
          id,
          {
            status: status || currentPayroll.status,
            paymentDate: paymentDate || currentPayroll.paymentDate,
            paymentMethod: paymentMethod || currentPayroll.paymentMethod,
            notes: notes !== undefined ? notes : currentPayroll.notes,
          },
          { new: true, runValidators: true },
        ).populate("employee", "firstName lastName email")

        // If status changed to "paid", create a notification
        if (status === "paid" && currentPayroll.status !== "paid") {
          await Notification.create({
            recipient: updatedPayroll.employee._id,
            sender: decoded.id,
            type: "payroll_processed",
            title: "Payroll Paid",
            message: `Your payroll for the period ${new Date(updatedPayroll.startDate).toLocaleDateString()} to ${new Date(updatedPayroll.endDate).toLocaleDateString()} has been paid.`,
            relatedId: updatedPayroll._id,
            relatedModel: "Payroll",
          })
        }

        return res.status(200).json({ payroll: updatedPayroll })
      } catch (error) {
        console.error("Error updating payroll record:", error)
        return res.status(500).json({ message: "Internal server error" })
      }
      break

    case "DELETE":
      // Only managers can delete payroll records
      if (decoded.role !== "manager") {
        return res.status(403).json({ message: "Forbidden: Only managers can delete payroll records" })
      }

      try {
        // Get the payroll record to be deleted
        const payrollToDelete = await Payroll.findById(id)
        if (!payrollToDelete) {
          return res.status(404).json({ message: "Payroll record not found" })
        }

        // Delete the payroll record
        await Payroll.findByIdAndDelete(id)

        return res.status(200).json({ message: "Payroll record deleted successfully" })
      } catch (error) {
        console.error("Error deleting payroll record:", error)
        return res.status(500).json({ message: "Internal server error" })
      }
      break

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"])
      return res.status(405).json({ message: `Method ${method} Not Allowed` })
  }
}
