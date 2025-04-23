// pages/api/scheduling/save.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
import Shift from "../../../models/Shift";
import Notification from "../../../models/Notification";
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

  // Only managers can save schedules
  if (decoded.role !== "manager") {
    return res
      .status(403)
      .json({ message: "Forbidden: Only managers can save schedules" });
  }

  // Handle POST request to save a generated schedule
  if (method === "POST") {
    try {
      const { shifts } = req.body;

      if (!shifts || !Array.isArray(shifts) || shifts.length === 0) {
        return res
          .status(400)
          .json({ message: "Invalid or empty shifts array" });
      }

      // Create an array to store the created shifts
      const createdShifts = [];

      // Create each shift in the database
      for (const shiftData of shifts) {
        const { shiftRequirement, assignedEmployee } = shiftData;

        // Create the shift
        const shift = await Shift.create({
          employee: assignedEmployee._id,
          manager: decoded.id,
          startTime: new Date(
            `${shiftRequirement.date.split("T")[0]}T${
              shiftRequirement.startTime
            }`
          ),
          endTime: new Date(
            `${shiftRequirement.date.split("T")[0]}T${shiftRequirement.endTime}`
          ),
          location: shiftRequirement.department,
          hourlyRate: 15, // Default hourly rate, could be customized
          notes: `AI generated shift. Decision score: ${Math.round(
            shiftData.score * 100
          )}%`,
        });

        createdShifts.push(shift);

        // Create a notification for the employee
        await Notification.create({
          recipient: assignedEmployee._id,
          sender: decoded.id,
          type: "shift_assigned",
          title: "New Shift Assigned",
          message: `You have been assigned a new shift on ${new Date(
            shiftRequirement.date
          ).toLocaleDateString()} from ${shiftRequirement.startTime} to ${
            shiftRequirement.endTime
          }.`,
          relatedId: shift._id,
          relatedModel: "Shift",
        });
      }

      return res.status(201).json({
        message: `Successfully created ${createdShifts.length} shifts`,
        shifts: createdShifts,
      });
    } catch (error) {
      console.error("Error saving schedule:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
