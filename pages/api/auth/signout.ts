// pages/api/auth/signout.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { removeTokenCookie } from "../../../lib/auth"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    // Remove the token cookie
    removeTokenCookie(res)

    return res.status(200).json({ message: "Signed out successfully" })
  } catch (error) {
    console.error("Sign-out error:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}
