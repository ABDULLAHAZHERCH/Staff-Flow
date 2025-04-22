// pages/api/reports/index.ts
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

  // Only managers can access reports
  if (decoded.role !== "manager" && req.query.type !== "employee") {
    return res
      .status(403)
      .json({ message: "Forbidden: Only managers can access reports" });
  }

  // Handle different HTTP methods
  switch (method) {
    case "GET":
      try {
        const { type, startDate, endDate, employee, department } = req.query;

        // Validate date range
        if (!startDate || !endDate) {
          return res
            .status(400)
            .json({ message: "Start date and end date are required" });
        }

        const start = new Date(startDate as string);
        const end = new Date(endDate as string);

        // Build the query
        const query: any = {
          startTime: { $gte: start },
          endTime: { $lte: end },
        };

        // If employee ID is provided, filter by employee
        if (employee) {
          query.employee = employee;
        } else if (decoded.role === "employee") {
          // If user is an employee, only show their shifts
          query.employee = decoded.id;
        }

        // Get all shifts within the date range
        const shifts = await Shift.find(query)
          .populate("employee", "firstName lastName email department")
          .sort({ startTime: 1 });

        // If department is provided, filter shifts by employee department
        const filteredShifts = department
          ? shifts.filter(
              (shift: any) => shift.employee.department === department
            )
          : shifts;

        // Generate report based on type
        let report: any = {};

        if (type === "hours") {
          // Hours report - Group by employee or department
          const departmentHours: { [key: string]: number } = {};
          const employeeHours: {
            [key: string]: { name: string; hours: number; department: string };
          } = {};

          filteredShifts.forEach((shift: any) => {
            if (!shift.employee) return;
            const dept = shift.employee.department;
            const empId = shift.employee._id.toString();
            const empName = `${shift.employee.firstName} ${shift.employee.lastName}`;
            const hours = shift.totalHours || 0;

            // Update department hours
            departmentHours[dept] = (departmentHours[dept] || 0) + hours;

            // Update employee hours
            if (!employeeHours[empId]) {
              employeeHours[empId] = {
                name: empName,
                hours: 0,
                department: dept,
              };
            }
            employeeHours[empId].hours += hours;
          });

          report = {
            departmentHours,
            employeeHours: Object.values(employeeHours),
            totalHours: filteredShifts.reduce(
              (sum: number, shift: any) => sum + (shift.totalHours || 0),
              0
            ),
          };
        } else if (type === "payroll") {
          // Payroll report - Group by employee or department
          const departmentPayroll: { [key: string]: number } = {};
          const employeePayroll: {
            [key: string]: { name: string; pay: number; department: string };
          } = {};

          filteredShifts.forEach((shift: any) => {
            if (!shift.employee) return;
            const dept = shift.employee.department;
            const empId = shift.employee._id.toString();
            const empName = `${shift.employee.firstName} ${shift.employee.lastName}`;
            const pay = shift.totalPay || 0;

            // Update department payroll
            departmentPayroll[dept] = (departmentPayroll[dept] || 0) + pay;

            // Update employee payroll
            if (!employeePayroll[empId]) {
              employeePayroll[empId] = {
                name: empName,
                pay: 0,
                department: dept,
              };
            }
            employeePayroll[empId].pay += pay;
          });

          report = {
            departmentPayroll,
            employeePayroll: Object.values(employeePayroll),
            totalPayroll: filteredShifts.reduce(
              (sum: number, shift: any) => sum + (shift.totalPay || 0),
              0
            ),
          };
        } else if (type === "employee") {
          // Employee report - Only for the current employee
          if (decoded.role !== "employee" && !employee) {
            return res.status(400).json({
              message: "Employee ID is required for employee reports",
            });
          }

          const employeeId = employee || decoded.id;
          const employeeShifts = filteredShifts.filter(
            (shift: any) => shift.employee._id.toString() === employeeId
          );

          const totalHours = employeeShifts.reduce(
            (sum: number, shift: any) => sum + (shift.totalHours || 0),
            0
          );
          const totalPay = employeeShifts.reduce(
            (sum: number, shift: any) => sum + (shift.totalPay || 0),
            0
          );

          report = {
            shifts: employeeShifts,
            totalHours,
            totalPay,
            averageHoursPerShift: employeeShifts.length
              ? totalHours / employeeShifts.length
              : 0,
          };
        } else {
          // Default summary report
          const departments = await User.distinct("department", {
            role: "employee",
          });
          const departmentCounts: { [key: string]: number } = {};

          for (const dept of departments) {
            const count = await User.countDocuments({
              department: dept,
              role: "employee",
            });
            departmentCounts[dept] = count;
          }

          report = {
            totalShifts: filteredShifts.length,
            totalHours: filteredShifts.reduce(
              (sum: number, shift: any) => sum + (shift.totalHours || 0),
              0
            ),
            totalPayroll: filteredShifts.reduce(
              (sum: number, shift: any) => sum + (shift.totalPay || 0),
              0
            ),
            departments: departmentCounts,
          };
        }

        return res.status(200).json({ report });
      } catch (error) {
        console.error("Error generating report:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
