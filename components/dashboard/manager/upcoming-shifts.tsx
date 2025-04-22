"use client"
import { Box, Typography, Avatar, Chip, Button, styled } from "@mui/material"
import { CalendarToday, AccessTime, Edit, Delete } from "@mui/icons-material"

const shifts = [
  {
    id: 1,
    employee: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
    },
    department: "Sales",
    date: "2025-04-20",
    startTime: "09:00",
    endTime: "17:00",
    status: "confirmed",
  },
  {
    id: 2,
    employee: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MJ",
    },
    department: "Support",
    date: "2025-04-20",
    startTime: "10:00",
    endTime: "18:00",
    status: "confirmed",
  },
  {
    id: 3,
    employee: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SW",
    },
    department: "Kitchen",
    date: "2025-04-21",
    startTime: "08:00",
    endTime: "16:00",
    status: "pending",
  },
  {
    id: 4,
    employee: {
      name: "David Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DB",
    },
    department: "Delivery",
    date: "2025-04-21",
    startTime: "12:00",
    endTime: "20:00",
    status: "confirmed",
  },
  {
    id: 5,
    employee: {
      name: "Lisa Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "LC",
    },
    department: "Admin",
    date: "2025-04-22",
    startTime: "09:00",
    endTime: "17:00",
    status: "confirmed",
  },
]

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
  backgroundColor: status === "confirmed" ? "#ebf5ff" : "#fff7ed", // Blue/Orange light backgrounds
  color: status === "confirmed" ? "#03306b" : "#c61111", // Primary/Secondary colors
  border: `1px solid ${status === "confirmed" ? "#bfdbfe" : "#fed7aa"}`,
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

export function UpcomingShifts() {
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
        {shifts.map((shift) => (
          <TableRow key={shift.id}>
            <EmployeeCell>
              <Avatar
                sx={{ width: 32, height: 32, bgcolor: "#03306b", color: "white", fontSize: "0.75rem", fontWeight: 600 }}
              >
                <img src={shift.employee.avatar || "/placeholder.svg"} alt={shift.employee.name} />
                {shift.employee.initials}
              </Avatar>
              <Typography
                sx={{
                  fontWeight: 500,
                  color: "#03306b",
                  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                }}
              >
                {shift.employee.name}
              </Typography>
            </EmployeeCell>
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                {shift.department}
              </Typography>
            </Box>
            <DateCell>
              <CalendarToday sx={{ fontSize: 16, color: "#03306b" }} />
              <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                {shift.date}
              </Typography>
            </DateCell>
            <TimeCell>
              <AccessTime sx={{ fontSize: 16, color: "#03306b" }} />
              <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                {shift.startTime} - {shift.endTime}
              </Typography>
            </TimeCell>
            <Box sx={{ flex: 1 }}>
              <StatusBadge status={shift.status} label={shift.status === "confirmed" ? "Confirmed" : "Pending"} />
            </Box>
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <ActionButton>
                <Edit sx={{ fontSize: 16, color: "#03306b" }} />
              </ActionButton>
              <ActionButton>
                <Delete sx={{ fontSize: 16, color: "#c61111" }} />
              </ActionButton>
            </Box>
          </TableRow>
        ))}
      </ShiftsTable>
    </ShiftsContainer>
  )
}

export default UpcomingShifts
