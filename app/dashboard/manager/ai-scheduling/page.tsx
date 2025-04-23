"use client";

import type React from "react";
import { useState } from "react";
import { AISchedulingForm } from "@/components/dashboard/manager/ai-scheduling-form";
import { AISchedulingResults } from "@/components/dashboard/manager/ai-scheduling-results";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  Tabs,
  Tab,
  styled,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
} from "@mui/material";
import {
  AutoAwesome,
  Psychology,
  ExpandMore,
  HelpOutline,
  CheckCircleOutline,
  BarChart,
  Balance,
  AccessTime,
  Groups,
  Save,
} from "@mui/icons-material";

const PageContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  backgroundColor: "white",
  padding: theme.spacing(2),
}));

const HeaderContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

const TitleContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  textTransform: "none",
  background: "linear-gradient(135deg, #03306b 0%, #c61111 100%)", // Gradient inspired by btn-gradient-dual
  color: "white",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)", // From global.css
  transition: "box-shadow 0.2s ease-in-out",
  "&:hover": {
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", // From global.css
    background: "linear-gradient(135deg, #c61111 0%, #03306b 100%)", // Reversed gradient for hover
  },
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .MuiTabs-indicator": {
    backgroundColor: "#03306b", // Primary color from global.css
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  textTransform: "none",
  color: "#1a1a1a", // Body color from global.css
  "&.Mui-selected": {
    color: "white",
    backgroundColor: "#c61111", // Secondary color for active-secondary
  },
  "&:hover": {
    //color: '#c61111', // Secondary color from global.css
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)", // From global.css
  "&:hover": {
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", // From global.css
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: 0,
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  "& .MuiAccordionSummary-content": {
    margin: theme.spacing(1, 0),
  },
}));

const AISchedulingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("generate");
  const [helpExpanded, setHelpExpanded] = useState<string | false>(false);
  const [generatedSchedule, setGeneratedSchedule] = useState<any>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleHelpChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setHelpExpanded(isExpanded ? panel : false);
    };

  const handleScheduleGenerated = (schedule: any) => {
    setGeneratedSchedule(schedule);
  };

  const handleSaveSchedule = async () => {
    if (!generatedSchedule) return;

    try {
      const response = await fetch("/api/scheduling/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shifts: generatedSchedule.shifts }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setSnackbar({
        open: true,
        message: `Successfully saved ${data.shifts.length} shifts!`,
        severity: "success",
      });
    } catch (error) {
      console.error("Error saving schedule:", error);
      setSnackbar({
        open: true,
        message: "Failed to save schedule. Please try again.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleNewSchedule = () => {
    setGeneratedSchedule(null);
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <TitleContainer>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
                fontWeight: 600,
                color: "#0d1b2a",
              }}
            >
              AI Scheduling
            </Typography>
            <Psychology sx={{ fontSize: 28, color: "#03306b" }} />
          </Box>
          <StyledButton onClick={handleNewSchedule}>
            <AutoAwesome sx={{ fontSize: 16 }} />
            New Schedule
          </StyledButton>
        </TitleContainer>

        <Alert
          severity="info"
          sx={{
            fontFamily:
              '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
            "& .MuiAlert-icon": {
              alignItems: "center",
            },
          }}
        >
          <AlertTitle sx={{ fontWeight: 600 }}>
            AI-Powered Decision Tree Scheduling
          </AlertTitle>
          <Typography variant="body2">
            Our AI scheduling system uses decision trees to create optimal
            employee schedules based on multiple factors including employee
            preferences, skill levels, and business needs.
          </Typography>
        </Alert>

        <Box>
          <StyledTabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            aria-label="scheduling tabs"
          >
            <StyledTab label="Generate Schedule" value="generate" />
            <StyledTab label="Schedule History" value="history" />
            <StyledTab label="How It Works" value="help" />
          </StyledTabs>

          <Box
            sx={{ display: activeTab === "generate" ? "block" : "none", mt: 2 }}
          >
            <StyledCard>
              <CardHeader
                title={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
                        fontWeight: 600,
                        color: "#0d1b2a",
                      }}
                    >
                      AI-Assisted Scheduling
                    </Typography>
                    <AutoAwesome sx={{ fontSize: 18, color: "#c61111" }} />
                  </Box>
                }
                subheader={
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    Generate optimized shift schedules based on employee
                    availability and business needs
                  </Typography>
                }
              />
              <CardContent>
                <AISchedulingForm
                  onScheduleGenerated={handleScheduleGenerated}
                />
              </CardContent>
            </StyledCard>

            {generatedSchedule && (
              <StyledCard sx={{ mt: 2 }}>
                <CardHeader
                  title={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
                          fontWeight: 600,
                          color: "#0d1b2a",
                        }}
                      >
                        Generated Schedule
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Save />}
                        onClick={handleSaveSchedule}
                        sx={{
                          textTransform: "none",
                          fontFamily:
                            '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                        }}
                      >
                        Save Schedule
                      </Button>
                    </Box>
                  }
                  subheader={
                    <Typography variant="body2" sx={{ color: "#64748b" }}>
                      Review and adjust the AI-generated schedule
                    </Typography>
                  }
                />
                <CardContent>
                  {/* <AISchedulingResults schedule={generatedSchedule} /> */}
                </CardContent>
              </StyledCard>
            )}
          </Box>

          <Box
            sx={{ display: activeTab === "history" ? "block" : "none", mt: 2 }}
          >
            <StyledCard>
              <CardHeader
                title={
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
                      fontWeight: 600,
                      color: "#0d1b2a",
                    }}
                  >
                    Schedule History
                  </Typography>
                }
                subheader={
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    View and manage previously generated schedules
                  </Typography>
                }
              />
              <CardContent sx={{ textAlign: "center", padding: "2rem 0" }}>
                <Typography variant="body2" sx={{ color: "#64748b", mb: 2 }}>
                  No previous schedules found
                </Typography>
              </CardContent>
            </StyledCard>
          </Box>

          <Box sx={{ display: activeTab === "help" ? "block" : "none", mt: 2 }}>
            <StyledCard>
              <CardHeader
                title={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Poppins", "Inter", "Arial", sans-serif',
                        fontWeight: 600,
                        color: "#0d1b2a",
                      }}
                    >
                      How AI Scheduling Works
                    </Typography>
                    <HelpOutline sx={{ fontSize: 18, color: "#03306b" }} />
                  </Box>
                }
                subheader={
                  <Typography variant="body2" sx={{ color: "#64748b" }}>
                    Learn about our decision tree algorithm and how it creates
                    optimal schedules
                  </Typography>
                }
              />
              <CardContent>
                <Typography variant="body2" paragraph>
                  Our AI scheduling system uses a sophisticated decision tree
                  algorithm to create optimal employee schedules. The system
                  considers multiple factors and constraints to generate the
                  most efficient and fair schedules.
                </Typography>

                <StyledAccordion
                  expanded={helpExpanded === "panel1"}
                  onChange={handleHelpChange("panel1")}
                >
                  <StyledAccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Psychology sx={{ fontSize: 20, color: "#03306b" }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Decision Tree Algorithm
                      </Typography>
                    </Box>
                  </StyledAccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" paragraph>
                      A decision tree is a flowchart-like structure where each
                      internal node represents a decision based on a specific
                      factor, each branch represents the outcome of that
                      decision, and each leaf node represents the final
                      decision.
                    </Typography>
                    <Typography variant="body2" paragraph>
                      Our scheduling algorithm uses a multi-level decision tree
                      to evaluate each potential employee assignment based on
                      various factors such as:
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleOutline sx={{ color: "#03306b" }} />
                        </ListItemIcon>
                        <ListItemText primary="Employee availability and preferences" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleOutline sx={{ color: "#03306b" }} />
                        </ListItemIcon>
                        <ListItemText primary="Required skills for each shift" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleOutline sx={{ color: "#03306b" }} />
                        </ListItemIcon>
                        <ListItemText primary="Labor laws and company policies" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleOutline sx={{ color: "#03306b" }} />
                        </ListItemIcon>
                        <ListItemText primary="Fair distribution of shifts" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleOutline sx={{ color: "#03306b" }} />
                        </ListItemIcon>
                        <ListItemText primary="Operational efficiency" />
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </StyledAccordion>

                <StyledAccordion
                  expanded={helpExpanded === "panel2"}
                  onChange={handleHelpChange("panel2")}
                >
                  <StyledAccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <BarChart sx={{ fontSize: 20, color: "#03306b" }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Key Factors Considered
                      </Typography>
                    </Box>
                  </StyledAccordionSummary>
                  <AccordionDetails>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <AccessTime sx={{ color: "#03306b" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Time Constraints"
                          secondary="Maximum consecutive working days, minimum hours between shifts, maximum weekly hours"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Groups sx={{ color: "#03306b" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Employee Preferences"
                          secondary="Preferred working hours, time-off requests, shift preferences"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Balance sx={{ color: "#03306b" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Fairness vs. Efficiency"
                          secondary="Balance between fair distribution of shifts and operational efficiency"
                        />
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </StyledAccordion>

                <StyledAccordion
                  expanded={helpExpanded === "panel3"}
                  onChange={handleHelpChange("panel3")}
                >
                  <StyledAccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AutoAwesome sx={{ fontSize: 20, color: "#03306b" }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Benefits of AI Scheduling
                      </Typography>
                    </Box>
                  </StyledAccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" paragraph>
                      Using our AI scheduling system provides several benefits:
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleOutline sx={{ color: "#03306b" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Time Savings"
                          secondary="Reduce the time spent on creating schedules by up to 80%"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleOutline sx={{ color: "#03306b" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Improved Employee Satisfaction"
                          secondary="Fair distribution of shifts and consideration of preferences"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleOutline sx={{ color: "#03306b" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Optimized Coverage"
                          secondary="Ensure appropriate staffing levels at all times"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleOutline sx={{ color: "#03306b" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Compliance"
                          secondary="Automatically adhere to labor laws and company policies"
                        />
                      </ListItem>
                    </List>
                  </AccordionDetails>
                </StyledAccordion>

                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    backgroundColor: "#f8fafc",
                    borderRadius: "0.375rem",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Psychology sx={{ fontSize: 20, color: "#03306b" }} />
                    Getting Started
                  </Typography>
                  <Typography variant="body2">
                    To create your first AI-generated schedule, go to the
                    "Generate Schedule" tab, fill in the required parameters,
                    and click "Generate AI Schedule". You can then review and
                    adjust the generated schedule before approving and
                    publishing it.
                  </Typography>
                </Box>
              </CardContent>
            </StyledCard>
          </Box>
        </Box>
      </HeaderContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </PageContainer>
  );
};

export default AISchedulingPage;
