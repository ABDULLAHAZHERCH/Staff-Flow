
"use client"

import React from "react"
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip } from "@mui/material"
import { CalendarMonth, AccessTime } from "@mui/icons-material"

const shifts = [
  {
    id: 1,
    date: "2025-04-20",
    day: "Monday",
    startTime: "09:00",
    endTime: "17:00",
    department: "Sales",
    status: "confirmed",
  },
  {
    id: 2,
    date: "2025-04-21",
    day: "Tuesday",
    startTime: "09:00",
    endTime: "17:00",
    department: "Sales",
    status: "confirmed",
  },
  {
    id: 3,
    date: "2025-04-23",
    day: "Thursday",
    startTime: "10:00",
    endTime: "18:00",
    department: "Sales",
    status: "confirmed",
  },
  {
    id: 4,
    date: "2025-04-24",
    day: "Friday",
    startTime: "09:00",
    endTime: "17:00",
    department: "Sales",
    status: "confirmed",
  },
  {
    id: 5,
    date: "2025-04-27",
    day: "Monday",
    startTime: "09:00",
    endTime: "17:00",
    department: "Sales",
    status: "pending",
  },
]

export function EmployeeSchedule() {
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
                  Department
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
            {shifts.map((shift) => (
              <TableRow
                key={shift.id}
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
                    {shift.day}
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
                      {shift.date}
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
                      {shift.startTime} - {shift.endTime}
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
                    {shift.department}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={shift.status === "confirmed" ? "Confirmed" : "Pending"}
                    color={shift.status === "confirmed" ? "primary" : "default"}
                    sx={{
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 500,
                      fontSize: "0.75rem",
                      bgcolor: shift.status === "confirmed" ? "#03306b" : "transparent",
                      color: shift.status === "confirmed" ? "white" : "#03306b",
                      borderColor: shift.status === "confirmed" ? "#03306b" : "#03306b",
                      borderWidth: shift.status === "confirmed" ? 0 : 1,
                      borderStyle: shift.status === "confirmed" ? "none" : "solid",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
