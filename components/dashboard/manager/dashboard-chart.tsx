"use client"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Box, styled, Typography } from "@mui/material"

const data = [
  { name: "Sales", hours: 120 },
  { name: "Support", hours: 80 },
  { name: "Kitchen", hours: 70 },
  { name: "Admin", hours: 40 },
  { name: "Delivery", hours: 60 },
  { name: "Cleaning", hours: 30 },
]

const ChartContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: "white",
  borderRadius: "0.375rem",
  padding: theme.spacing(1),
  border: "1px solid #e2e8f0", // From global.css
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)", // From global.css
  "&:hover": {
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", // From global.css
  },
}))

const CustomTooltip = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "0.375rem",
  padding: theme.spacing(1.25),
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
}))

const TooltipLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
  color: "#03306b", // Primary color from global.css
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
}))

const TooltipValue = styled(Typography)(({ theme }) => ({
  color: "#03306b", // Primary color
  fontWeight: 500,
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
}))

export function ManagerDashboardChart() {
  const renderCustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltip>
          <TooltipLabel>{label}</TooltipLabel>
          <TooltipValue>{`${payload[0].value} hours`}</TooltipValue>
        </CustomTooltip>
      )
    }
    return null
  }

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis
            dataKey="name"
            stroke="#64748b" // Muted color from global.css
            fontSize={12}
            tickLine={false}
            axisLine={false}
            fontFamily="'Inter', 'Segoe UI', 'Helvetica Neue', 'Arial', sans-serif"
          />
          <YAxis
            stroke="#64748b"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}h`}
            fontFamily="'Inter', 'Segoe UI', 'Helvetica Neue', 'Arial', sans-serif"
          />
          <Tooltip content={renderCustomTooltip} />
          <Bar
            dataKey="hours"
            fill="#03306b" // Primary color from global.css
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            barSize={30}
            background={{ fill: "#f8fafc" }} // Light background
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
