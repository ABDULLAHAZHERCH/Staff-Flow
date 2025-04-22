"use client"

import { useState } from "react"
import { Box, Typography, Paper, Tabs, Tab, Divider } from "@mui/material"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import NotificationsIcon from "@mui/icons-material/Notifications"

import { EmployeeScheduleConnected } from "@/components/dashboard/employee/employee-schedule-connected"
import { EmployeeStats } from "@/components/dashboard/employee/employee-stats"

export default function EmployeeDashboardPage() {
  const [tabIndex, setTabIndex] = useState(0)

  const stats = [
    { label: "Upcoming Shifts", value: 5, sub: "Next 7 days", icon: <CalendarMonthIcon color="primary" /> },
    { label: "Hours Worked", value: 32, sub: "This week", icon: <AccessTimeIcon color="primary" /> },
    { label: "Earnings", value: "$640", sub: "This week", icon: <CreditCardIcon color="primary" /> },
    { label: "Notifications", value: 0, sub: "Unread messages", icon: <NotificationsIcon color="primary" /> },
  ]

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 4 }}>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {stats.map((item) => (
          <Paper
            key={item.label}
            elevation={3}
            sx={{
              p: 2,
              flex: "1 1 200px",
              minWidth: "200px",
              transition: "box-shadow 0.2s",
              "&:hover": { boxShadow: 6 },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="subtitle2" color="text.secondary">
                {item.label}
              </Typography>
              {item.icon}
            </Box>
            <Typography variant="h5" fontWeight="bold">
              {item.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {item.sub}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Box>
        <Tabs
          value={tabIndex}
          onChange={(_, newValue) => setTabIndex(newValue)}
          sx={{ mb: 2 }}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="My Schedule" />
          <Tab label="My Stats" />
        </Tabs>

        {tabIndex === 0 && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Upcoming Schedule</Typography>
            <Typography variant="body2" color="text.secondary">
              View your upcoming shifts for the next 7 days
            </Typography>
            <Divider sx={{ my: 2 }} />
            <EmployeeScheduleConnected />
          </Paper>
        )}

        {tabIndex === 1 && (
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">Work Statistics</Typography>
            <Typography variant="body2" color="text.secondary">
              Your work hours and performance over time
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ height: 300 }}>
              <EmployeeStats />
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  )
}
