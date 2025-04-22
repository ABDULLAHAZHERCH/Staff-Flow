"use client";
import { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { Box, styled, CircularProgress, Alert } from "@mui/material";

const ChartContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: "white",
  borderRadius: "0.375rem",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)", // From global.css
  "&:hover": {
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", // From global.css
  },
}));

export function ManagerReportsChartConnected() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);

        // Get the current month's date range
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        );

        const startDate = startOfMonth.toISOString().split("T")[0];
        const endDate = endOfMonth.toISOString().split("T")[0];

        const response = await fetch(
          `/api/reports?type=hours&startDate=${startDate}&endDate=${endDate}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch report data");
        }

        const reportData = await response.json();

        // Transform the data for the chart
        const chartData = Object.entries(reportData.report.departmentHours).map(
          ([name, hours]) => ({
            name,
            hours: Number(hours),
          })
        );

        setData(chartData);
        setError(null);
      } catch (err) {
        console.error("Error fetching report data:", err);
        setError("Failed to load report data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        sx={{ height: "100%", display: "flex", alignItems: "center" }}
      >
        {error}
      </Alert>
    );
  }

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
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
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e2e8f0",
              borderRadius: "0.375rem",
              fontFamily:
                '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
            }}
            labelStyle={{ color: "#03306b", fontWeight: 600 }}
          />
          <Legend />
          <Bar
            dataKey="hours"
            name="Hours"
            fill="#03306b"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
