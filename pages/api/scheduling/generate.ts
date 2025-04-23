// pages/api/scheduling/generate.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import Shift from "../../../models/Shift";
import { verifyToken, getTokenFromCookies } from "../../../lib/auth";
import {
  generateSchedule,
  type SchedulingParams,
  type EmployeeAvailability,
  type ShiftRequirement,
} from "../../../lib/decision-tree";

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

  // Only managers can generate schedules
  if (decoded.role !== "manager") {
    return res
      .status(403)
      .json({ message: "Forbidden: Only managers can generate schedules" });
  }

  // Handle POST request to generate a schedule
  if (method === "POST") {
    try {
      const params: SchedulingParams = req.body;

      // Validate required parameters
      if (!params.startDate || !params.endDate) {
        return res.status(400).json({
          message: "Missing required parameters: startDate and endDate",
        });
      }

      // Convert string dates to Date objects
      params.startDate = new Date(params.startDate);
      params.endDate = new Date(params.endDate);

      // Get employees based on department filter
      const departmentFilter =
        params.department && params.department !== "all"
          ? { department: params.department }
          : {};

      // Define the structure of the user document from MongoDB
      interface UserDocument {
        _id: { toString(): string };
        [key: string]: any;
      }

      const employees = (await User.find({
        role: "employee",
        status: "active",
        ...departmentFilter,
      }).lean()) as UserDocument[];

      // Get existing shifts for the date range
      const existingShifts = await Shift.find({
        startTime: { $gte: params.startDate },
        endTime: { $lte: params.endDate },
      }).lean();

      // Generate mock availability data for each employee
      // In a real implementation, this would come from a database
      const employeesWithAvailability = employees.map((employee) => {
        const availability: EmployeeAvailability = {
          userId: employee._id.toString(),
          availableDays: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          availableTimeSlots: [
            { day: "Monday", startTime: "08:00", endTime: "20:00" },
            { day: "Tuesday", startTime: "08:00", endTime: "20:00" },
            { day: "Wednesday", startTime: "08:00", endTime: "20:00" },
            { day: "Thursday", startTime: "08:00", endTime: "20:00" },
            { day: "Friday", startTime: "08:00", endTime: "20:00" },
          ],
          preferredShifts:
            Math.random() > 0.5
              ? "morning"
              : Math.random() > 0.5
              ? "afternoon"
              : "evening",
          maxHoursPerWeek: 40,
          requestedTimeOff: [],
          skills: ["customer service", "cash handling", "inventory management"],
          skillLevel: Math.floor(Math.random() * 5) + 1, // Random skill level 1-5
          consecutiveDaysWorked: Math.floor(Math.random() * 3), // Random 0-2 days
          totalHoursThisWeek: Math.floor(Math.random() * 20), // Random 0-20 hours
        };

        // Add weekend availability for some employees
        if (Math.random() > 0.3) {
          availability.availableDays.push("Saturday");
          availability.availableTimeSlots.push({
            day: "Saturday",
            startTime: "08:00",
            endTime: "20:00",
          });
        }
        if (Math.random() > 0.5) {
          availability.availableDays.push("Sunday");
          availability.availableTimeSlots.push({
            day: "Sunday",
            startTime: "08:00",
            endTime: "20:00",
          });
        }

        return {
          ...employee,
          availability,
        };
      });

      // Generate shift requirements for the date range
      // In a real implementation, this would come from a database or be specified by the manager
      const shiftRequirements: ShiftRequirement[] = [];
      const departments = [
        "Sales",
        "Support",
        "Kitchen",
        "Delivery",
        "Admin",
        "Cleaning",
      ];

      // Loop through each day in the date range
      const currentDate = new Date(params.startDate);
      while (currentDate <= params.endDate) {
        const day = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][currentDate.getDay()];

        // Generate shifts for each department
        departments.forEach((department) => {
          // Morning shift
          shiftRequirements.push({
            date: new Date(currentDate),
            day,
            startTime: "08:00",
            endTime: "16:00",
            department,
            requiredSkills: ["customer service"],
            minSkillLevel: 2,
          });

          // Afternoon shift
          shiftRequirements.push({
            date: new Date(currentDate),
            day,
            startTime: "12:00",
            endTime: "20:00",
            department,
            requiredSkills: ["customer service"],
            minSkillLevel: 2,
          });
        });

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Generate the schedule
      const schedule = await generateSchedule(
        employeesWithAvailability,
        shiftRequirements,
        existingShifts,
        params
      );

      return res.status(200).json({ schedule });
    } catch (error) {
      console.error("Error generating schedule:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
