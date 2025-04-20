
"use client"

import { Box, Typography } from "@mui/material"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts"

const data = [
  { name: "Week 1", regular: 800, overtime: 0 },
  { name: "Week 2", regular: 800, overtime: 60 },
  { name: "Week 3", regular: 760, overtime: 0 },
  { name: "Week 4", regular: 800, overtime: 0 },
]

export function EmployeePayrollChart() {
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
        Payroll Breakdown
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
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
            tickFormatter={(value) => `$${value}`}
            fontFamily='"Inter", sans-serif'
          />
          <Tooltip
            formatter={(value) => [`$${value}`, ""]}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "0.375rem",
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.875rem",
            }}
            labelStyle={{ color: "#03306b", fontWeight: 600 }}
          />
          <Legend
            wrapperStyle={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.875rem",
              color: "#333",
            }}
          />
          <Bar dataKey="regular" name="Regular Pay" fill="#03306b" radius={[4, 4, 0, 0]} />
          <Bar dataKey="overtime" name="Overtime Pay" fill="#c61111" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}
