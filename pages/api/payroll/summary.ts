// pages/api/payroll/summary.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import Shift from "../../../models/Shift";
import User from "../../../models/User";
import { verifyToken, getTokenFromCookies } from "../../../lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  // Connect to the database
  await dbConnect();

  // Get the token from cookies
  const token = getTokenFromCookies(req);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify the token
  const decoded = verifyToken(token);
  if (!decoded || typeof decoded !== "object") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Handle GET request
  if (method === "GET") {
    try {
      const { startDate, endDate, department } = req.query;

      // Build the query
      const query: any = {
        status: { $in: ["completed", "scheduled"] },
      };

      // Add date range filter if provided
      if (startDate && endDate) {
        query.startTime = { $gte: new Date(startDate as string) };
        query.endTime = { $lte: new Date(endDate as string) };
      }

      // If user is a manager, they can see all payroll data
      // If user is an employee, they can only see their own payroll data
      if (decoded.role === "employee") {
        query.employee = decoded.id;
      }

      // Get all shifts matching the query
      const shifts = await Shift.find(query)
        .populate("employee", "firstName lastName email department")
        .sort({ startTime: 1 });

      // Filter by department if provided and user is a manager
      let filteredShifts = shifts;
      if (department && decoded.role === "manager") {
        const departmentEmployees = await User.find({
          department: department,
        }).select("_id");
        const departmentEmployeeIds = departmentEmployees.map((emp) =>
          emp._id.toString()
        );
        filteredShifts = shifts.filter((shift) =>
          departmentEmployeeIds.includes(shift.employee._id.toString())
        );
      }

      // Calculate summary statistics
      const totalHours = filteredShifts.reduce(
        (sum, shift) => sum + (shift.totalHours || 0),
        0
      );
      const totalPay = filteredShifts.reduce(
        (sum, shift) => sum + (shift.totalPay || 0),
        0
      );
      const employeeCount = new Set(
        filteredShifts.map((shift) => shift.employee._id.toString())
      ).size;
      const averageHourlyRate = totalHours > 0 ? totalPay / totalHours : 0;

      // Group by department for department breakdown
      const departmentBreakdown: Record<
        string,
        { hours: number; pay: number; employees: number }
      > = {};
      filteredShifts.forEach((shift) => {
        const dept = (shift.employee as any).department || "Unknown";
        if (!departmentBreakdown[dept]) {
          departmentBreakdown[dept] = { hours: 0, pay: 0, employees: 0 };
        }
        departmentBreakdown[dept].hours += shift.totalHours || 0;
        departmentBreakdown[dept].pay += shift.totalPay || 0;
        departmentBreakdown[dept].employees =
          (departmentBreakdown[dept].employees || 0) + 1;
      });

      // Group by week for weekly breakdown
      const weeklyBreakdown: Record<string, { hours: number; pay: number }> =
        {};
      filteredShifts.forEach((shift) => {
        const weekStart = new Date(shift.startTime);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Set to Sunday
        const weekKey = weekStart.toISOString().split("T")[0];

        if (!weeklyBreakdown[weekKey]) {
          weeklyBreakdown[weekKey] = { hours: 0, pay: 0 };
        }
        weeklyBreakdown[weekKey].hours += shift.totalHours || 0;
        weeklyBreakdown[weekKey].pay += shift.totalPay || 0;
      });

      // Return the summary data
      return res.status(200).json({
        summary: {
          totalHours,
          totalPay,
          employeeCount,
          averageHourlyRate,
          departmentBreakdown,
          weeklyBreakdown,
        },
        shifts: filteredShifts,
      });
    } catch (error) {
      console.error("Error fetching payroll summary:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
