"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#03306b",
        contrastText: mode === "light" ? "#fafafa" : "#171717",
      },
      secondary: {
        main: "#c61111",
        contrastText: "#fafafa",
      },
      background: {
        default: mode === "light" ? "#fff" : "#0a0a0a",
        paper: mode === "light" ? "#fff" : "#0a0a0a",
      },
      text: {
        primary: mode === "light" ? "#0a0a0a" : "#fafafa",
        secondary: mode === "light" ? "#737373" : "#a3a3a3",
      },
      divider: mode === "light" ? "#e2e8f0" : "#262626",
      error: {
        main: "#c61111",
      },
    },
    typography: {
      fontFamily: '"Inter", "Arial", "Helvetica", sans-serif',
      h1: {
        fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
        fontWeight: 800,
      },
      h2: {
        fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
        fontWeight: 700,
      },
      h3: {
        fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
        fontWeight: 600,
      },
      h4: {
        fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
        fontWeight: 600,
      },
      h5: {
        fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
        fontWeight: 600,
      },
      h6: {
        fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-5px)",
              borderColor: "#03306b",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            },
          },
        },
      },
    },
  });

  return (
    <html lang="en">
      <head>
        <title>StaffFlow - AI-Powered Employee Shift & Workload Manager</title>
        <meta
          name="description"
          content="Simplify workforce planning with AI-driven scheduling"
        />
        <meta name="generator" content="v0.dev" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* <link rel="stylesheet" href="/global.css" /> */}
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
