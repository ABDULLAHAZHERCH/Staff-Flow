"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  CalendarToday,
  AccessTime,
  Message,
  Delete,
} from "@mui/icons-material";
import { formatDistanceToNow } from "date-fns";

type Notification = {
  _id: string;
  recipient: string;
  sender?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export function EmployeeNotificationsListConnected({
  filter = "all",
}: {
  filter?: "all" | "unread";
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const queryParams = filter === "unread" ? "?read=false" : "";
        const response = await fetch(`/api/notifications${queryParams}`);

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await response.json();
        setNotifications(data.notifications);
        setError(null);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to load notifications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [filter]);

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: true }),
      });

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      // Update the notification in the state
      setNotifications(
        notifications.map((notification) =>
          notification._id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete notification");
      }

      // Remove the notification from the state
      setNotifications(
        notifications.filter((notification) => notification._id !== id)
      );
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "shift_assigned":
      case "shift_updated":
      case "shift_cancelled":
        return <CalendarToday sx={{ color: "#3b82f6", fontSize: 20 }} />;
      case "message":
        return <Message sx={{ color: "#22c55e", fontSize: 20 }} />;
      case "payroll_processed":
        return <AccessTime sx={{ color: "#f97316", fontSize: 20 }} />;
      default:
        return <Message sx={{ color: "#4a5568", fontSize: 20 }} />;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (notifications.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4, color: "#4a5568" }}>
        <Typography
          sx={{ fontFamily: '"Inter", sans-serif', fontSize: "1rem" }}
        >
          No notifications found
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {notifications.map((notification) => (
          <Box
            key={notification._id}
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
            onClick={() => markAsRead(notification._id)}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box>
                {notification.sender ? (
                  <Avatar sx={{ width: 40, height: 40 }}>
                    {notification.sender.firstName.charAt(0) +
                      notification.sender.lastName.charAt(0)}
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
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
                        e.stopPropagation();
                        deleteNotification(notification._id);
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: "0.75rem",
                      color: "#737373",
                    }}
                  >
                    {formatTime(notification.createdAt)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
