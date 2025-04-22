// pages/api/shifts/index.ts
import type { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "../../../lib/mongodb"
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
        const { employee, manager, startDate, endDate, status } = req.query

        // Build the query
        const query: any = {}

        // If employee ID is provided, filter by employee
        if (employee) {
          query.employee = employee
        }

        // If manager ID is provided, filter by manager
        if (manager) {
          query.manager = manager
        }

        // If user is an employee, only show their shifts
        if (decoded.role === "employee") {
          query.employee = decoded.id
        }

        // Filter by date range if provided
        if (startDate && endDate) {
          query.startTime = { $gte: new Date(startDate as string) }
          query.endTime = { $lte: new Date(endDate as string) }
        }

        // Filter by status if provided
        if (status) {
          query.status = status
        }

        // Get shifts with populated employee and manager data
        const shifts = await Shift.find(query)
          .populate("employee", "firstName lastName email")
          .populate("manager", "firstName lastName email")
          .sort({ startTime: 1 })

        return res.status(200).json({ shifts })
      } catch (error) {
        console.error("Error fetching shifts:", error)
        return res.status(500).json({ message: "Internal server error" })
      }
      break

    case "POST":
      // Only managers can create shifts
      if (decoded.role !== "manager") {
        return res.status(403).json({ message: "Forbidden: Only managers can create shifts" })
      }

      try {
        const { employee, startTime, endTime, location, hourlyRate, notes } = req.body

        // Validate required fields
        if (!employee || !startTime || !endTime || !location || !hourlyRate) {
          return res.status(400).json({ message: "Missing required fields" })
        }

        // Check if employee exists and is an employee
        const employeeUser = await User.findById(employee)
        if (!employeeUser || employeeUser.role !== "employee") {
          return res.status(400).json({ message: "Invalid employee" })
        }

        // Create the shift
        const shift = await Shift.create({
          employee,
          manager: decoded.id,
          startTime,
          endTime,
          location,
          hourlyRate,
          notes,
        })

        // Create a notification for the employee
        await Notification.create({
          recipient: employee,
          sender: decoded.id,
          type: "shift_assigned",
          title: "New Shift Assigned",
          message: `You have been assigned a new shift on ${new Date(startTime).toLocaleDateString()} from ${new Date(startTime).toLocaleTimeString()} to ${new Date(endTime).toLocaleTimeString()}.`,
          relatedId: shift._id,
          relatedModel: "Shift",
        })

        return res.status(201).json({ shift })
      } catch (error) {
        console.error("Error creating shift:", error)
        return res.status(500).json({ message: "Internal server error" })
      }
      break

    default:
      res.setHeader("Allow", ["GET", "POST"])
      return res.status(405).json({ message: `Method ${method} Not Allowed` })
  }
}
