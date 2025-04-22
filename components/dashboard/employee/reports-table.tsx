"use client"

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material"
import { FileDownload } from "@mui/icons-material"

const reportData = [
  {
    id: 1,
    week: "Week 1 (Apr 1-7)",
    regularHours: 40,
    overtimeHours: 0,
    totalHours: 40,
  },
  {
    id: 2,
    week: "Week 2 (Apr 8-14)",
    regularHours: 40,
    overtimeHours: 2,
    totalHours: 42,
  },
  {
    id: 3,
    week: "Week 3 (Apr 15-21)",
    regularHours: 38,
    overtimeHours: 0,
    totalHours: 38,
  },
  {
    id: 4,
    week: "Week 4 (Apr 22-28)",
    regularHours: 40,
    overtimeHours: 0,
    totalHours: 40,
  },
]

export function EmployeeReportsTable() {
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<FileDownload />}
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 500,
            textTransform: "none",
            borderColor: "#e2e8f0",
            color: "#333",
            borderRadius: "0.375rem",
            "&:hover": {
              bgcolor: "#f8fafc",
              borderColor: "#e2e8f0",
            },
          }}
        >
          Export
        </Button>
      </Box>
      <TableContainer
        sx={{
          border: "1px solid #e2e8f0",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f8fafc" }}>
              {["Week", "Regular Hours", "Overtime Hours", "Total Hours", ""].map((header) => (
                <TableCell key={header}>
                  <Typography
                    sx={{
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 600,
                      color: "#333",
                      fontSize: "0.875rem",
                    }}
                  >
                    {header}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {reportData.map((report) => (
              <TableRow
                key={report.id}
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
                    {report.week}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: "0.875rem",
                      color: "#333",
                    }}
                  >
                    {report.regularHours}h
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: "0.875rem",
                      color: "#333",
                    }}
                  >
                    {report.overtimeHours}h
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: "0.875rem",
                      color: "#333",
                    }}
                  >
                    {report.totalHours}h
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 500,
                      color: "#03306b",
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "#f8fafc",
                        color: "#022555",
                      },
                    }}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
