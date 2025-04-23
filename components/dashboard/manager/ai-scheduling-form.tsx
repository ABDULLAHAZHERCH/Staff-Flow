"use client";

import type React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Slider,
  Switch,
  Button,
  Alert,
  styled,
  type SelectChangeEvent,
  FormControl,
  InputLabel,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Tooltip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  CalendarToday,
  AutoAwesome,
  ExpandMore,
  Info,
  Psychology,
  Balance,
  AccessTime,
} from "@mui/icons-material";

const FormContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  backgroundColor: "white",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)", // From global.css
    transition: "box-shadow 0.2s ease-in-out",
    "&:hover, &.Mui-focused": {
      boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", // From global.css
    },
  },
  "& .MuiInputBase-input": {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  },
  "& .MuiInputAdornment-root": {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    opacity: 0.5,
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)", // From global.css
  transition: "box-shadow 0.2s ease-in-out",
  "&:hover, &.Mui-focused": {
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", // From global.css
  },
  "& .MuiSelect-select": {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  },
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  "& .MuiSlider-thumb": {
    backgroundColor: "#c61111", // Secondary color from global.css
  },
  "& .MuiSlider-track": {
    backgroundColor: "#c61111", // Secondary color
  },
  "& .MuiSlider-rail": {
    backgroundColor: "#e2e8f0", // Muted background
  },
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase": {
    "&.Mui-checked": {
      color: "#c61111", // Secondary color
    },
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#c61111", // Secondary color
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  textTransform: "none",
  backgroundColor: "#03306b", // Primary color from global.css
  color: "white",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)", // From global.css
  transition: "box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out",
  "&:hover": {
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", // From global.css
    backgroundColor: "#022a5b", // Darker primary
  },
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  "&.Mui-disabled": {
    backgroundColor: "#e2e8f0",
    color: "#64748b",
  },
}));

const PreferenceBox = styled(Box)(({ theme }) => ({
  border: "1px solid #e2e8f0", // Border-color from global.css
  borderRadius: "0.375rem", // var(--radius)
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
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

const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: "#03306b",
  color: "white",
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  "& .MuiChip-icon": {
    color: "white",
  },
}));

interface AISchedulingFormProps {
  onScheduleGenerated?: (schedule: any) => void;
}

