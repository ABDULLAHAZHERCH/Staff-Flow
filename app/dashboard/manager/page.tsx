"use client"

import { useState, useEffect } from "react"
import { Box, Button, Card, CardContent, CardHeader, Tab, Typography, CircularProgress, Alert } from "@mui/material"
import { Calendar, Clock, DollarSign, Users } from "lucide-react"
import { ManagerDashboardChart } from "@/components/dashboard/manager/dashboard-chart"
import { UpcomingShiftsConnected } from "@/components/dashboard/manager/upcoming-shifts-connected"

export default function ManagerDashboardPage() {
  const [activeTab, setActiveTab] = useState("shifts")
  const [stats, setStats] = useState({
    employees: { count: 0, change: 0 },
    shifts: { count: 0 },
    hours: { count: 0 },
    payroll: { amount: 0 },
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Fetch employees count
        const employeesResponse = await fetch("/api/employees")
        if (!employeesResponse.ok) {
          throw new Error("Failed to fetch employees data")
        }
        const employeesData = await employeesResponse.json()

        // Fetch upcoming shifts
        const today = new Date()
        const nextWeek = new Date(today)
        nextWeek.setDate(today.getDate() + 7)

        const startDate = today.toISOString().split("T")[0]
        const endDate = nextWeek.toISOString().split("T")[0]

        const shiftsResponse = await fetch(`/api/shifts?startDate=${startDate}&endDate=${endDate}`)
        if (!shiftsResponse.ok) {
          throw new Error("Failed to fetch shifts data")
        }
        const shiftsData = await shiftsResponse.json()

        // Calculate total hours and payroll
        let totalHours = 0
        let totalPayroll = 0

        shiftsData.shifts.forEach((shift: any) => {
          if (shift.totalHours) totalHours += shift.totalHours
          if (shift.totalPay) totalPayroll += shift.totalPay
        })

        setStats({
          employees: {
            count: employeesData.employees.length,
            change: 2, // Hardcoded for now, would be calculated from historical data
          },
          shifts: { count: shiftsData.shifts.length },
          hours: { count: Math.round(totalHours) },
          payroll: { amount: Math.round(totalPayroll) },
        })

        setError(null)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError("Failed to load dashboard data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    )
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "100%",
        padding: "16px",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          flexWrap: "wrap",
          gap: "16px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "24px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            borderLeft: "4px solid #03306b",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
            },
            flex: { xs: "1 1 100%", md: "1 1 calc(50% - 8px)", lg: "1 1 calc(25% - 12px)" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: "16px" }}>
            <Typography
              sx={{
                fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#64748b",
              }}
            >
              Total Employees
            </Typography>
            <Users size={20} color="#03306b" />
          </Box>
          <Typography
            sx={{
              fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "#03306b",
              mb: "4px",
            }}
          >
            {stats.employees.count}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
              fontSize: "0.75rem",
              color: "#64748b",
            }}
          >
            +{stats.employees.change} from last month
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "24px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            borderLeft: "4px solid #c61111",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
            },
            flex: { xs: "1 1 100%", md: "1 1 calc(50% - 8px)", lg: "1 1 calc(25% - 12px)" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: "16px" }}>
            <Typography
              sx={{
                fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#64748b",
              }}
            >
              Scheduled Shifts
            </Typography>
            <Calendar size={20} color="#c61111" />
          </Box>
          <Typography
            sx={{
              fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "#03306b",
              mb: "4px",
            }}
          >
            {stats.shifts.count}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
              fontSize: "0.75rem",
              color: "#64748b",
            }}
          >
            Next 7 days
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "24px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            borderLeft: "4px solid #03306b",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
            },
            flex: { xs: "1 1 100%", md: "1 1 calc(50% - 8px)", lg: "1 1 calc(25% - 12px)" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: "16px" }}>
            <Typography
              sx={{
                fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#64748b",
              }}
            >
              Total Hours
            </Typography>
            <Clock size={20} color="#03306b" />
          </Box>
          <Typography
            sx={{
              fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "#03306b",
              mb: "4px",
            }}
          >
            {stats.hours.count}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
              fontSize: "0.75rem",
              color: "#64748b",
            }}
          >
            This month
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "24px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            borderLeft: "4px solid #c61111",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
            },
            flex: { xs: "1 1 100%", md: "1 1 calc(50% - 8px)", lg: "1 1 calc(25% - 12px)" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: "16px" }}>
            <Typography
              sx={{
                fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#64748b",
              }}
            >
              Payroll
            </Typography>
            <DollarSign size={20} color="#c61111" />
          </Box>
          <Typography
            sx={{
              fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "#03306b",
              mb: "4px",
            }}
          >
            ${stats.payroll.amount}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
              fontSize: "0.75rem",
              color: "#64748b",
            }}
          >
            This month
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Box
          sx={{
            display: "flex",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* <Tab
            label="Overview"
            value="overview"
            onClick={() => setActiveTab("overview")}
            sx={{
              padding: "12px 20px",
              backgroundColor: activeTab === "overview" ? "#03306b" : "#fff",
              color: activeTab === "overview" ? "#fff" : "#1e293b",
              fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
              fontWeight: activeTab === "overview" ? 600 : 400,
              "&:hover": {
                backgroundColor: activeTab === "overview" ? "#03306b" : "#f8fafc",
              },
            }}
          /> */}
          <Tab
            label="Upcoming Shifts"
            value="shifts"
            onClick={() => setActiveTab("shifts")}
            sx={{
              padding: "12px 20px",
              backgroundColor: activeTab === "shifts" ? "#c61111" : "#fff",
              color: activeTab === "shifts" ? "#fff" : "#1e293b",
              fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
              fontWeight: activeTab === "shifts" ? 600 : 400,
              "&:hover": {
                backgroundColor: activeTab === "shifts" ? "#c61111" : "#f8fafc",
              },
            }}
          />
          <Tab
            label="Analytics"
            value="analytics"
            onClick={() => setActiveTab("analytics")}
            sx={{
              padding: "12px 20px",
              backgroundColor: activeTab === "analytics" ? "#03306b" : "#fff",
              color: activeTab === "analytics" ? "#fff" : "#1e293b",
              fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
              fontWeight: activeTab === "analytics" ? 600 : 400,
              "&:hover": {
                backgroundColor: activeTab === "analytics" ? "#03306b" : "#f8fafc",
              },
            }}
          />
        </Box>

        {/* <Box sx={{ display: activeTab === "overview" ? "block" : "none" }}>
          <Card sx={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" }}>
            <CardHeader sx={{ borderBottom: "1px solid #e2e8f0", padding: "24px" }}>
              <Typography
                sx={{
                  fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: "#03306b",
                  mb: "4px",
                }}
              >
                Staff Hours Overview
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                  fontSize: "0.875rem",
                  color: "#64748b",
                }}
              >
                Hours worked by department for the current month
              </Typography>
            </CardHeader>
            <CardContent sx={{ padding: "24px" }}>
              <Box sx={{ height: "300px" }}>
                <ManagerDashboardChart />
              </Box>
            </CardContent>
          </Card>
        </Box> */}

        <Box sx={{ display: activeTab === "shifts" ? "block" : "none" }}>
          <Card sx={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" }}>
            <CardHeader sx={{ borderBottom: "1px solid #e2e8f0", padding: "24px" }}>
              <Typography
                sx={{
                  fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: "#03306b",
                  mb: "4px",
                }}
              >
                Upcoming Shifts
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                  fontSize: "0.875rem",
                  color: "#64748b",
                }}
              >
                View and manage upcoming shifts for the next 7 days
              </Typography>
            </CardHeader>
            <CardContent sx={{ padding: "24px" }}>
              <UpcomingShiftsConnected />
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ display: activeTab === "analytics" ? "block" : "none" }}>
          <Card sx={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" }}>
            <CardHeader sx={{ borderBottom: "1px solid #e2e8f0", padding: "24px" }}>
              <Typography
                sx={{
                  fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: "#03306b",
                  mb: "4px",
                }}
              >
                Staff Performance
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                  fontSize: "0.875rem",
                  color: "#64748b",
                }}
              >
                Analyze employee performance and productivity
              </Typography>
            </CardHeader>
            <CardContent sx={{ padding: "24px" }}>
              <Typography
                sx={{
                  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                  fontSize: "0.875rem",
                  color: "#64748b",
                  mb: "16px",
                }}
              >
                Detailed analytics will be available in the next update.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "#fff",
                  color: "#03306b",
                  borderColor: "#03306b",
                  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                  fontWeight: 500,
                  padding: "8px 16px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                  "&:hover": {
                    backgroundColor: "#c61111",
                    color: "#fff",
                    borderColor: "#c61111",
                    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                Request Early Access
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  )
}
