// pages/api/employees/[id].ts
import type { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "../../../lib/mongodb"
import User from "../../../models/User"
import { verifyToken, getTokenFromCookies } from "../../../lib/auth"
import mongoose from "mongoose"
import { hash } from "bcryptjs"

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

  // Only managers can access employee management
  if (decoded.role !== "manager") {
    return res.status(403).json({ message: "Forbidden: Only managers can access employee management" })
  }

  // Validate MongoDB ID
  if (!mongoose.Types.ObjectId.isValid(id as string)) {
    return res.status(400).json({ message: "Invalid employee ID" })
  }

  // Handle different HTTP methods
  switch (method) {
    case "GET":
      try {
        // Get the employee
        const employee = await User.findById(id).select("-password")

        // Check if employee exists
        if (!employee) {
          return res.status(404).json({ message: "Employee not found" })
        }

        // Check if the user is an employee
        if (employee.role !== "employee") {
          return res.status(400).json({ message: "User is not an employee" })
        }

        return res.status(200).json({ employee })
      } catch (error) {
        console.error("Error fetching employee:", error)
        return res.status(500).json({ message: "Internal server error" })
      }
      break

    case "PUT":
      try {
        const { firstName, lastName, email, department, position, status, password } = req.body

        // Get the current employee
        const currentEmployee = await User.findById(id)
        if (!currentEmployee) {
          return res.status(404).json({ message: "Employee not found" })
        }

        // Check if the user is an employee
        if (currentEmployee.role !== "employee") {
          return res.status(400).json({ message: "User is not an employee" })
        }

        // Check if email is being changed and if it already exists
        if (email && email !== currentEmployee.email) {
          const existingUser = await User.findOne({ email })
          if (existingUser) {
            return res.status(400).json({ message: "Email already in use" })
          }
        }

        // Prepare update data
        const updateData: any = {
          firstName: firstName || currentEmployee.firstName,
          lastName: lastName || currentEmployee.lastName,
          email: email || currentEmployee.email,
          department: department || currentEmployee.department,
          position: position || currentEmployee.position,
          status: status || currentEmployee.status,
        }

        // If password is provided, hash it
        if (password) {
          updateData.password = await hash(password, 10)
        }

        // Update the employee
        const updatedEmployee = await User.findByIdAndUpdate(id, updateData, {
          new: true,
          runValidators: true,
        }).select("-password")

        return res.status(200).json({ employee: updatedEmployee })
      } catch (error) {
        console.error("Error updating employee:", error)
        return res.status(500).json({ message: "Internal server error" })
      }
      break

    case "DELETE":
      try {
        // Get the employee to be deleted
        const employeeToDelete = await User.findById(id)
        if (!employeeToDelete) {
          return res.status(404).json({ message: "Employee not found" })
        }

        // Check if the user is an employee
        if (employeeToDelete.role !== "employee") {
          return res.status(400).json({ message: "User is not an employee" })
        }

        // Delete the employee
        await User.findByIdAndDelete(id)

        return res.status(200).json({ message: "Employee deleted successfully" })
      } catch (error) {
        console.error("Error deleting employee:", error)
        return res.status(500).json({ message: "Internal server error" })
      }
      break

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"])
      return res.status(405).json({ message: `Method ${method} Not Allowed` })
  }
}
