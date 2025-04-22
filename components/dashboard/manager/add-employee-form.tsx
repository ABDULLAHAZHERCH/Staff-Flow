"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Alert,
  styled,
} from "@mui/material";
import { HourglassEmpty } from "@mui/icons-material";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  department: z.string().min(1, { message: "Please select a department" }),
  position: z
    .string()
    .min(2, { message: "Position must be at least 2 characters" }),
  phone: z.string().optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[0-9]/, { message: "Password must contain numbers" }),
});

interface AddEmployeeFormProps {
  onSuccess?: () => void;
}

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
  "& .MuiInputLabel-root": {
    fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
    color: "#1a1a1a", // Body color from global.css
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

const StyledButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  textTransform: "none",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)", // From global.css
  transition: "box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out",
  backgroundColor: "#03306b", // Primary color from global.css
  color: "white",
  "&:hover": {
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", // From global.css
    backgroundColor: "#022a5b", // Darker primary for hover
  },
  "&.Mui-disabled": {
    backgroundColor: "#e2e8f0", // Muted color for disabled state
    color: "#64748b",
  },
}));

const StyledOutlineButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Inter", "Segoe UI", "Helvetica Neue", "Arial", sans-serif',
  textTransform: "none",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)", // From global.css
  transition: "box-shadow 0.2s ease-in-out, color 0.2s ease-in-out",
  borderColor: "#e2e8f0", // Border-secondary/30 equivalent
  color: "#1a1a1a",
  "&:hover": {
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)", // From global.css
    color: "#c61111", // Secondary color from global.css
    borderColor: "#c61111",
  },
  "&.Mui-disabled": {
    borderColor: "#e2e8f0",
    color: "#64748b",
  },
}));

export function AddEmployeeForm({ onSuccess }: AddEmployeeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      position: "",
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      // Real API call to add an employee
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add employee");
      }

      const data = await response.json();

      setAlert({
        type: "success",
        message: `${values.firstName} ${values.lastName} has been added successfully.`,
      });

      form.reset();

      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      setAlert({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "There was an error adding the employee. Please try again.",
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setAlert(null), 3000); // Hide alert after 3 seconds
    }
  }

  return (
    <FormContainer>
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

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
      >
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
              First Name
            </Typography>
            <StyledTextField
              fullWidth
              placeholder="John"
              {...form.register("firstName")}
              error={!!form.formState.errors.firstName}
              helperText={form.formState.errors.firstName?.message}
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
              Last Name
            </Typography>
            <StyledTextField
              fullWidth
              placeholder="Doe"
              {...form.register("lastName")}
              error={!!form.formState.errors.lastName}
              helperText={form.formState.errors.lastName?.message}
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
              Email
            </Typography>
            <StyledTextField
              fullWidth
              placeholder="john.doe@example.com"
              {...form.register("email")}
              error={!!form.formState.errors.email}
              helperText={
                form.formState.errors.email ? (
                  form.formState.errors.email.message
                ) : (
                  <Typography variant="caption" sx={{ color: "#64748b" }}>
                    This will be used for login and notifications
                  </Typography>
                )
              }
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
              Password
            </Typography>
            <StyledTextField
              fullWidth
              type="text"
              placeholder="••••••••"
              {...form.register("password")}
              error={!!form.formState.errors.password}
              helperText={
                form.formState.errors.password ? (
                  form.formState.errors.password.message
                ) : (
                  <Typography variant="caption" sx={{ color: "#64748b" }}>
                    Must be at least 8 characters with letters and numbers
                  </Typography>
                )
              }
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
              Phone Number
            </Typography>
            <StyledTextField
              fullWidth
              placeholder="+1 (555) 123-4567"
              {...form.register("phone")}
              error={!!form.formState.errors.phone}
              helperText={form.formState.errors.phone?.message}
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
              Department
            </Typography>
            <StyledSelect
              fullWidth
              value={form.watch("department") || ""}
              onChange={(e) =>
                form.setValue("department", e.target.value as string, {
                  shouldValidate: true,
                })
              }
              displayEmpty
              renderValue={(value: unknown) =>
                typeof value === "string"
                  ? value.charAt(0).toUpperCase() + value.slice(1)
                  : "Select a department"
              }
              error={!!form.formState.errors.department}
            >
              <MenuItem value="" disabled>
                Select a department
              </MenuItem>
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
            {form.formState.errors.department && (
              <Typography variant="caption" sx={{ color: "#dc2626", mt: 0.5 }}>
                {form.formState.errors.department.message}
              </Typography>
            )}
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
              Position
            </Typography>
            <StyledTextField
              fullWidth
              placeholder="Sales Representative"
              {...form.register("position")}
              error={!!form.formState.errors.position}
              helperText={form.formState.errors.position?.message}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
          }}
        >
          <StyledButton
            type="submit"
            disabled={isLoading}
            sx={{
              width: { xs: "100%", sm: "auto" },
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {isLoading ? (
              <>
                <HourglassEmpty sx={{ fontSize: 16 }} />
                Adding Employee...
              </>
            ) : (
              "Add Employee"
            )}
          </StyledButton>
          <StyledOutlineButton
            type="button"
            variant="outlined"
            onClick={() => form.reset()}
            disabled={isLoading}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            Reset Form
          </StyledOutlineButton>
        </Box>
      </form>
    </FormContainer>
  );
}
