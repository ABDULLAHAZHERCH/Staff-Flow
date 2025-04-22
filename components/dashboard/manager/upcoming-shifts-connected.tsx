"use client"
import { useState, useEffect } from "react"
import { Box, Typography, Avatar, Chip, Button, styled, CircularProgress, Alert } from "@mui/material"
import { CalendarToday, AccessTime, Edit, Delete } from "@mui/icons-material"
import { format } from "date-fns"

type Shift = {
  _id: string
  startTime: string
  endTime: string
  location: string
  status: string
  hourlyRate: number
  totalHours: number
  totalPay: number
  employee: {
    _id: string
    firstName: string
    lastName: string
    email: string
  }
  manager: {
    _id: string
    firstName: string
    lastName: string
    email: string
  }
}

const ShiftsContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  backgroundColor: "white",
}))

const ShiftsTable = styled(Box)(({ theme }) => ({
  width: "100%",
  borderRadius: "0.5rem",
  overflow: "hidden",
  backgroundColor: "white",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)", // From global.css
}))

const TableHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#f8fafc", // Light background
  borderBottom: "1px solid #e2e8f0", // From global.css
  fontWeight: 600,
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  color: "#03306b", // Primary color
  fontSize: "0.875rem",
}))

const TableRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderBottom: "1px solid #e2e8f0", // From global.css
  alignItems: "center",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "#f8fafc", // Light background on hover
  },
  "&:last-child": {
    borderBottom: "none",
  },
}))

const EmployeeCell = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  flex: 2,
}))

const DateCell = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  color: "#1e293b", // Darker body color
  flex: 1,
}))

const TimeCell = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  color: "#1e293b",
  flex: 1,
}))

const StatusBadge = styled(Chip)<{ status?: string }>(({ theme, status }) => ({
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  fontSize: "0.75rem",
  fontWeight: 500,
  borderRadius: "9999px",
  backgroundColor: status === "scheduled" ? "#ebf5ff" : "#fff7ed", // Blue/Orange light backgrounds
  color: status === "scheduled" ? "#03306b" : "#c61111", // Primary/Secondary colors
  border: `1px solid ${status === "scheduled" ? "#bfdbfe" : "#fed7aa"}`,
  height: 24,
}))

const ActionButton = styled(Button)(({ theme }) => ({
  width: 32,
  height: 32,
  minWidth: 32,
  padding: 0,
  borderRadius: "0.375rem",
  backgroundColor: "transparent",
  color: "#1a1a1a",
  "&:hover": {
    backgroundColor: "#f1f5f9", // Muted/10 equivalent
    color: "#c61111", // Secondary color
  },
}))

export function UpcomingShiftsConnected() {
  const [shifts, setShifts] = useState<Shift[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        setLoading(true)
        // Get shifts for the next 7 days
        const today = new Date()
        const nextWeek = new Date(today)
        nextWeek.setDate(today.getDate() + 7)

        const startDate = today.toISOString().split("T")[0]
        const endDate = nextWeek.toISOString().split("T")[0]

        const response = await fetch(`/api/shifts?startDate=${startDate}&endDate=${endDate}`)

        if (!response.ok) {
          throw new Error("Failed to fetch shifts")
        }

        const data = await response.json()
        setShifts(data.shifts)
        setError(null)
      } catch (err) {
        console.error("Error fetching shifts:", err)
        setError("Failed to load upcoming shifts. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchShifts()
  }, [])

  const handleDeleteShift = async (id: string) => {
    try {
      const response = await fetch(`/api/shifts/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete shift")
      }

      // Remove the shift from the state
      setShifts(shifts.filter((shift) => shift._id !== id))
    } catch (err) {
      console.error("Error deleting shift:", err)
      setError("Failed to delete shift. Please try again.")
      setTimeout(() => setError(null), 3000)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    )
  }

  if (shifts.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4, color: "#4a5568" }}>
        <Typography sx={{ fontFamily: '"Inter", sans-serif', fontSize: "1rem" }}>No upcoming shifts found.</Typography>
      </Box>
    )
  }

  return (
    <ShiftsContainer>
      <ShiftsTable>
        <TableHeader>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ flex: 2 }}>Employee</Box>
            <Box sx={{ flex: 1 }}>Department</Box>
            <Box sx={{ flex: 1 }}>Date</Box>
            <Box sx={{ flex: 1 }}>Time</Box>
            <Box sx={{ flex: 1 }}>Status</Box>
            <Box sx={{ flex: 1, textAlign: "right" }}>Actions</Box>
          </Box>
        </TableHeader>
        {shifts.map((shift) => {
          const startDate = new Date(shift.startTime)
          const endDate = new Date(shift.endTime)
          const formattedDate = format(startDate, "yyyy-MM-dd")
          const startTimeFormatted = format(startDate, "HH:mm")
          const endTimeFormatted = format(endDate, "HH:mm")

          return (
            <TableRow key={shift._id}>
              <EmployeeCell>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "#03306b",
                    color: "white",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  {shift.employee.firstName.charAt(0) + shift.employee.lastName.charAt(0)}
                </Avatar>
                <Typography
                  sx={{
                    fontWeight: 500,
                    color: "#03306b",
                    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                  }}
                >
                  {shift.employee.firstName} {shift.employee.lastName}
                </Typography>
              </EmployeeCell>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                  {shift.location}
                </Typography>
              </Box>
              <DateCell>
                <CalendarToday sx={{ fontSize: 16, color: "#03306b" }} />
                <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                  {formattedDate}
                </Typography>
              </DateCell>
              <TimeCell>
                <AccessTime sx={{ fontSize: 16, color: "#03306b" }} />
                <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                  {startTimeFormatted} - {endTimeFormatted}
                </Typography>
              </TimeCell>
              <Box sx={{ flex: 1 }}>
                <StatusBadge
                  status={shift.status}
                  label={shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
                />
              </Box>
              <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", gap: 1 }}>
                <ActionButton>
                  <Edit sx={{ fontSize: 16, color: "#03306b" }} />
                </ActionButton>
                <ActionButton onClick={() => handleDeleteShift(shift._id)}>
                  <Delete sx={{ fontSize: 16, color: "#c61111" }} />
                </ActionButton>
              </Box>
            </TableRow>
          )
        })}
      </ShiftsTable>
    </ShiftsContainer>
  )
}
