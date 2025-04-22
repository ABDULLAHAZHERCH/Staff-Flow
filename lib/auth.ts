// lib/auth.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { sign, verify } from "jsonwebtoken"
import { serialize, parse } from "cookie"
import type { IUser } from "../models/User"

const TOKEN_NAME = "staffflow_token"
const MAX_AGE = 60 * 60 * 24 * 7 // 1 week

export function createToken(user: IUser) {
  // Create a JWT token that expires in 1 week
  const token = sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    process.env.JWT_SECRET || "staffflow_secret_key",
    { expiresIn: MAX_AGE },
  )

  return token
}

export function setTokenCookie(res: NextApiResponse, token: string) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  })

  res.setHeader("Set-Cookie", cookie)
}

export function removeTokenCookie(res: NextApiResponse) {
  const cookie = serialize(TOKEN_NAME, "", {
    maxAge: -1,
    path: "/",
  })

  res.setHeader("Set-Cookie", cookie)
}

export function parseCookies(req: NextApiRequest) {
  // For API Routes, we need to parse the cookies
  if (req.cookies) return req.cookies

  // For pages, we can use the parsed cookies
  const cookie = req.headers?.cookie
  return parse(cookie || "")
}

export function getTokenFromCookies(req: NextApiRequest) {
  const cookies = parseCookies(req)
  return cookies[TOKEN_NAME]
}

export function verifyToken(token: string) {
  try {
    return verify(token, process.env.JWT_SECRET || "staffflow_secret_key")
  } catch (error) {
    return null
  }
}
