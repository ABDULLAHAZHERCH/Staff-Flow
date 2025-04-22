"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Box, Typography, Card, CardHeader, CardContent, Alert, styled } from "@mui/material"
import { ShiftCreationForm } from "@/components/dashboard/manager/shift-creation-form"

const PageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  backgroundColor: "white",
  padding: theme.spacing(2),
}))

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)", // From global.css
  "&:hover": {
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", // From global.css
  },
  borderTop: "4px solid #03306b", // Primary color
}))

export default function CreateShiftPage() {
  const router = useRouter()
  const [success, setSuccess] = useState(false)

  const handleSuccess = () => {
    setSuccess(true)
    setTimeout(() => {
      router.push("/dashboard/manager")
    }, 2000)
  }

  return (
    <PageContainer>
      <Typography
        variant="h4"
        sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: "#0d1b2a" }}
      >
        Create New Shift
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Shift created successfully! Redirecting to dashboard...
        </Alert>
      )}

      <StyledCard>
        <CardHeader
          title={
            <Typography
              variant="h6"
              sx={{ fontFamily: '"Poppins", "Inter", "Arial", sans-serif', fontWeight: 600, color: "#0d1b2a" }}
            >
              Shift Details
            </Typography>
          }
          subheader={
            <Typography variant="body2" sx={{ color: "#64748b" }}>
              Fill in the details to create a new shift
            </Typography>
          }
        />
        <CardContent>
          <ShiftCreationForm onSuccess={handleSuccess} />
        </CardContent>
      </StyledCard>
    </PageContainer>
  )
}
