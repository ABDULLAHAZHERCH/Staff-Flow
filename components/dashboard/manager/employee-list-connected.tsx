"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  Typography,
  Avatar,
  Chip,
  Button,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem as SelectMenuItem,
  styled,
  Alert,
  CircularProgress,
} from "@mui/material"
import { Edit, Delete, MoreHoriz, ManageAccounts } from "@mui/icons-material"

type Employee = {
  _id: string
  firstName: string
  lastName: string
  email: string
  department: string
  position: string
  status: "active" | "inactive"
}

const TableContainer = styled(Box)(({ theme }) => ({
  border: "1px solid #e2e8f0",
  borderRadius: "0.375rem",
  overflowX: "auto",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)", // From global.css
  backgroundColor: "white",
}))

const TableHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#f8fafc", // Muted/30 equivalent
  fontWeight: 500,
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  color: "#1a1a1a",
}))

const TableRow = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid #e2e8f0",
  "&:last-child": {
    borderBottom: "none",
  },
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "#f1f5f9", // Muted/10 equivalent
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

const StyledIconButton = styled(Button)(({ theme }) => ({
  minWidth: "auto",
  padding: theme.spacing(1),
  color: "#1a1a1a",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)", // From global.css
  "&:hover": {
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", // From global.css
    color: "#c61111", // Secondary color
  },
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

const StyledSelect = styled(Select)(({ theme }) => ({
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)", // From global.css
  transition: "box-shadow 0.2s ease-in-out",
  "&:hover, &.Mui-focused": {
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", // From global.css
  },
  "& .MuiSelect-select": {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  },
}))

const StyledChip = styled(Chip)(({ theme }) => ({
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  textTransform: "capitalize",
}))

export function EmployeeListConnected({ filterStatus }: { filterStatus?: "active" | "inactive" }) {
  const router = useRouter()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null)
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true)
        const queryParams = filterStatus ? `?status=${filterStatus}` : ""
        const response = await fetch(`/api/employees${queryParams}`)

        if (!response.ok) {
          throw new Error("Failed to fetch employees")
        }

        const data = await response.json()
        setEmployees(data.employees)
        setError(null)
      } catch (err) {
        console.error("Error fetching employees:", err)
        setError("Failed to load employees. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [filterStatus])

  const handleEditEmployee = (employee: Employee) => {
    setCurrentEmployee({ ...employee })
    setIsEditDialogOpen(true)
    setAnchorEl(null)
  }

  const handleSaveEdit = async () => {
    if (!currentEmployee) return

    try {
      const response = await fetch(`/api/employees/${currentEmployee._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: currentEmployee.firstName,
          lastName: currentEmployee.lastName,
          email: currentEmployee.email,
          department: currentEmployee.department,
          position: currentEmployee.position,
          status: currentEmployee.status,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update employee")
      }

      const data = await response.json()

      // Update the employee in the state
      setEmployees(employees.map((emp) => (emp._id === currentEmployee._id ? data.employee : emp)))

      setIsEditDialogOpen(false)
      setAlert({
        type: "success",
        message: `${currentEmployee.firstName} ${currentEmployee.lastName}'s information has been updated.`,
      })
      setTimeout(() => setAlert(null), 3000)
    } catch (err) {
      console.error("Error updating employee:", err)
      setAlert({
        type: "error",
        message: "Failed to update employee. Please try again.",
      })
      setTimeout(() => setAlert(null), 3000)
    }
  }

  const handleManageShifts = (id: string) => {
    router.push(`/dashboard/manager/employees/shifts/${id}`)
    setAnchorEl(null)
  }

  const confirmDeleteEmployee = async () => {
    if (!employeeToDelete) return

    try {
      const response = await fetch(`/api/employees/${employeeToDelete._id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete employee")
      }

      // Remove the employee from the state
      setEmployees(employees.filter((emp) => emp._id !== employeeToDelete._id))

      setIsDeleteDialogOpen(false)
      setAlert({
        type: "success",
        message: `${employeeToDelete.firstName} ${employeeToDelete.lastName} has been removed from the system.`,
      })
      setTimeout(() => setAlert(null), 3000)
    } catch (err) {
      console.error("Error deleting employee:", err)
      setAlert({
        type: "error",
        message: "Failed to delete employee. Please try again.",
      })
      setTimeout(() => setAlert(null), 3000)
    }
  }

  const handleDeleteEmployee = (employee: Employee) => {
    setEmployeeToDelete(employee)
    setIsDeleteDialogOpen(true)
    setAnchorEl(null)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, employeeId: string) => {
    setAnchorEl(event.currentTarget)
    setSelectedEmployeeId(employeeId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedEmployeeId(null)
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

  return (
    <Box sx={{ width: "100%" }}>
      {alert && (
        <Alert
          severity={alert.type}
          sx={{ mb: 2, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}
        >
          <Typography variant="body2">{alert.message}</Typography>
        </Alert>
      )}

      {employees.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 4, color: "#4a5568" }}>
          <Typography sx={{ fontFamily: '"Inter", sans-serif', fontSize: "1rem" }}>No employees found.</Typography>
        </Box>
      ) : (
        <TableContainer>
          <TableHeader>
            <Box sx={{ display: "flex", gap: 4 }}>
              <Box sx={{ flex: 1.5 }}>Name</Box>
              <Box sx={{ flex: 1 }}>Department</Box>
              <Box sx={{ flex: 1 }}>Position</Box>
              <Box sx={{ flex: 1.5 }}>Email</Box>
              <Box sx={{ flex: 1 }}>Status</Box>
              <Box sx={{ flex: 1, textAlign: "right" }}>Actions</Box>
            </Box>
          </TableHeader>
          {employees.map((employee) => (
            <TableRow key={employee._id}>
              <Box sx={{ flex: 1.5, display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ width: 32, height: 32, boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)" }}>
                  {employee.firstName.charAt(0) + employee.lastName.charAt(0)}
                </Avatar>
                <Typography
                  sx={{ fontWeight: 500, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}
                >
                  {employee.firstName} {employee.lastName}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                  {employee.department}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}>
                  {employee.position}
                </Typography>
              </Box>
              <Box sx={{ flex: 1.5, overflow: "hidden", textOverflow: "ellipsis" }}>
                <Typography
                  sx={{
                    fontSize: "0.875rem",
                    color: "#64748b",
                    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                  }}
                >
                  {employee.email}
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <StyledChip
                  label={employee.status}
                  sx={{
                    backgroundColor: employee.status === "active" ? "#16a34a" : "#e2e8f0",
                    color: employee.status === "active" ? "white" : "#1a1a1a",
                  }}
                />
              </Box>
              <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                <StyledIconButton onClick={(e) => handleMenuOpen(e, employee._id)}>
                  <MoreHoriz sx={{ fontSize: 16 }} />
                </StyledIconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedEmployeeId === employee._id}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", // From global.css
                      fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                    },
                  }}
                >
                  <Typography sx={{ px: 2, py: 1, fontWeight: 500, color: "#1a1a1a" }}>Actions</Typography>
                  <Divider />
                  <MenuItem onClick={() => handleEditEmployee(employee)}>
                    <Edit sx={{ fontSize: 16, mr: 1 }} />
                    Edit
                  </MenuItem>
                  <MenuItem onClick={() => handleManageShifts(employee._id)}>
                    <ManageAccounts sx={{ fontSize: 16, mr: 1 }} />
                    Manage Shifts
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => handleDeleteEmployee(employee)} sx={{ color: "#dc2626" }}>
                    <Delete sx={{ fontSize: 16, mr: 1 }} />
                    Delete
                  </MenuItem>
                </Menu>
              </Box>
            </TableRow>
          ))}
        </TableContainer>
      )}

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <DialogTitle sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', color: "#0d1b2a" }}>
          Edit Employee
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{ mb: 3, color: "#64748b", fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}
          >
            Make changes to the employee information below.
          </Typography>
          {currentEmployee && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 1,
                      fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                      color: "#1a1a1a",
                    }}
                  >
                    First Name
                  </Typography>
                  <StyledTextField
                    fullWidth
                    value={currentEmployee.firstName}
                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, firstName: e.target.value })}
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
                    Last Name
                  </Typography>
                  <StyledTextField
                    fullWidth
                    value={currentEmployee.lastName}
                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, lastName: e.target.value })}
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
                  Email
                </Typography>
                <StyledTextField
                  fullWidth
                  value={currentEmployee.email}
                  onChange={(e) => setCurrentEmployee({ ...currentEmployee, email: e.target.value })}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 1,
                      fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                      color: "#1a1a1a",
                    }}
                  >
                    Department
                  </Typography>
                  <StyledSelect
                    fullWidth
                    value={currentEmployee.department}
                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, department: e.target.value as string })}
                  >
                    {["Sales", "Support", "Kitchen", "Delivery", "Admin", "Cleaning"].map((dept) => (
                      <SelectMenuItem key={dept} value={dept}>
                        {dept}
                      </SelectMenuItem>
                    ))}
                  </StyledSelect>
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
                    Position
                  </Typography>
                  <StyledTextField
                    fullWidth
                    value={currentEmployee.position}
                    onChange={(e) => setCurrentEmployee({ ...currentEmployee, position: e.target.value })}
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
                  Status
                </Typography>
                <StyledSelect
                  fullWidth
                  value={currentEmployee.status}
                  onChange={(e) =>
                    setCurrentEmployee({ ...currentEmployee, status: e.target.value as "active" | "inactive" })
                  }
                >
                  <SelectMenuItem value="active">Active</SelectMenuItem>
                  <SelectMenuItem value="inactive">Inactive</SelectMenuItem>
                </StyledSelect>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <StyledOutlineButton onClick={() => setIsEditDialogOpen(false)}>Cancel</StyledOutlineButton>
          <StyledButton onClick={handleSaveEdit}>Save changes</StyledButton>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', color: "#0d1b2a" }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{ mb: 3, color: "#64748b", fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}
          >
            Are you sure you want to delete this employee? This action cannot be undone.
          </Typography>
          {employeeToDelete && (
            <Box sx={{ py: 2 }}>
              <Typography
                sx={{ fontWeight: 500, fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif' }}
              >
                {employeeToDelete.firstName} {employeeToDelete.lastName}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  color: "#64748b",
                  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                }}
              >
                {employeeToDelete.email}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  color: "#64748b",
                  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                }}
              >
                {employeeToDelete.department} - {employeeToDelete.position}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <StyledOutlineButton onClick={() => setIsDeleteDialogOpen(false)}>Cancel</StyledOutlineButton>
          <StyledButton
            sx={{ backgroundColor: "#dc2626", "&:hover": { backgroundColor: "#b91c1c" } }}
            onClick={confirmDeleteEmployee}
          >
            Delete
          </StyledButton>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
