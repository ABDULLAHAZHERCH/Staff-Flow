"use client"

import React, { useState } from "react"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Tab,
  Tabs,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material"
import { Save, Refresh } from "@mui/icons-material"

export default function ManagerSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    general: {
      autoApproveShifts: false,
      emailNotifications: true,
      weekendScheduling: true,
      maxConsecutiveDays: 5,
      defaultShiftDuration: 8,
    },
    notifications: {
      shiftRequests: true,
      scheduleChanges: true,
      employeeUpdates: false,
      payrollProcessing: true,
      systemUpdates: true,
    },
    appearance: {
      theme: "light",
      colorScheme: "blue",
      compactView: false,
      showAvatars: true,
      dashboardLayout: "default",
    },
  })

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    setOpenSnackbar(true)
    setIsLoading(false)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  return (
    <Box sx={{ width: "100%", padding: "16px", backgroundColor: "#fff", display: "flex", flexDirection: "column", gap: "24px" }}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
          fontWeight: 600,
          color: "#0d1b2a",
          fontSize: "1.875rem",
          lineHeight: 1.2,
        }}
      >
        Settings
      </Typography>

      <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "4px",
            backgroundColor: "#fff",
            width: { xs: "100%", md: "auto" },
            "& .MuiTab-root": {
              fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
              color: "#1a1a1a",
              "&.Mui-selected": {
                backgroundColor: "#03306b",
                color: "#fff",
              },
            },
          }}
        >
          <Tab value="general" label="General" />
          <Tab value="notifications" label="Notifications" />
          <Tab value="appearance" label="Appearance" />
        </Tabs>

        {activeTab === "general" && (
          <Card sx={{ width: "100%", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)" }}>
            <CardHeader
              title={
                <Typography
                  sx={{
                    fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
                    fontWeight: 600,
                    color: "#0d1b2a",
                    fontSize: "1.25rem",
                  }}
                >
                  General Settings
                </Typography>
              }
              subheader={
                <Typography
                  sx={{
                    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                    color: "#64748b",
                    fontSize: "0.875rem",
                  }}
                >
                  Manage your general application settings
                </Typography>
              }
            />
            <CardContent>
              <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                          color: "#1a1a1a",
                          fontWeight: 500,
                        }}
                      >
                        Auto-approve shift requests
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                          color: "#64748b",
                          fontSize: "0.875rem",
                        }}
                      >
                        Automatically approve shift requests from employees
                      </Typography>
                    </Box>
                    <Switch
                      id="auto-approve-shifts"
                      checked={settings.general.autoApproveShifts}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, autoApproveShifts: e.target.checked },
                        })
                      }
                      sx={{
                        "& .MuiSwitch-track": {
                          backgroundColor: "#e2e8f0",
                        },
                        "& .MuiSwitch-thumb": {
                          backgroundColor: settings.general.autoApproveShifts ? "#03306b" : "#fff",
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                          color: "#1a1a1a",
                          fontWeight: 500,
                        }}
                      >
                        Email notifications
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                          color: "#64748b",
                          fontSize: "0.875rem",
                        }}
                      >
                        Receive email notifications for important events
                      </Typography>
                    </Box>
                    <Switch
                      id="email-notifications"
                      checked={settings.general.emailNotifications}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, emailNotifications: e.target.checked },
                        })
                      }
                      sx={{
                        "& .MuiSwitch-track": {
                          backgroundColor: "#e2e8f0",
                        },
                        "& .MuiSwitch-thumb": {
                          backgroundColor: settings.general.emailNotifications ? "#03306b" : "#fff",
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                          color: "#1a1a1a",
                          fontWeight: 500,
                        }}
                      >
                        Weekend scheduling
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                          color: "#64748b",
                          fontSize: "0.875rem",
                        }}
                      >
                        Allow scheduling employees on weekends
                      </Typography>
                    </Box>
                    <Switch
                      id="weekend-scheduling"
                      checked={settings.general.weekendScheduling}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, weekendScheduling: e.target.checked },
                        })
                      }
                      sx={{
                        "& .MuiSwitch-track": {
                          backgroundColor: "#e2e8f0",
                        },
                        "& .MuiSwitch-thumb": {
                          backgroundColor: settings.general.weekendScheduling ? "#03306b" : "#fff",
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", pt: "8px" }}>
                    <Typography
                      sx={{
                        fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                        color: "#1a1a1a",
                        fontWeight: 500,
                      }}
                    >
                      Maximum consecutive working days
                    </Typography>
                    <Select
                      value={settings.general.maxConsecutiveDays.toString()}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, maxConsecutiveDays: Number.parseInt(e.target.value) },
                        })
                      }
                      sx={{
                        fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                        "&:hover": { boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)" },
                      }}
                    >
                      <MenuItem value="3">3 days</MenuItem>
                      <MenuItem value="4">4 days</MenuItem>
                      <MenuItem value="5">5 days</MenuItem>
                      <MenuItem value="6">6 days</MenuItem>
                      <MenuItem value="7">7 days</MenuItem>
                    </Select>
                    <Typography
                      sx={{
                        fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                        color: "#64748b",
                        fontSize: "0.875rem",
                      }}
                    >
                      Maximum number of consecutive days an employee can work
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", pt: "8px" }}>
                    <Typography
                      sx={{
                        fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                        color: "#1a1a1a",
                        fontWeight: 500,
                      }}
                    >
                      Default shift duration (hours)
                    </Typography>
                    <Select
                      value={settings.general.defaultShiftDuration.toString()}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, defaultShiftDuration: Number.parseInt(e.target.value) },
                        })
                      }
                      sx={{
                        fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                        "&:hover": { boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)" },
                      }}
                    >
                      <MenuItem value="4">4 hours</MenuItem>
                      <MenuItem value="6">6 hours</MenuItem>
                      <MenuItem value="8">8 hours</MenuItem>
                      <MenuItem value="10">10 hours</MenuItem>
                      <MenuItem value="12">12 hours</MenuItem>
                    </Select>
                    <Typography
                      sx={{
                        fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                        color: "#64748b",
                        fontSize: "0.875rem",
                      }}
                    >
                      Default duration for newly created shifts
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant="contained"
                    sx={{
                      backgroundColor: "#03306b",
                      color: "#fff",
                      fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                      fontWeight: 500,
                      padding: "8px 16px",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                      "&:hover": {
                        backgroundColor: "#c61111",
                        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                      },
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    {isLoading ? (
                      <>
                        <Refresh sx={{ fontSize: 16, animation: "spin 1s linear infinite" }} />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save sx={{ fontSize: 16 }} />
                        Save Settings
                      </>
                    )}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === "notifications" && (
          <Card sx={{ width: "100%", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)" }}>
            <CardHeader
              title={
                <Typography
                  sx={{
                    fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
                    fontWeight: 600,
                    color: "#0d1b2a",
                    fontSize: "1.25rem",
                  }}
                >
                  Notification Settings
                </Typography>
              }
              subheader={
                <Typography
                  sx={{
                    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                    color: "#64748b",
                    fontSize: "0.875rem",
                  }}
                >
                  Manage how you receive notifications
                </Typography>
              }
            />
            <CardContent>
              <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                          color: "#1a1a1a",
                          fontWeight: 500,
                        }}
                      >
                        Shift requests
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                          color: "#64748b",
                          fontSize: "0.875rem",
                        }}
                      >
                        Notifications for new shift requests
                      </Typography>
                    </Box>
                    <Switch
                      checked={settings.notifications.shiftRequests}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, shiftRequests: e.target.checked },
                        })
                      }
                      sx={{
                        "& .MuiSwitch-track": {
                          backgroundColor: "#e2e8f0",
                        },
                        "& .MuiSwitch-thumb": {
                          backgroundColor: settings.notifications.shiftRequests ? "#03306b" : "#fff",
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                          color: "#1a1a1a",
                          fontWeight: 500,
                        }}
                      >
                        Schedule changes
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                          color: "#64748b",
                          fontSize: "0.875rem",
                        }}
                      >
                        Notifications for schedule changes
                      </Typography>
                    </Box>
                    <Switch
                      checked={settings.notifications.scheduleChanges}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, scheduleChanges: e.target.checked },
                        })
                      }
                      sx={{
                        "& .MuiSwitch-track": {
                          backgroundColor: "#e2e8f0",
                        },
                        "& .MuiSwitch-thumb": {
                          backgroundColor: settings.notifications.scheduleChanges ? "#03306b" : "#fff",
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                          color: "#1a1a1a",
                          fontWeight: 500,
                        }}
                      >
                        Employee updates
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                          color: "#64748b",
                          fontSize: "0.875rem",
                        }}
                      >
                        Notifications for employee profile updates
                      </Typography>
                    </Box>
                    <Switch
                      checked={settings.notifications.employeeUpdates}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, employeeUpdates: e.target.checked },
                        })
                      }
                      sx={{
                        "& .MuiSwitch-track": {
                          backgroundColor: "#e2e8f0",
                        },
                        "& .MuiSwitch-thumb": {
                          backgroundColor: settings.notifications.employeeUpdates ? "#03306b" : "#fff",
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                          color: "#1a1a1a",
                          fontWeight: 500,
                        }}
                      >
                        Payroll processing
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                          color: "#64748b",
                          fontSize: "0.875rem",
                        }}
                      >
                        Notifications for payroll processing events
                      </Typography>
                    </Box>
                    <Switch
                      checked={settings.notifications.payrollProcessing}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, payrollProcessing: e.target.checked },
                        })
                      }
                      sx={{
                        "& .MuiSwitch-track": {
                          backgroundColor: "#e2e8f0",
                        },
                        "& .MuiSwitch-thumb": {
                          backgroundColor: settings.notifications.payrollProcessing ? "#03306b" : "#fff",
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                          color: "#1a1a1a",
                          fontWeight: 500,
                        }}
                      >
                        System updates
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                          color: "#64748b",
                          fontSize: "0.875rem",
                        }}
                      >
                        Notifications for system updates and maintenance
                      </Typography>
                    </Box>
                    <Switch
                      checked={settings.notifications.systemUpdates}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, systemUpdates: e.target.checked },
                        })
                      }
                      sx={{
                        "& .MuiSwitch-track": {
                          backgroundColor: "#e2e8f0",
                        },
                        "& .MuiSwitch-thumb": {
                          backgroundColor: settings.notifications.systemUpdates ? "#03306b" : "#fff",
                        },
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant="contained"
                    sx={{
                      backgroundColor: "#03306b",
                      color: "#fff",
                      fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                      fontWeight: 500,
                      padding: "8px 16px",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                      "&:hover": {
                        backgroundColor: "#c61111",
                        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                      },
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    {isLoading ? (
                      <>
                        <Refresh sx={{ fontSize: 16, animation: "spin 1s linear infinite" }} />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save sx={{ fontSize: 16 }} />
                        Save Settings
                      </>
                    )}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === "appearance" && (
          <Card sx={{ width: "100%", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)" }}>
            <CardHeader
              title={
                <Typography
                  sx={{
                    fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
                    fontWeight: 600,
                    color: "#0d1b2a",
                    fontSize: "1.25rem",
                  }}
                >
                  Appearance Settings
                </Typography>
              }
              subheader={
                <Typography
                  sx={{
                    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                    color: "#64748b",
                    fontSize: "0.875rem",
                  }}
                >
                  Customize the look and feel of your dashboard
                </Typography>
              }
            />
            <CardContent>
              <form onSubmit={handleSaveSettings} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <FormLabel
                      sx={{
                        fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                        color: "#1a1a1a",
                        fontWeight: 500,
                      }}
                    >
                      Theme
                    </FormLabel>
                    <RadioGroup
                      row
                      value={settings.appearance.theme}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, theme: e.target.value },
                        })
                      }
                      sx={{ gap: "16px" }}
                    >
                      <FormControlLabel value="light" control={<Radio sx={{ color: "#03306b" }} />} label="Light" />
                      <FormControlLabel value="dark" control={<Radio sx={{ color: "#03306b" }} />} label="Dark" />
                      <FormControlLabel value="system" control={<Radio sx={{ color: "#03306b" }} />} label="System" />
                    </RadioGroup>
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <FormLabel
                      sx={{
                        fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                        color: "#1a1a1a",
                        fontWeight: 500,
                      }}
                    >
                      Color Scheme
                    </FormLabel>
                    <RadioGroup
                      row
                      value={settings.appearance.colorScheme}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, colorScheme: e.target.value },
                        })
                      }
                      sx={{ gap: "16px", flexWrap: "wrap" }}
                    >
                      <FormControlLabel value="blue" control={<Radio sx={{ color: "#03306b" }} />} label="Blue" />
                      <FormControlLabel value="red" control={<Radio sx={{ color: "#03306b" }} />} label="Red" />
                      <FormControlLabel value="green" control={<Radio sx={{ color: "#03306b" }} />} label="Green" />
                      <FormControlLabel value="purple" control={<Radio sx={{ color: "#03306b" }} />} label="Purple" />
                    </RadioGroup>
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                          color: "#1a1a1a",
                          fontWeight: 500,
                        }}
                      >
                        Compact View
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                          color: "#64748b",
                          fontSize: "0.875rem",
                        }}
                      >
                        Use a more compact layout for tables and lists
                      </Typography>
                    </Box>
                    <Switch
                      checked={settings.appearance.compactView}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, compactView: e.target.checked },
                        })
                      }
                      sx={{
                        "& .MuiSwitch-track": {
                          backgroundColor: "#e2e8f0",
                        },
                        "& .MuiSwitch-thumb": {
                          backgroundColor: settings.appearance.compactView ? "#03306b" : "#fff",
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                          color: "#1a1a1a",
                          fontWeight: 500,
                        }}
                      >
                        Show Avatars
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                          color: "#64748b",
                          fontSize: "0.875rem",
                        }}
                      >
                        Show user avatars in lists and tables
                      </Typography>
                    </Box>
                    <Switch
                      checked={settings.appearance.showAvatars}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, showAvatars: e.target.checked },
                        })
                      }
                      sx={{
                        "& .MuiSwitch-track": {
                          backgroundColor: "#e2e8f0",
                        },
                        "& .MuiSwitch-thumb": {
                          backgroundColor: settings.appearance.showAvatars ? "#03306b" : "#fff",
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <Typography
                      sx={{
                        fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                        color: "#1a1a1a",
                        fontWeight: 500,
                      }}
                    >
                      Dashboard Layout
                    </Typography>
                    <Select
                      value={settings.appearance.dashboardLayout}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          appearance: { ...settings.appearance, dashboardLayout: e.target.value },
                        })
                      }
                      sx={{
                        fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                        "&:hover": { boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)" },
                      }}
                    >
                      <MenuItem value="default">Default</MenuItem>
                      <MenuItem value="compact">Compact</MenuItem>
                      <MenuItem value="expanded">Expanded</MenuItem>
                      <MenuItem value="grid">Grid</MenuItem>
                    </Select>
                    <Typography
                      sx={{
                        fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                        color: "#64748b",
                        fontSize: "0.875rem",
                      }}
                    >
                      Choose how widgets are arranged on your dashboard
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant="contained"
                    sx={{
                      backgroundColor: "#03306b",
                      color: "#fff",
                      fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                      fontWeight: 500,
                      padding: "8px 16px",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                      "&:hover": {
                        backgroundColor: "#c61111",
                        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
                      },
                      display: "flex",
                      gap: "8px",
                    }}
                  >
                    {isLoading ? (
                      <>
                        <Refresh sx={{ fontSize: 16, animation: "spin 1s linear infinite" }} />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save sx={{ fontSize: 16 }} />
                        Save Settings
                      </>
                    )}
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        )}
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            width: "100%",
            fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
            backgroundColor: "#03306b",
            color: "#fff",
            "& .MuiAlert-message": {
              fontWeight: 500,
            },
            "& .MuiAlert-icon": {
              color: "#fff",
            },
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: "1rem" }}>Settings saved</Typography>
          <Typography sx={{ fontSize: "0.875rem" }}>Your settings have been updated successfully.</Typography>
        </Alert>
      </Snackbar>
    </Box>
  )
}