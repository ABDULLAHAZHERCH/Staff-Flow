// pages/api/employees/index.ts
import type { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "../../../lib/mongodb"
import User from "../../../models/User"
import { verifyToken, getTokenFromCookies } from "../../../lib/auth"
import { hash } from "bcryptjs"

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

  // Only managers can access employee management
  if (decoded.role !== "manager") {
    return res.status(403).json({ message: "Forbidden: Only managers can access employee management" })
  }

  // Handle different HTTP methods
  switch (method) {
    case "GET":
      try {
        // Get query parameters
        const { department, status } = req.query

        // Build the query
        const query: any = { role: "employee" }

        // Filter by department if provided
        if (department) {
          query.department = department
        }

        // Filter by status if provided
        if (status) {
          query.status = status
        }

        // Get employees
        const employees = await User.find(query).select("-password").sort({ firstName: 1, lastName: 1 })

        return res.status(200).json({ employees })
      } catch (error) {
        console.error("Error fetching employees:", error)
        return res.status(500).json({ message: "Internal server error" })
      }
      break

    case "POST":
      try {
        const { email, firstName, lastName, department, position, password } = req.body

        // Validate required fields
        if (!email || !firstName || !lastName || !department || !position || !password) {
          return res.status(400).json({ message: "Missing required fields" })
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
          return res.status(400).json({ message: "Email already in use" })
        }

        // Hash the password
        const hashedPassword = await hash(password, 10)

        // Create the employee
        const employee = await User.create({
          email,
          firstName,
          lastName,
          department,
          position,
          password: hashedPassword,
          role: "employee",
          status: "active",
        })

        // Return the employee without the password
        const employeeWithoutPassword = { ...employee.toObject(), password: undefined }

        return res.status(201).json({ employee: employeeWithoutPassword })
      } catch (error) {
        console.error("Error creating employee:", error)
        return res.status(500).json({ message: "Internal server error" })
      }
      break

    default:
      res.setHeader("Allow", ["GET", "POST"])
      return res.status(405).json({ message: `Method ${method} Not Allowed` })
  }
}
