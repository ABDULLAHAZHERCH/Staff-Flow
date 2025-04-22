"use client"

import { Box, Typography } from "@mui/material"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const data = [
  { name: "Week 1", hours: 40, target: 40 },
  { name: "Week 2", hours: 42, target: 40 },
  { name: "Week 3", hours: 38, target: 40 },
  { name: "Week 4", hours: 40, target: 40 },
]

export function EmployeeReportsChart() {
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
        Hours Worked vs Target
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis
            dataKey="name"
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
            name="Hours Worked"
            stroke="#03306b"
            strokeWidth={2}
            dot={{ r: 4, fill: "#03306b" }}
          />
          <Line
            type="monotone"
            dataKey="target"
            name="Target Hours"
            stroke="#c61111"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}