export function AISchedulingForm({
  onScheduleGenerated,
}: AISchedulingFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [expanded, setExpanded] = useState<string | false>("panel1");
  const [formData, setFormData] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    department: "",
    prioritizeEmployeePreferences: true,
    maxConsecutiveDays: 5,
    considerSkillLevel: true,
    minHoursBetweenShifts: 12,
    maxWeeklyHours: 40,
    balanceWeekendShifts: true,
    fairnessWeight: 70,
    efficiencyWeight: 30,
    decisionTreeDepth: 4,
    optimizationMethod: "balanced",
  });

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | SelectChangeEvent<unknown>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    };

  const handleSliderChange =
    (name: string) => (e: Event, value: number | number[]) => {
      setFormData({
        ...formData,
        [name]: value,
      });
    };

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAlert(null);

    try {
      const response = await fetch("/api/scheduling/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setAlert({
        type: "success",
        message: "Schedule generated successfully!",
      });

      // Call the callback with the generated schedule
      if (onScheduleGenerated) {
        onScheduleGenerated(data.schedule);
      }
    } catch (error) {
      console.error("Error generating schedule:", error);
      setAlert({
        type: "error",
        message:
          "There was an error generating the schedule. Please try again.",
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        if (alert?.type === "success") {
          setAlert(null);
        }
      }, 3000); // Hide success alert after 3 seconds
    }
  };

  return (
    <FormContainer as="form" onSubmit={handleSubmit}>
      {alert && (
        <Alert
          severity={alert.type}
          sx={{
            fontFamily:
              '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
          }}
        >
          <Typography variant="body2">{alert.message}</Typography>
        </Alert>
      )}

      <StyledAccordion
        expanded={expanded === "panel1"}
        onChange={handleAccordionChange("panel1")}
      >
        <StyledAccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CalendarToday sx={{ fontSize: 20, color: "#03306b" }} />
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                fontFamily:
                  '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
              }}
            >
              Basic Schedule Parameters
            </Typography>
          </Box>
        </StyledAccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 3,
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{ flex: 1, minWidth: { xs: "100%", md: "calc(50% - 12px)" } }}
            >
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontFamily:
                    '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                  color: "#1a1a1a",
                }}
              >
                Start Date
              </Typography>
              <StyledTextField
                type="date"
                name="startDate"
                fullWidth
                value={formData.startDate.toISOString().split("T")[0]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    startDate: new Date(e.target.value),
                  })
                }
                InputProps={{
                  endAdornment: <CalendarToday sx={{ fontSize: 16 }} />,
                }}
              />
            </Box>
            <Box
              sx={{ flex: 1, minWidth: { xs: "100%", md: "calc(50% - 12px)" } }}
            >
              <Typography
                variant="body2"
                sx={{
                  mb: 1,
                  fontFamily:
                    '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                  color: "#1a1a1a",
                }}
              >
                End Date
              </Typography>
              <StyledTextField
                type="date"
                name="endDate"
                fullWidth
                value={formData.endDate.toISOString().split("T")[0]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    endDate: new Date(e.target.value),
                  })
                }
                InputProps={{
                  endAdornment: <CalendarToday sx={{ fontSize: 16 }} />,
                }}
              />
            </Box>
            <Box
              sx={{ flex: 1, minWidth: { xs: "100%", md: "calc(50% - 12px)" } }}
            >
              <FormControl fullWidth>
                <InputLabel id="department-label">Department</InputLabel>
                <StyledSelect
                  labelId="department-label"
                  id="department"
                  name="department"
                  value={formData.department}
                  label="Department"
                  onChange={handleInputChange}
                  displayEmpty
                >
                  <MenuItem value="">Select a department</MenuItem>
                  <MenuItem value="all">All Departments</MenuItem>
                  {[
                    "sales",
                    "support",
                    "kitchen",
                    "delivery",
                    "admin",
                    "cleaning",
                  ].map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept.charAt(0).toUpperCase() + dept.slice(1)}
                    </MenuItem>
                  ))}
                </StyledSelect>
              </FormControl>
            </Box>
            <Box
              sx={{ flex: 1, minWidth: { xs: "100%", md: "calc(50% - 12px)" } }}
            >
              <FormControl fullWidth>
                <InputLabel id="optimization-method-label">
                  Optimization Method
                </InputLabel>
                <StyledSelect
                  labelId="optimization-method-label"
                  id="optimizationMethod"
                  name="optimizationMethod"
                  value={formData.optimizationMethod}
                  label="Optimization Method"
                  onChange={handleInputChange}
                >
                  <MenuItem value="balanced">Balanced (Default)</MenuItem>
                  <MenuItem value="fairness">Prioritize Fairness</MenuItem>
                  <MenuItem value="efficiency">Prioritize Efficiency</MenuItem>
                  <MenuItem value="coverage">Prioritize Coverage</MenuItem>
                </StyledSelect>
              </FormControl>
            </Box>
          </Box>
        </AccordionDetails>
      </StyledAccordion>

      <StyledAccordion
        expanded={expanded === "panel2"}
        onChange={handleAccordionChange("panel2")}
      >
        <StyledAccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AccessTime sx={{ fontSize: 20, color: "#03306b" }} />
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                fontFamily:
                  '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
              }}
            >
              Shift Constraints
            </Typography>
          </Box>
        </StyledAccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily:
                      '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                    color: "#1a1a1a",
                  }}
                >
                  Maximum Consecutive Working Days
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontFamily:
                      '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                  }}
                >
                  {formData.maxConsecutiveDays}{" "}
                  {formData.maxConsecutiveDays === 1 ? "day" : "days"}
                </Typography>
              </Box>
              <StyledSlider
                value={formData.maxConsecutiveDays}
                onChange={handleSliderChange("maxConsecutiveDays")}
                min={1}
                max={7}
                step={1}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) =>
                  `${value} ${value === 1 ? "day" : "days"}`
                }
              />
            </Box>

            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily:
                      '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                    color: "#1a1a1a",
                  }}
                >
                  Minimum Hours Between Shifts
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontFamily:
                      '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                  }}
                >
                  {formData.minHoursBetweenShifts} hours
                </Typography>
              </Box>
              <StyledSlider
                value={formData.minHoursBetweenShifts}
                onChange={handleSliderChange("minHoursBetweenShifts")}
                min={8}
                max={24}
                step={1}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} hours`}
              />
            </Box>

            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily:
                      '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                    color: "#1a1a1a",
                  }}
                >
                  Maximum Weekly Hours
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontFamily:
                      '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                  }}
                >
                  {formData.maxWeeklyHours} hours
                </Typography>
              </Box>
              <StyledSlider
                value={formData.maxWeeklyHours}
                onChange={handleSliderChange("maxWeeklyHours")}
                min={20}
                max={60}
                step={5}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} hours`}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <PreferenceBox
                sx={{
                  flex: 1,
                  minWidth: { xs: "100%", sm: "calc(50% - 8px)" },
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 0.5,
                      fontFamily:
                        '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                      color: "#1a1a1a",
                    }}
                  >
                    Balance Weekend Shifts
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748b",
                      fontFamily:
                        '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                    }}
                  >
                    Distribute weekend shifts fairly among employees
                  </Typography>
                </Box>
                <StyledSwitch
                  checked={formData.balanceWeekendShifts}
                  onChange={handleSwitchChange("balanceWeekendShifts")}
                  name="balanceWeekendShifts"
                />
              </PreferenceBox>

              <PreferenceBox
                sx={{
                  flex: 1,
                  minWidth: { xs: "100%", sm: "calc(50% - 8px)" },
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    sx={{
                      mb: 0.5,
                      fontFamily:
                        '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                      color: "#1a1a1a",
                    }}
                  >
                    Consider Skill Level
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#64748b",
                      fontFamily:
                        '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                    }}
                  >
                    Ensure appropriate skill mix in each shift
                  </Typography>
                </Box>
                <StyledSwitch
                  checked={formData.considerSkillLevel}
                  onChange={handleSwitchChange("considerSkillLevel")}
                  name="considerSkillLevel"
                />
              </PreferenceBox>
            </Box>
          </Box>
        </AccordionDetails>
      </StyledAccordion>

      <StyledAccordion
        expanded={expanded === "panel3"}
        onChange={handleAccordionChange("panel3")}
      >
        <StyledAccordionSummary expandIcon={<ExpandMore />}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Psychology sx={{ fontSize: 20, color: "#03306b" }} />
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                fontFamily:
                  '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
              }}
            >
              Decision Tree Parameters
            </Typography>
            <StyledChip
              size="small"
              label="AI"
              icon={<AutoAwesome sx={{ fontSize: 14 }} />}
            />
          </Box>
        </StyledAccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily:
                        '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                      color: "#1a1a1a",
                    }}
                  >
                    Decision Tree Depth
                  </Typography>
                  <Tooltip title="Controls how many factors the AI considers when making decisions. Higher values create more complex but potentially better schedules.">
                    <IconButton size="small">
                      <Info sx={{ fontSize: 16, color: "#64748b" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontFamily:
                      '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                  }}
                >
                  {formData.decisionTreeDepth}
                </Typography>
              </Box>
              <StyledSlider
                value={formData.decisionTreeDepth}
                onChange={handleSliderChange("decisionTreeDepth")}
                min={2}
                max={6}
                step={1}
                valueLabelDisplay="auto"
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 0.5,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "#64748b",
                    fontFamily:
                      '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                  }}
                >
                  Simple
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#64748b",
                    fontFamily:
                      '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                  }}
                >
                  Complex
                </Typography>
              </Box>
            </Box>

            <Divider />

            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily:
                        '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                      color: "#1a1a1a",
                    }}
                  >
                    Fairness vs. Efficiency Balance
                  </Typography>
                  <Tooltip title="Controls whether the AI prioritizes fair distribution of shifts (higher values) or operational efficiency (lower values).">
                    <IconButton size="small">
                      <Info sx={{ fontSize: 16, color: "#64748b" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Balance sx={{ color: "#03306b" }} />
                <Box sx={{ flex: 1 }}>
                  <StyledSlider
                    value={formData.fairnessWeight}
                    onChange={(e, value) => {
                      const fairnessValue = value as number;
                      setFormData({
                        ...formData,
                        fairnessWeight: fairnessValue,
                        efficiencyWeight: 100 - fairnessValue,
                      });
                    }}
                    min={0}
                    max={100}
                    step={10}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${value}%`}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 0.5,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#64748b",
                        fontFamily:
                          '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                      }}
                    >
                      Efficiency ({formData.efficiencyWeight}%)
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#64748b",
                        fontFamily:
                          '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                      }}
                    >
                      Fairness ({formData.fairnessWeight}%)
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <PreferenceBox>
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 0.5,
                    fontFamily:
                      '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                    color: "#1a1a1a",
                  }}
                >
                  Prioritize Employee Preferences
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#64748b",
                    fontFamily:
                      '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
                  }}
                >
                  Consider employee availability and preferences when scheduling
                </Typography>
              </Box>
              <StyledSwitch
                checked={formData.prioritizeEmployeePreferences}
                onChange={handleSwitchChange("prioritizeEmployeePreferences")}
                name="prioritizeEmployeePreferences"
              />
            </PreferenceBox>
          </Box>
        </AccordionDetails>
      </StyledAccordion>

      <StyledButton type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <CircularProgress size={16} color="inherit" sx={{ mr: 1 }} />
            Generating Schedule...
          </>
        ) : (
          <>
            <AutoAwesome sx={{ fontSize: 16 }} />
            Generate AI Schedule
          </>
        )}
      </StyledButton>
    </FormContainer>
  );
}
