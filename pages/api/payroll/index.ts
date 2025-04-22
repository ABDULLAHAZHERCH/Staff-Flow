// pages/api/payroll/index.ts
import type { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "../../../lib/mongodb"
import Payroll from "../../../models/Payroll"
import Shift from "../../../models/Shift"
import User from "../../../models/User"
import Notification from "../../../models/Notification"
import { verifyToken, getTokenFromCookies } from "../../../lib/auth"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

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

  // Handle different HTTP methods
  switch (method) {
    case "GET":
      try {
        // Get query parameters
        const { employee, startDate, endDate, status } = req.query

        // Build the query
        const query: any = {}

        // If employee ID is provided, filter by employee
        if (employee) {
          query.employee = employee
        }

        // If user is an employee, only show their payroll
        if (decoded.role === "employee") {
          query.employee = decoded.id
        }

        // Filter by date range if provided
        if (startDate && endDate) {
          query.startDate = { $gte: new Date(startDate as string) }
          query.endDate = { $lte: new Date(endDate as string) }
        }

        // Filter by status if provided
        if (status) {
          query.status = status
        }

        // Get payroll records with populated employee and manager data
        const payrolls = await Payroll.find(query)
          .populate("employee", "firstName lastName email")
          .populate("manager", "firstName lastName email")
          .populate("shifts")
          .sort({ startDate: -1 })

        return res.status(200).json({ payrolls })
      } catch (error) {
        console.error("Error fetching payroll records:", error)
        return res.status(500).json({ message: "Internal server error" })
      }
      break

    case "POST":
      // Only managers can create payroll records
      if (decoded.role !== "manager") {
        return res.status(403).json({ message: "Forbidden: Only managers can create payroll records" })
      }

      try {
        const { employee, startDate, endDate, shifts } = req.body

        // Validate required fields
        if (!employee || !startDate || !endDate || !shifts || !shifts.length) {
          return res.status(400).json({ message: "Missing required fields" })
        }

        // Check if employee exists
        const employeeUser = await User.findById(employee)
        if (!employeeUser) {
          return res.status(400).json({ message: "Invalid employee" })
        }

        // Get the shifts
        const shiftRecords = await Shift.find({ _id: { $in: shifts } })
        if (shiftRecords.length !== shifts.length) {
          return res.status(400).json({ message: "One or more shifts are invalid" })
        }

        // Calculate total hours and pay
        let totalHours = 0
        let totalPay = 0

        shiftRecords.forEach((shift) => {
          totalHours += shift.totalHours || 0
          totalPay += shift.totalPay || 0
        })

        // Create the payroll record
        const payroll = await Payroll.create({
          employee,
          manager: decoded.id,
          startDate,
          endDate,
          shifts,
          totalHours,
          totalPay,
          status: "pending",
        })

        // Create a notification for the employee
        await Notification.create({
          recipient: employee,
          sender: decoded.id,
          type: "payroll_processed",
          title: "Payroll Processed",
          message: `Your payroll for the period ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()} has been processed.`,
          relatedId: payroll._id,
          relatedModel: "Payroll",
        })

        return res.status(201).json({ payroll })
      } catch (error) {
        console.error("Error creating payroll record:", error)
        return res.status(500).json({ message: "Internal server error" })
      }
      break

    default:
      res.setHeader("Allow", ["GET", "POST"])
      return res.status(405).json({ message: `Method ${method} Not Allowed` })
  }
}
