"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  CircularProgress,
  Tabs,
  Tab,
  Paper,
} from "@mui/material"
import SaveIcon from "@mui/icons-material/Save"

export default function EmployeeSettingsPageMUI() {
  const [isLoading, setIsLoading] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    shiftReminders: true,
    showEarnings: true,
    preferredShiftLength: 8,
    breakReminders: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setSettings({ ...settings, [field]: e.target.checked })
  }

  const handleSaveSettings = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((res) => setTimeout(res, 1000))
    setIsLoading(false)
    alert("Settings saved!")
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Tabs value={tabIndex} onChange={(_, v) => setTabIndex(v)} sx={{ mb: 2 }}>
        <Tab label="General" />
        <Tab label="Notifications" />
        <Tab label="Availability" />
      </Tabs>

      {tabIndex === 0 && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            General Settings
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Manage your general application settings
          </Typography>

          <form onSubmit={handleSaveSettings}>
            <FormGroup sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={(e) => handleChange(e, "emailNotifications")}
                  />
                }
                label="Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch checked={settings.shiftReminders} onChange={(e) => handleChange(e, "shiftReminders")} />
                }
                label="Shift Reminders"
              />
              <FormControlLabel
                control={<Switch checked={settings.showEarnings} onChange={(e) => handleChange(e, "showEarnings")} />}
                label="Show Earnings"
              />
              <FormControlLabel
                control={
                  <Switch checked={settings.breakReminders} onChange={(e) => handleChange(e, "breakReminders")} />
                }
                label="Break Reminders"
              />
            </FormGroup>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="shift-length-label">Preferred shift length</InputLabel>
              <Select
                labelId="shift-length-label"
                value={settings.preferredShiftLength}
                label="Preferred shift length"
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    preferredShiftLength: Number.parseInt(String(e.target.value)),
                  })
                }
              >
                {[4, 6, 8, 10, 12].map((hour) => (
                  <MenuItem key={hour} value={hour}>
                    {hour} hours
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="caption" color="text.secondary">
                Your preferred shift duration (when available)
              </Typography>
            </FormControl>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : <SaveIcon />}
              >
                {isLoading ? "Saving..." : "Save Settings"}
              </Button>
            </Box>
          </form>
        </Paper>
      )}
    </Box>
  )
}
