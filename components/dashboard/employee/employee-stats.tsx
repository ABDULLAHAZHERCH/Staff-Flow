
"use client"

import React from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { Box, Typography } from "@mui/material"

const data = [
  { day: "Mon", hours: 8 },
  { day: "Tue", hours: 8 },
  { day: "Wed", hours: 0 },
  { day: "Thu", hours: 8 },
  { day: "Fri", hours: 8 },
  { day: "Sat", hours: 0 },
  { day: "Sun", hours: 0 },
]

export function EmployeeStats() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        p: 2,
        border: "1px solid #e2e8f0",
        borderRadius: "0.5rem",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: '"Poppins", sans-serif',
          fontWeight: 600,
          color: "#333",
          mb: 2,
        }}
      >
        Weekly Hours
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis
            dataKey="day"
            stroke="#4a5568"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            fontFamily='"Inter", sans-serif'
          />
          <YAxis
            stroke="#4a5568"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}h`}
            fontFamily='"Inter", sans-serif'
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "0.375rem",
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.875rem",
            }}
            labelStyle={{ color: "#03306b", fontWeight: 600 }}
          />
          <Line
            type="monotone"
            dataKey="hours"
            stroke="#03306b"
            strokeWidth={2}
            dot={{ r: 4, fill: "#03306b" }}
            activeDot={{ r: 6, fill: "#03306b" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}