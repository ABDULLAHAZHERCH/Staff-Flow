"use client";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  styled,
} from "@mui/material";
import { Download, Visibility } from "@mui/icons-material";
import { useEffect, useState } from "react";

// Define proper interfaces
interface EmployeeHours {
  name: string;
  hours: number;
  department: string;
  shifts?: number;
}

interface ReportData {
  departmentHours: {
    [department: string]: number;
  };
  employeeHours: EmployeeHours[];
  totalHours: number;
}

interface DepartmentReport {
  department: string;
  totalHours: number;
  employees: number;
  avgHoursPerEmployee: string;
  overtime: number;
}

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  backgroundColor: "white",
}));

const TableContainer = styled(Box)(({ theme }) => ({
  border: "1px solid #e2e8f0",
  borderRadius: "0.375rem",
  overflow: "hidden",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
}));

const TableHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#f8fafc",
  fontWeight: 500,
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  color: "#1a1a1a",
}));

const TableRow = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid #e2e8f0",
  "&:last-child": {
    borderBottom: "none",
  },
}));

const StyledOutlineButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  textTransform: "none",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  transition: "box-shadow 0.2s ease-in-out, color 0.2s ease-in-out",
  borderColor: "#e2e8f0",
  color: "#1a1a1a",
  "&:hover": {
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
    color: "#c61111",
    borderColor: "#c61111",
  },
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const StyledGhostButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  textTransform: "none",
  color: "#1a1a1a",
  "&:hover": {
    backgroundColor: "#f1f5f9",
    color: "#c61111",
  },
  fontSize: "0.875rem",
}));

export function ManagerReportsTable() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [departmentReports, setDepartmentReports] = useState<
    DepartmentReport[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const startDate = startOfMonth.toISOString().split("T")[0];
  const endDate = endOfMonth.toISOString().split("T")[0];

  useEffect(() => {
    const getReports = async () => {
      try {
        const res = await fetch(
          `/api/reports?type=hours&startDate=${startDate}&endDate=${endDate}`
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = (await res.json()) as ReportData;
        console.log(data);
        setReportData(data);

        // Transform data for the table
        if (data.departmentHours) {
          const formattedDepartments: DepartmentReport[] = Object.keys(
            data.departmentHours
          ).map((department) => {
            // Count unique employees per department
            const departmentEmployees = data.employeeHours.filter(
              (emp: EmployeeHours) => emp.department === department
            );
            const employeeCount = departmentEmployees.length;
            const totalHours = data.departmentHours[department];

            // Calculate average hours per employee
            const avgHours =
              employeeCount > 0 ? (totalHours / employeeCount).toFixed(2) : "0";

            // You could calculate overtime here if available in the data
            // For now using 0 as placeholder
            const overtime = 0;

            return {
              department,
              totalHours,
              employees: employeeCount,
              avgHoursPerEmployee: avgHours,
              overtime,
            };
          });
          setDepartmentReports(formattedDepartments);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch reports.");
      } finally {
        setLoading(false);
      }
    };

    getReports();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  // Calculate total shifts - might need adjustment based on your data structure
  const totalShifts =
    reportData?.employeeHours?.reduce(
      (total: number, employee: EmployeeHours) =>
        total + (employee.shifts || 1),
      0
    ) || 0;

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">
          Department Summary ({startDate} to {endDate})
        </Typography>
        <StyledOutlineButton variant="outlined" size="small">
          <Download sx={{ fontSize: 16 }} />
          Export
        </StyledOutlineButton>
      </Box>

      {reportData && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2">
            Total Hours:{" "}
            <strong>{reportData.totalHours?.toFixed(1) || 0}h</strong> | Total
            Employees: <strong>{reportData.employeeHours?.length || 0}</strong>{" "}
            | Total Shifts: <strong>{totalShifts}</strong>
          </Typography>
        </Box>
      )}
    </Container>
  );
}
