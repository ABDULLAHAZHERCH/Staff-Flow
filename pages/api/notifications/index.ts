// pages/api/notifications/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongodb";
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

  // Handle different HTTP methods
  switch (method) {
    case "GET":
      try {
        // Fetch all notifications
        const notifications = await Notification.find({})
          .populate("sender", "firstName lastName email") // Optionally populate sender details
          .sort({ createdAt: -1 }); // Optionally sort by creation date (newest first)

        return res.status(200).json({ notifications });
      } catch (error) {
        console.error("Error fetching all notifications:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      break;

    case "POST":
      // Only managers can create notifications for all employees
      if (decoded.role !== "manager") {
        return res.status(403).json({
          message: "Forbidden: Only managers can create announcements",
        });
      }

      try {
        const { recipients, title, message, type = "announcement" } = req.body;

        // Validate required fields
        if (!recipients || !title || !message) {
          return res.status(400).json({ message: "Missing required fields" });
        }

        // Create notifications for all recipients
        const notifications = await Promise.all(
          recipients.map((recipient: string) =>
            Notification.create({
              recipient,
              sender: decoded.id,
              type,
              title,
              message,
            })
          )
        );

        return res.status(201).json({ notifications });
      } catch (error) {
        console.error("Error creating notifications:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
