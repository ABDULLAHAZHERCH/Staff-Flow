
"use client"

import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from "@mui/material"
import { FileDownload } from "@mui/icons-material"

const payrollData = [
  {
    id: 1,
    week: "Week 1 (Apr 1-7)",
    regularHours: 40,
    overtimeHours: 0,
    regularPay: 800,
    overtimePay: 0,
    totalPay: 800,
  },
  {
    id: 2,
    week: "Week 2 (Apr 8-14)",
    regularHours: 40,
    overtimeHours: 2,
    regularPay: 800,
    overtimePay: 60,
    totalPay: 860,
  },
  {
    id: 3,
    week: "Week 3 (Apr 15-21)",
    regularHours: 38,
    overtimeHours: 0,
    regularPay: 760,
    overtimePay: 0,
    totalPay: 760,
  },
  {
    id: 4,
    week: "Week 4 (Apr 22-28)",
    regularHours: 40,
    overtimeHours: 0,
    regularPay: 800,
    overtimePay: 0,
    totalPay: 800,
  },
]

export function EmployeePayrollTable() {
  const totals = {
    regularHours: payrollData.reduce((sum, row) => sum + row.regularHours, 0),
    overtimeHours: payrollData.reduce((sum, row) => sum + row.overtimeHours, 0),
    regularPay: payrollData.reduce((sum, row) => sum + row.regularPay, 0),
    overtimePay: payrollData.reduce((sum, row) => sum + row.overtimePay, 0),
    totalPay: payrollData.reduce((sum, row) => sum + row.totalPay, 0),
  }

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
              {["Week", "Regular Hours", "Overtime Hours", "Regular Pay", "Overtime Pay", "Total Pay"].map((header) => (
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
            {payrollData.map((payroll) => (
              <TableRow
                key={payroll.id}
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
                    {payroll.week}
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
                    {payroll.regularHours}h
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
                    {payroll.overtimeHours}h
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
                    ${payroll.regularPay}
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
                    ${payroll.overtimePay}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 500,
                      color: "#333",
                      fontSize: "0.875rem",
                    }}
                  >
                    ${payroll.totalPay}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ bgcolor: "#f1f5f9" }}>
              <TableCell>
                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 700,
                    color: "#333",
                    fontSize: "0.875rem",
                  }}
                >
                  Total
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
                  {totals.regularHours}h
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
                  {totals.overtimeHours}h
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
                  ${totals.regularPay}
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
                  ${totals.overtimePay}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 700,
                    color: "#333",
                    fontSize: "0.875rem",
                  }}
                >
                  ${totals.totalPay}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
