// pages/api/payroll/employee-stats.ts
import type { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "../../../lib/mongodb"
import Shift from "../../../models/Shift"
import User from "../../../models/User"
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

  // Only managers can access employee stats
  if (decoded.role !== "manager") {
    return res.status(403).json({ message: "Forbidden: Only managers can access employee stats" })
  }

  // Handle GET request
  if (method === "GET") {
    try {
      const { startDate, endDate, department } = req.query

      // Build the query for shifts
      const query: any = {
        status: { $in: ["completed", "scheduled"] },
      }

      // Add date range filter if provided
      if (startDate && endDate) {
        query.startTime = { $gte: new Date(startDate as string) }
        query.endTime = { $lte: new Date(endDate as string) }
      }

      // Get all employees
      const employeeQuery: any = { role: "employee" }
      if (department) {
        employeeQuery.department = department
      }

      const employees = await User.find(employeeQuery).select("_id firstName lastName department position")

      // Get all shifts for these employees
      const employeeIds = employees.map((emp) => emp._id)
      query.employee = { $in: employeeIds }

      const shifts = await Shift.find(query)

      // Calculate stats for each employee
      const employeeStats = employees.map((employee) => {
        const employeeShifts = shifts.filter((shift) => shift.employee.toString() === employee._id.toString())

        const totalHours = employeeShifts.reduce((sum, shift) => sum + (shift.totalHours || 0), 0)
        const totalPay = employeeShifts.reduce((sum, shift) => sum + (shift.totalPay || 0), 0)
        const shiftCount = employeeShifts.length
        const averageHourlyRate = totalHours > 0 ? totalPay / totalHours : 0

        // Calculate overtime hours (hours > 40 per week)
        const weeklyHours: Record<string, number> = {}
        let overtimeHours = 0

        employeeShifts.forEach((shift) => {
          const weekStart = new Date(shift.startTime)
          weekStart.setDate(weekStart.getDate() - weekStart.getDay()) // Set to Sunday
          const weekKey = weekStart.toISOString().split("T")[0]

          weeklyHours[weekKey] = (weeklyHours[weekKey] || 0) + (shift.totalHours || 0)
        })

        // Sum overtime hours (hours > 40 per week)
        Object.values(weeklyHours).forEach((hours) => {
          if (hours > 40) {
            overtimeHours += hours - 40
          }
        })

        return {
          _id: employee._id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          department: employee.department,
          position: employee.position,
          stats: {
            totalHours,
            totalPay,
            shiftCount,
            averageHourlyRate,
            overtimeHours,
          },
        }
      })

      // Sort by total pay (highest first)
      employeeStats.sort((a, b) => b.stats.totalPay - a.stats.totalPay)

      return res.status(200).json({ employeeStats })
    } catch (error) {
      console.error("Error fetching employee stats:", error)
      return res.status(500).json({ message: "Internal server error" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    return res.status(405).json({ message: `Method ${method} Not Allowed` })
  }
}
