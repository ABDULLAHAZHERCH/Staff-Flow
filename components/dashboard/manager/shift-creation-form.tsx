"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  styled,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

type Employee = {
  _id: string
  firstName: string
  lastName: string
  email: string
  department: string
  position: string
  status: string
}

const FormContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  backgroundColor: "white",
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)", // From global.css
    transition: "box-shadow 0.2s ease-in-out",
    "&:hover, &.Mui-focused": {
      boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", // From global.css
    },
  },
  "& .MuiInputLabel-root": {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
    color: "#1a1a1a",
  },
}))

const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  textTransform: "none",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)", // From global.css
  transition: "box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out",
  backgroundColor: "#03306b", // Primary color
  color: "white",
  "&:hover": {
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", // From global.css
    backgroundColor: "#022a5b", // Darker primary
  },
  "&.Mui-disabled": {
    backgroundColor: "#e2e8f0",
    color: "#64748b",
  },
}))

const StyledOutlineButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  textTransform: "none",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)", // From global.css
  transition: "box-shadow 0.2s ease-in-out, color 0.2s ease-in-out",
  borderColor: "#e2e8f0",
  color: "#1a1a1a",
  "&:hover": {
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", // From global.css
    color: "#c61111", // Secondary color
    borderColor: "#c61111",
  },
}))

export function ShiftCreationForm({ onSuccess }: { onSuccess?: () => void }) {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingEmployees, setLoadingEmployees] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    employee: "",
    date: new Date(),
    startTime: new Date(new Date().setHours(9, 0, 0, 0)),
    endTime: new Date(new Date().setHours(17, 0, 0, 0)),
    location: "",
    hourlyRate: 15,
    notes: "",
  })

  // Fetch employees when component mounts
  useState(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/employees?status=active")
        if (!response.ok) {
          throw new Error("Failed to fetch employees")
        }
        const data = await response.json()
        setEmployees(data.employees)
      } catch (err) {
        console.error("Error fetching employees:", err)
        setError("Failed to load employees. Please try again later.")
      } finally {
        setLoadingEmployees(false)
      }
    }

    fetchEmployees()
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Combine date and time
      const startDateTime = new Date(formData.date)
      const endDateTime = new Date(formData.date)

      startDateTime.setHours(formData.startTime.getHours(), formData.startTime.getMinutes(), 0, 0)

      endDateTime.setHours(formData.endTime.getHours(), formData.endTime.getMinutes(), 0, 0)

      const response = await fetch("/api/shifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employee: formData.employee,
          startTime: startDateTime.toISOString(),
          endTime: endDateTime.toISOString(),
          location: formData.location,
          hourlyRate: formData.hourlyRate,
          notes: formData.notes,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create shift")
      }

      // Reset form
      setFormData({
        employee: "",
        date: new Date(),
        startTime: new Date(new Date().setHours(9, 0, 0, 0)),
        endTime: new Date(new Date().setHours(17, 0, 0, 0)),
        location: "",
        hourlyRate: 15,
        notes: "",
      })

      // Call success callback
      if (onSuccess) {
        onSuccess()
      }
    } catch (err: any) {
      console.error("Error creating shift:", err)
      setError(err.message || "Failed to create shift. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      employee: "",
      date: new Date(),
      startTime: new Date(new Date().setHours(9, 0, 0, 0)),
      endTime: new Date(new Date().setHours(17, 0, 0, 0)),
      location: "",
      hourlyRate: 15,
      notes: "",
    })
    setError(null)
  }

  if (loadingEmployees) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <FormContainer>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="employee-label">Employee</InputLabel>
            <Select
              labelId="employee-label"
              value={formData.employee}
              onChange={(e) => setFormData({ ...formData, employee: e.target.value as string })}
              label="Employee"
              required
            >
              {employees.map((employee) => (
                <MenuItem key={employee._id} value={employee._id}>
                  {employee.firstName} {employee.lastName} - {employee.department}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                    color: "#1a1a1a",
                  }}
                >
                  Date
                </Typography>
                <DatePicker
                  value={formData.date}
                  onChange={(newValue) => newValue && setFormData({ ...formData, date: newValue })}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                    },
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                    color: "#1a1a1a",
                  }}
                >
                  Start Time
                </Typography>
                <TimePicker
                  value={formData.startTime}
                  onChange={(newValue) => newValue && setFormData({ ...formData, startTime: newValue })}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                    },
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                    color: "#1a1a1a",
                  }}
                >
                  End Time
                </Typography>
                <TimePicker
                  value={formData.endTime}
                  onChange={(newValue) => newValue && setFormData({ ...formData, endTime: newValue })}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                    },
                  }}
                />
              </Box>
            </Box>
          </LocalizationProvider>

          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                  color: "#1a1a1a",
                }}
              >
                Location
              </Typography>
              <StyledTextField
                fullWidth
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Main Store"
                required
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                  color: "#1a1a1a",
                }}
              >
                Hourly Rate ($)
              </Typography>
              <StyledTextField
                fullWidth
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                inputProps={{ min: 1, step: 0.01 }}
                required
              />
            </Box>
          </Box>

          <Box>
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                color: "#1a1a1a",
              }}
            >
              Notes (Optional)
            </Typography>
            <StyledTextField
              fullWidth
              multiline
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional information about this shift"
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <StyledOutlineButton type="button" onClick={handleReset}>
              Reset
            </StyledOutlineButton>
            <StyledButton type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Create Shift"}
            </StyledButton>
          </Box>
        </Box>
      </form>
    </FormContainer>
  )
}
