"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material"
import { CalendarMonth, AccessTime } from "@mui/icons-material"
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

export function EmployeeScheduleConnected() {
  const [shifts, setShifts] = useState<Shift[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/shifts")

        if (!response.ok) {
          throw new Error("Failed to fetch shifts")
        }

        const data = await response.json()
        setShifts(data.shifts)
        setError(null)
      } catch (err) {
        console.error("Error fetching shifts:", err)
        setError("Failed to load your schedule. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchShifts()
  }, [])

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
        <Typography sx={{ fontFamily: '"Inter", sans-serif', fontSize: "1rem" }}>
          No shifts scheduled at this time.
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer
        sx={{
          border: "1px solid #e2e8f0",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
          overflowX: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f8fafc" }}>
              <TableCell>
                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 600,
                    color: "#333",
                    fontSize: "0.875rem",
                  }}
                >
                  Day
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 600,
                    color: "#333",
                    fontSize: "0.875rem",
                  }}
                >
                  Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 600,
                    color: "#333",
                    fontSize: "0.875rem",
                  }}
                >
                  Time
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 600,
                    color: "#333",
                    fontSize: "0.875rem",
                  }}
                >
                  Location
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 600,
                    color: "#333",
                    fontSize: "0.875rem",
                  }}
                >
                  Status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shifts.map((shift) => {
              const startDate = new Date(shift.startTime)
              const endDate = new Date(shift.endTime)
              const day = format(startDate, "EEEE")
              const date = format(startDate, "yyyy-MM-dd")
              const startTimeFormatted = format(startDate, "HH:mm")
              const endTimeFormatted = format(endDate, "HH:mm")

              return (
                <TableRow
                  key={shift._id}
                  sx={{
                    "&:hover": {
                      bgcolor: "#f8fafc",
                      transition: "background-color 0.2s ease",
                    },
                  }}
                >
                  <TableCell>
                    <Typography
                      sx={{
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: 500,
                        color: "#333",
                        fontSize: "0.875rem",
                      }}
                    >
                      {day}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarMonth sx={{ color: "#03306b", fontSize: 16 }} />
                      <Typography
                        sx={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: "0.875rem",
                          color: "#333",
                        }}
                      >
                        {date}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccessTime sx={{ color: "#03306b", fontSize: 16 }} />
                      <Typography
                        sx={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: "0.875rem",
                          color: "#333",
                        }}
                      >
                        {startTimeFormatted} - {endTimeFormatted}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: "0.875rem",
                        color: "#333",
                      }}
                    >
                      {shift.location}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
                      color={shift.status === "scheduled" ? "primary" : "default"}
                      sx={{
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: 500,
                        fontSize: "0.75rem",
                        bgcolor: shift.status === "scheduled" ? "#03306b" : "transparent",
                        color: shift.status === "scheduled" ? "white" : "#03306b",
                        borderColor: shift.status === "scheduled" ? "#03306b" : "#03306b",
                        borderWidth: shift.status === "scheduled" ? 0 : 1,
                        borderStyle: shift.status === "scheduled" ? "none" : "solid",
                      }}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
