
"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Box, Button, Checkbox, TextField, Typography, IconButton, Divider, FormControlLabel } from "@mui/material"
import { Visibility, VisibilityOff, Lock, Mail } from "@mui/icons-material"

export function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      if (email.includes("manager")) {
        router.push("/dashboard/manager")
      } else {
        router.push("/dashboard/employee")
      }
    }, 1000)
  }

  return (
    <Box
      sx={{
        bgcolor: "white",
        p: 4,
        borderRadius: "0.5rem",
        border: "1px solid #e2e8f0",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        maxWidth: 400,
        mx: "auto",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 700,
            color: "#03306b",
            mb: 1,
          }}
        >
          Welcome Back
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontSize: "0.875rem",
            color: "#4a5568",
          }}
        >
          Sign in to your StaffFlow account
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <Typography
            component="label"
            htmlFor="email"
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#333",
              mb: 1,
              display: "block",
            }}
          >
            Email Address
          </Typography>
          <TextField
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            fullWidth
            InputProps={{
              startAdornment: (
                <Mail sx={{ color: "#737373", mr: 1, fontSize: 20 }} />
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.375rem",
                "& fieldset": { borderColor: "#e2e8f0" },
                "&:hover fieldset": { borderColor: "#03306b" },
                "&.Mui-focused fieldset": { borderColor: "#03306b" },
              },
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography
            component="label"
            htmlFor="password"
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#333",
              mb: 1,
              display: "block",
            }}
          >
            Password
          </Typography>
          <TextField
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            fullWidth
            InputProps={{
              startAdornment: (
                <Lock sx={{ color: "#737373", mr: 1, fontSize: 20 }} />
              ),
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "#737373", fontSize: 20 }} />
                  ) : (
                    <Visibility sx={{ color: "#737373", fontSize: 20 }} />
                  )}
                </IconButton>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.375rem",
                "& fieldset": { borderColor: "#e2e8f0" },
                "&:hover fieldset": { borderColor: "#03306b" },
                "&.Mui-focused fieldset": { borderColor: "#03306b" },
              },
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                id="remember-me"
                name="remember-me"
                sx={{
                  color: "#e2e8f0",
                  "&.Mui-checked": { color: "#03306b" },
                }}
              />
            }
            label={
              <Typography
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "0.875rem",
                  color: "#333",
                }}
              >
                Remember me
              </Typography>
            }
          />
          <Typography
            component="a"
            href="#"
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.875rem",
              color: "#03306b",
              textDecoration: "none",
              "&:hover": { color: "#022555" },
            }}
          >
            Forgot your password?
          </Typography>
        </Box>

        <Button
          type="submit"
          disabled={loading}
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#03306b",
            color: "white",
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            py: 1.25,
            borderRadius: "0.375rem",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#022555",
              boxShadow: "0 2px 4px rgba(3, 48, 107, 0.2)",
              transform: "translateY(-2px)",
            },
            "&:disabled": {
              bgcolor: "#737373",
              color: "white",
            },
          }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.875rem",
              color: "#4a5568",
            }}
          >
            Don&apos;t have an account?{" "}
            <Link
              href="#"
              style={{
                color: "#c61111",
                fontWeight: 500,
                textDecoration: "none",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#a50e0e")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#c61111")}
            >
              Contact your administrator
            </Link>
          </Typography>
        </Box>
      </form>

      <Box sx={{ mt: 4 }}>
        <Divider sx={{ my: 2, bgcolor: "#e2e8f0" }}>
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "0.875rem",
              color: "#737373",
              px: 2,
            }}
          >
            Or continue with
          </Typography>
        </Divider>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              borderColor: "#e2e8f0",
              color: "#333",
              fontFamily: '"Inter", sans-serif',
              fontWeight: 500,
              textTransform: "none",
              borderRadius: "0.375rem",
              "&:hover": {
                bgcolor: "#f8fafc",
                borderColor: "#e2e8f0",
              },
            }}
          >
            Google
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              borderColor: "#e2e8f0",
              color: "#333",
              fontFamily: '"Inter", sans-serif',
              fontWeight: 500,
              textTransform: "none",
              borderRadius: "0.375rem",
              "&:hover": {
                bgcolor: "#f8fafc",
                borderColor: "#e2e8f0",
              },
            }}
          >
            Microsoft
          </Button>
        </Box>
      </Box>
    </Box>
  )
}