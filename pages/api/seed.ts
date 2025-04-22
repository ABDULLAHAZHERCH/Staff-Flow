// pages/api/seed.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { seedUsers } from "../../lib/seed"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow in development environment
  if (process.env.NODE_ENV !== "development") {
    return res.status(403).json({ message: "This endpoint is only available in development mode" })
  }

  try {
    await seedUsers()
    return res.status(200).json({ message: "Database seeded successfully" })
  } catch (error) {
    console.error("Seed error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}
