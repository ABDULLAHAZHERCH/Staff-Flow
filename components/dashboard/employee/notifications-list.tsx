
"use client"

import { useState } from "react"
import { Box, Typography, Avatar, Chip, IconButton, Button } from "@mui/material"
import { CalendarToday, AccessTime, Message, Star, Delete } from "@mui/icons-material"

// Types
type Notification = {
  id: number
  title: string
  message: string
  time: string
  date: string
  read: boolean
  important: boolean
  type: "shift_change" | "message" | "system" | "schedule"
  user?: {
    name: string
    avatar: string
    initials: string
  }
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "Schedule Update",
    message: "Your shift on Monday, April 20 has been confirmed.",
    time: "10:30 AM",
    date: "2025-04-19",
    read: false,
    important: true,
    type: "schedule",
    user: {
      name: "John Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JM",
    },
  },
  {
    id: 2,
    title: "New Message",
    message: "John Manager sent you a message about your upcoming shift.",
    time: "Yesterday",
    date: "2025-04-18",
    read: false,
    important: false,
    type: "message",
    user: {
      name: "John Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JM",
    },
  },
  {
    id: 3,
    title: "Payroll Processed",
    message: "Your payroll for the period ending April 15 has been processed.",
    time: "2 days ago",
    date: "2025-04-17",
    read: true,
    important: true,
    type: "system",
  },
  {
    id: 4,
    title: "Shift Change",
    message: "Your shift request for April 22 has been approved.",
    time: "3 days ago",
    date: "2025-04-16",
    read: true,
    important: false,
    type: "shift_change",
    user: {
      name: "John Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JM",
    },
  },
  {
    id: 5,
    title: "New Schedule",
    message: "The schedule for April 20-26 has been published.",
    time: "1 week ago",
    date: "2025-04-12",
    read: true,
    important: false,
    type: "schedule",
  },
]

export function EmployeeNotificationsList({ filter = "all" }: { filter?: "all" | "unread" | "important" }) {
  const [notificationState, setNotificationState] = useState(notifications)

  const filteredNotifications = notificationState.filter((notification) => {
    if (filter === "unread") return !notification.read
    if (filter === "important") return notification.important
    return true
  })

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "shift_change":
      case "schedule":
        return <CalendarToday sx={{ color: "#3b82f6", fontSize: 20 }} />
      case "message":
        return <Message sx={{ color: "#22c55e", fontSize: 20 }} />
      case "system":
        return <AccessTime sx={{ color: "#f97316", fontSize: 20 }} />
      default:
        return <Message sx={{ color: "#4a5568", fontSize: 20 }} />
    }
  }

  const toggleImportant = (id: number) => {
    setNotificationState(
      notificationState.map((notification) =>
        notification.id === id ? { ...notification, important: !notification.important } : notification,
      ),
    )
  }

  const deleteNotification = (id: number) => {
    setNotificationState(notificationState.filter((notification) => notification.id !== id))
  }

  const markAsRead = (id: number) => {
    setNotificationState(
      notificationState.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  return (
    <Box>
      {filteredNotifications.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 4, color: "#4a5568" }}>
          <Typography sx={{ fontFamily: '"Inter", sans-serif', fontSize: "1rem" }}>
            No notifications found
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {filteredNotifications.map((notification) => (
            <Box
              key={notification.id}
              sx={{
                bgcolor: notification.read ? "white" : "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "0.5rem",
                p: 2,
                transition: "all 0.2s ease",
                "&:hover": {
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                },
                cursor: "pointer",
              }}
              onClick={() => markAsRead(notification.id)}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box>
                  {notification.user ? (
                    <Avatar sx={{ width: 40, height: 40 }}>
                      {notification.user.initials}
                    </Avatar>
                  ) : (
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: "#f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {getNotificationIcon(notification.type)}
                    </Box>
                  )}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", sans-serif',
                          fontWeight: 500,
                          color: "#333",
                          fontSize: "1rem",
                        }}
                      >
                        {notification.title}
                      </Typography>
                      {!notification.read && (
                        <Chip
                          label="New"
                          size="small"
                          sx={{
                            bgcolor: "#03306b",
                            color: "white",
                            fontFamily: '"Inter", sans-serif',
                            fontSize: "0.75rem",
                          }}
                        />
                      )}
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleImportant(notification.id)
                        }}
                        sx={{
                          color: notification.important ? "#f59e0b" : "#737373",
                          "&:hover": { color: "#333" },
                        }}
                      >
                        <Star sx={{ fontSize: 16 }} />
                      </IconButton>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(notification.id)
                        }}
                        sx={{
                          color: "#737373",
                          "&:hover": { color: "#333" },
                        }}
                      >
                        <Delete sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: "0.875rem",
                      color: "#4a5568",
                      mb: 2,
                      lineHeight: 1.5,
                    }}
                  >
                    {notification.message}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography
                      sx={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: "0.75rem",
                        color: "#737373",
                      }}
                    >
                      {notification.time}
                    </Typography>
                    {notification.type === "message" && (
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          bgcolor: "#03306b",
                          color: "white",
                          fontFamily: '"Inter", sans-serif',
                          fontWeight: 500,
                          textTransform: "none",
                          borderRadius: "0.375rem",
                          "&:hover": {
                            bgcolor: "#022555",
                            boxShadow: "0 2px 4px rgba(3, 48, 107, 0.2)",
                          },
                        }}
                        startIcon={<Message sx={{ fontSize: 16 }} />}
                      >
                        Reply
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}
