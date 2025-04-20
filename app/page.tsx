
"use client"

import React from "react"
import { Box, Button, Card, CardContent, Typography, Container } from "@mui/material"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, Clock, LineChart, Users, CheckCircle, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", bgcolor: "white" }}>
      {/* Header */}
      <Box
        component="header"
        sx={{
          bgcolor: "white",
          borderBottom: "1px solid #e2e8f0",
          py: 2,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 3, sm: 4 },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Image src="/logo.png" alt="StaffFlow Logo" width={40} height={40} />
            <Typography
              sx={{
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 700,
                fontSize: "1.5rem",
                color: "#333",
              }}
            >
              StaffFlow
            </Typography>
          </Box>
          <Box
            component="nav"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, md: 4 },
            }}
          >
            <Typography
              component="a"
              href="#features"
              sx={{
                color: "#333",
                fontWeight: 500,
                fontFamily: '"Inter", sans-serif',
                textDecoration: "none",
                transition: "color 0.2s ease",
                "&:hover": { color: "#03306b" },
              }}
            >
              Features
            </Typography>
            <Typography
              component="a"
              href="#testimonials"
              sx={{
                color: "#333",
                fontWeight: 500,
                fontFamily: '"Inter", sans-serif',
                textDecoration: "none",
                transition: "color 0.2s ease",
                "&:hover": { color: "#03306b" },
              }}
            >
              Testimonials
            </Typography>
            <Button
              component={Link}
              href="/auth/sign-in"
              variant="contained"
              sx={{
                bgcolor: "#03306b",
                color: "white",
                fontFamily: '"Inter", sans-serif',
                fontWeight: 600,
                px: 2.5,
                py: 1.25,
                borderRadius: "0.375rem",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#022555",
                  boxShadow: "0 2px 4px rgba(3, 48, 107, 0.2)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box component="section" sx={{ py: 5, bgcolor: "white" }}>
        <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 4 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 4,
              justifyContent: "space-between",
            }}
          >
            {/* Text Content */}
            <Box
              sx={{
                flex: 1,
                textAlign: { xs: "center", md: "left" },
                maxWidth: { xs: "100%", md: 600 },
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontFamily: '"Poppins", sans-serif',
                  fontSize: { xs: "2.25rem", md: "3rem" },
                  fontWeight: 800,
                  color: "#333",
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                AI-Powered Employee Scheduling & Management
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: "1.25rem",
                  color: "#4a5568",
                  mb: 5,
                  lineHeight: 1.6,
                }}
              >
                StaffFlow revolutionizes workforce management with intelligent scheduling, real-time insights, and seamless
                payroll tracking for businesses of all sizes.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: { xs: "center", md: "flex-start" },
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Button
                  component="a"
                  href="/auth/sign-in"
                  variant="contained"
                  sx={{
                    bgcolor: "#03306b",
                    color: "white",
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 600,
                    px: 2.5,
                    py: 1.25,
                    borderRadius: "0.375rem",
                    textTransform: "none",
                    display: "flex",
                    gap: 1,
                    "&:hover": {
                      bgcolor: "#022555",
                      boxShadow: "0 2px 4px rgba(3, 48, 107, 0.2)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Get Started Free
                  <ArrowRight size={16} />
                </Button>
                <Button
                  component="a"
                  href="#contact"
                  variant="contained"
                  sx={{
                    bgcolor: "#c61111",
                    color: "white",
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 600,
                    px: 2.5,
                    py: 1.25,
                    borderRadius: "0.375rem",
                    textTransform: "none",
                    display: "flex",
                    gap: 1,
                    "&:hover": {
                      bgcolor: "#a50e0e",
                      boxShadow: "0 2px 4px rgba(198, 17, 17, 0.2)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Book a Demo
                  <ArrowRight size={16} />
                </Button>
              </Box>
            </Box>
            {/* Image */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: { xs: 300, md: 400 },
                height: { xs: 300, md: 400 },
                borderRadius: "0.5rem",
                overflow: "hidden",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                flexShrink: 0,
              }}
            >
              <Image
                src="/mainpage.png"
                alt="StaffFlow Dashboard"
                fill
                style={{ objectFit: "contain" }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        component="section"
        id="features"
        sx={{ py: 5, bgcolor: "#f8fafc" }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 4 } }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Poppins", sans-serif',
              fontSize: "2.25rem",
              fontWeight: 700,
              textAlign: "center",
              color: "#333",
              mb: 2,
            }}
          >
            Powerful Features
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "1.125rem",
              textAlign: "center",
              color: "#4a5568",
              mb: 6,
              maxWidth: 700,
              mx: "auto",
            }}
          >
            Discover how StaffFlow can transform your workforce management with these powerful tools
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: 4,
            }}
          >
            {[
              {
                icon: <Calendar size={24} color="white" />,
                bgColor: "#03306b",
                title: "AI-Assisted Scheduling",
                description:
                  "Our intelligent algorithm creates optimal schedules based on employee availability, skills, and business needs, saving you hours of manual work.",
              },
              {
                icon: <Users size={24} color="white" />,
                bgColor: "#c61111",
                title: "Employee Management",
                description:
                  "Easily manage your workforce, track availability, handle time-off requests, and maintain detailed employee profiles in one place.",
              },
              {
                icon: <Clock size={24} color="white" />,
                bgColor: "#03306b",
                title: "Time Tracking",
                description:
                  "Accurate time tracking with clock-in/out functionality, break management, and overtime calculations for precise payroll processing.",
              },
              {
                icon: <LineChart size={24} color="white" />,
                bgColor: "#c61111",
                title: "Advanced Analytics",
                description:
                  "Gain valuable insights into labor costs, scheduling efficiency, and employee performance with our comprehensive reporting tools.",
              },
              {
                icon: <CheckCircle size={24} color="white" />,
                bgColor: "#03306b",
                title: "Compliance Management",
                description:
                  "Stay compliant with labor laws and regulations with built-in tools that monitor work hours, breaks, and overtime to avoid penalties.",
              },
              {
                icon: <Shield size={24} color="white" />,
                bgColor: "#c61111",
                title: "Secure & Reliable",
                description:
                  "Enterprise-grade security with role-based access control, data encryption, and regular backups to keep your information safe and accessible.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                sx={{
                  bgcolor: "white",
                  borderRadius: "0.5rem",
                  p: 4,
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    borderColor: "#03306b",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "0.5rem",
                      bgcolor: feature.bgColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: '"Poppins", sans-serif',
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      color: "#333",
                      mb: 2,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: "1rem",
                      color: "#4a5568",
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        component="section"
        sx={{ py: 5, bgcolor: "#03306b", color: "white", textAlign: "center" }}
      >
        <Container maxWidth="md" sx={{ px: { xs: 3, sm: 4 } }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Poppins", sans-serif',
              fontSize: { xs: "1.875rem", md: "2.25rem" },
              fontWeight: 700,
              mb: 3,
            }}
          >
            Ready to transform your workforce management?
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "1.25rem",
              mb: 5,
              opacity: 0.9,
            }}
          >
            Join thousands of businesses that use StaffFlow to optimize their scheduling and improve employee satisfaction.
          </Typography>
          <Button
            component="a"
            href="/auth/sign-in"
            variant="contained"
            sx={{
              bgcolor: "#c61111",
              color: "white",
              fontFamily: '"Inter", sans-serif',
              fontWeight: 600,
              px: 2.5,
              py: 1.25,
              borderRadius: "0.375rem",
              textTransform: "none",
              display: "flex",
              gap: 1,
              "&:hover": {
                bgcolor: "#a50e0e",
                boxShadow: "0 2px 4px rgba(198, 17, 17, 0.2)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Start Your Free Trial
            <ArrowRight size={16} />
          </Button>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box component="section" id="testimonials" sx={{ py: 5 }}>
        <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 4 } }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Poppins", sans-serif',
              fontSize: "2.25rem",
              fontWeight: 700,
              textAlign: "center",
              color: "#333",
              mb: 2,
            }}
          >
            What Our Customers Say
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Inter", sans-serif',
              fontSize: "1.125rem",
              textAlign: "center",
              color: "#4a5568",
              mb: 6,
              maxWidth: 700,
              mx: "auto",
            }}
          >
            Hear from businesses that have transformed their workforce management with StaffFlow
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
              gap: 4,
            }}
          >
            {[
              {
                text: "StaffFlow has completely transformed how we manage our staff scheduling. The AI-powered recommendations have saved us countless hours and reduced scheduling conflicts by 90%.",
                author: "John Doe",
                role: "Restaurant Manager",
                initials: "JD",
              },
              {
                text: "The payroll integration is seamless and has eliminated errors in our time tracking. Our employees love the mobile app for checking schedules and requesting time off.",
                author: "Sarah Johnson",
                role: "HR Director",
                initials: "SJ",
              },
              {
                text: "As a growing retail business, StaffFlow has been instrumental in helping us scale our workforce efficiently. The analytics provide valuable insights for optimizing our staffing levels.",
                author: "Michael Brown",
                role: "Retail Store Owner",
                initials: "MB",
              },
              {
                text: "The customer support team at StaffFlow is exceptional. They've been responsive and helpful throughout our implementation process, making the transition smooth and painless.",
                author: "Emily Wilson",
                role: "Operations Manager",
                initials: "EW",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                sx={{
                  bgcolor: "white",
                  borderRadius: "0.5rem",
                  p: 4,
                  border: "1px solid #e2e8f0",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                    borderColor: "#e2e8f0",
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Typography
                    sx={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: "1.125rem",
                      color: "#2d3748",
                      mb: 3,
                      lineHeight: 1.6,
                      fontStyle: "italic",
                    }}
                  >
                    {testimonial.text}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        bgcolor: "#03306b",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: 600,
                        fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      {testimonial.initials}
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", sans-serif',
                          fontWeight: 600,
                          color: "#333",
                        }}
                      >
                        {testimonial.author}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"Inter", sans-serif',
                          fontSize: "0.875rem",
                          color: "#4a5568",
                        }}
                      >
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: "white",
          borderTop: "1px solid #e2e8f0",
          py: 6,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            px: { xs: 3, sm: 4 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 4, md: 0 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, justifyContent: { xs: "center", md: "flex-start" }, mb: 1 }}>
              <Image src="/logo.png" alt="StaffFlow Logo" width={32} height={32} />
              <Typography
                sx={{
                  fontFamily: '"Poppins", sans-serif',
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: "#333",
                }}
              >
                StaffFlow
              </Typography>
            </Box>
            <Typography
              sx={{
                fontFamily: '"Inter", sans-serif',
                fontSize: "0.875rem",
                color: "#4a5568",
              }}
            >
              © 2025 StaffFlow. All rights reserved.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, md: 4 },
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "flex-end" },
            }}
          >
            {["Features", "Pricing", "Documentation", "About Us", "Contact"].map((link, index) => (
              <Typography
                key={index}
                component="a"
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                sx={{
                  fontFamily: '"Inter", sans-serif',
                  color: "#4a5568",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  "&:hover": { color: "#333" },
                }}
              >
                {link}
              </Typography>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
