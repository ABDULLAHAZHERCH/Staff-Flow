"use client"

import type React from "react"
import { useState } from "react"
import { Camera, Loader2, Save } from "lucide-react"
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  Button,
  Avatar,
  IconButton,
  TextareaAutosize,
  Snackbar,
  Alert,
} from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: "100%",
  minHeight: 100,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  "&:focus": {
    borderColor: theme.palette.primary.main,
    outline: "none",
  },
}))

export default function ManagerProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setOpenSnackbar(true)
    setIsLoading(false)
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false)
  }

  return (
    <Box sx={{ width: "100%", py: 3 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
        My Profile
      </Typography>

      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered sx={{ mb: 2 }}>
        <Tab label="General" value="general" />
        <Tab label="Security" value="security" />
        <Tab label="Notifications" value="notifications" />
      </Tabs>

      {activeTab === "general" && (
        <Card>
          <CardHeader
            title={<Typography variant="h6">Profile Information</Typography>}
            subheader={
              <Typography variant="body2" color="text.secondary">
                Update your personal information
              </Typography>
            }
          />
          <CardContent>
            <form onSubmit={handleSaveProfile}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "center", sm: "flex-start" },
                  gap: 3,
                  mb: 3,
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Avatar sx={{ width: 96, height: 96 }}>
                    <img src="/placeholder.svg?height=96&width=96" alt="Manager" />
                    <Typography variant="h6">JM</Typography>
                  </Avatar>
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      bgcolor: "white",
                      borderRadius: "50%",
                      border: `1px solid ${(theme: { palette: { divider: any } }) => theme.palette.divider}`,
                    }}
                  >
                    <Camera style={{ width: 16, height: 16 }} />
                  </IconButton>
                </Box>
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
                    <TextField label="First Name" defaultValue="John" fullWidth sx={{ flex: 1 }} />
                    <TextField label="Last Name" defaultValue="Manager" fullWidth sx={{ flex: 1 }} />
                  </Box>
                  <TextField label="Email" type="email" defaultValue="manager@staffflow.com" fullWidth />
                  <TextField label="Phone Number" defaultValue="+1 (555) 123-4567" fullWidth />
                  <TextField label="Position" defaultValue="General Manager" fullWidth />
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Bio
                    </Typography>
                    <StyledTextarea defaultValue="Experienced manager with over 10 years in the industry. Passionate about team development and operational excellence." />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  variant="contained"
                  startIcon={
                    isLoading ? (
                      <Loader2 className="animate-spin" style={{ width: 16, height: 16 }} />
                    ) : (
                      <Save style={{ width: 16, height: 16 }} />
                    )
                  }
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      )}

      {activeTab === "security" && (
        <Card>
          <CardHeader
            title={<Typography variant="h6">Security Settings</Typography>}
            subheader={
              <Typography variant="body2" color="text.secondary">
                Manage your password and security preferences
              </Typography>
            }
          />
          <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField label="Current Password" type="password" fullWidth />
            <TextField label="New Password" type="password" fullWidth />
            <TextField label="Confirm New Password" type="password" fullWidth />
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button variant="contained">Update Password</Button>
          </CardActions>
        </Card>
      )}

      {activeTab === "notifications" && (
        <Card>
          <CardHeader
            title={<Typography variant="h6">Notification Preferences</Typography>}
            subheader={
              <Typography variant="body2" color="text.secondary">
                Manage how you receive notifications
              </Typography>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Notification preferences will be available in the next update.
            </Typography>
          </CardContent>
        </Card>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  )
}
