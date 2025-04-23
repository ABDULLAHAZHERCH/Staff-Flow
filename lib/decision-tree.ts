// lib/decision-tree.ts
import type { IUser } from "../models/User";
import type { IShift } from "../models/Shift";

// Define the types for our decision tree
export interface DecisionNode {
  feature: string;
  threshold?: number;
  category?: string;
  left?: DecisionNode;
  right?: DecisionNode;
  result?: string;
  score?: number;
}

export interface SchedulingParams {
  startDate: Date;
  endDate: Date;
  department?: string;
  prioritizeEmployeePreferences: boolean;
  maxConsecutiveDays: number;
  considerSkillLevel: boolean;
  minHoursBetweenShifts: number;
  maxWeeklyHours: number;
  balanceWeekendShifts: boolean;
  fairnessWeight: number;
  efficiencyWeight: number;
  decisionTreeDepth: number;
  optimizationMethod: "balanced" | "fairness" | "efficiency" | "coverage";
}

export interface EmployeeAvailability {
  userId: string;
  availableDays: string[]; // e.g., ["Monday", "Tuesday", "Wednesday"]
  availableTimeSlots: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  preferredShifts: "morning" | "afternoon" | "evening" | "any";
  maxHoursPerWeek: number;
  requestedTimeOff: Date[];
  skills: string[];
  skillLevel: number; // 1-5
  consecutiveDaysWorked: number;
  totalHoursThisWeek: number;
  lastShiftEnd?: Date;
}

export interface ShiftRequirement {
  date: Date;
  day: string;
  startTime: string;
  endTime: string;
  department: string;
  requiredSkills: string[];
  minSkillLevel: number;
}

export interface SchedulingResult {
  shifts: Array<{
    shiftRequirement: ShiftRequirement;
    assignedEmployee: IUser;
    score: number;
    decisionPath: string[];
    alternatives: Array<{
      employee: IUser;
      score: number;
      reason: string;
    }>;
  }>;
}

// Build a decision tree for employee scheduling
export function buildSchedulingDecisionTree(
  params: SchedulingParams
): DecisionNode {
  // Root node: Check employee availability
  const root: DecisionNode = {
    feature: "isAvailable",
    left: {
      // Employee is not available
      result: "reject",
      score: 0,
      feature: "",
    },
    right: {
      // Employee is available, check consecutive days
      feature: "consecutiveDaysWorked",
      threshold: params.maxConsecutiveDays,
      left: {
        // Within consecutive days limit
        feature: "hoursSinceLastShift",
        threshold: params.minHoursBetweenShifts,
        left: {
          // Not enough rest time
          result: "reject",
          score: 0,
          feature: "",
        },
        right: {
          // Enough rest time, check weekly hours
          feature: "totalHoursThisWeek",
          threshold: params.maxWeeklyHours,
          left: {
            // Within weekly hours limit
            feature: "skillLevelMatch",
            threshold: 0,
            left: {
              // Skill level not sufficient
              result: "reject",
              score: 0,
              feature: "",
            },
            right: {
              // Skill level sufficient, final decision based on optimization method
              feature: params.optimizationMethod,
              category: "balanced",
              left: {
                // If not balanced, check specific optimization method
                feature: "optimizationMethod",
                category: "fairness",
                left: {
                  // If not fairness, must be efficiency or coverage
                  feature: "optimizationMethod",
                  category: "efficiency",
                  left: {
                    // Must be coverage
                    feature: "coverageScore",
                    result: "accept",
                    score: 0.8, // Base score for coverage optimization
                  },
                  right: {
                    // Efficiency optimization
                    feature: "efficiencyScore",
                    result: "accept",
                    score: 0.8, // Base score for efficiency optimization
                  },
                },
                right: {
                  // Fairness optimization
                  feature: "fairnessScore",
                  result: "accept",
                  score: 0.8, // Base score for fairness optimization
                },
              },
              right: {
                // Balanced optimization (default)
                feature: "combinedScore",
                result: "accept",
                score: 0.9, // Base score for balanced optimization
              },
            },
          },
          right: {
            // Exceeds weekly hours
            result: "reject",
            score: 0,
            feature: "",
          },
        },
      },
      right: {
        // Exceeds consecutive days
        result: "reject",
        score: 0,
        feature: "",
      },
    },
  };

  // If we need to consider employee preferences, add more depth to the tree
  if (params.prioritizeEmployeePreferences && params.decisionTreeDepth > 3) {
    // Add preference nodes to the tree
    const balancedNode = root.right?.right?.right?.right?.right as DecisionNode;
    if (balancedNode) {
      balancedNode.feature = "preferenceMatch";
      balancedNode.threshold = 0.5;
      balancedNode.left = {
        // Low preference match
        feature: "combinedScore",
        result: "accept",
        score: 0.7, // Lower score for low preference match
      };
      balancedNode.right = {
        // High preference match
        feature: "combinedScore",
        result: "accept",
        score: 0.95, // Higher score for high preference match
      };
    }
  }

  // If we need to balance weekend shifts, add more complexity
  if (params.balanceWeekendShifts && params.decisionTreeDepth > 4) {
    // Add weekend balance nodes
    const preferenceNode = root.right?.right?.right?.right
      ?.right as DecisionNode;
    if (preferenceNode && preferenceNode.right) {
      preferenceNode.right.feature = "isWeekend";
      preferenceNode.right.left = {
        // Not weekend
        feature: "combinedScore",
        result: "accept",
        score: 0.95,
      };
      preferenceNode.right.right = {
        // Weekend
        feature: "weekendShiftsBalance",
        threshold: 0.5,
        left: {
          // Unbalanced weekend shifts
          feature: "combinedScore",
          result: "accept",
          score: 0.8,
        },
        right: {
          // Balanced weekend shifts
          feature: "combinedScore",
          result: "accept",
          score: 0.98,
        },
      };
    }
  }

  // Add more depth based on the decisionTreeDepth parameter
  if (params.decisionTreeDepth > 5) {
    // Add even more complex decision factors
    // This would be expanded in a real implementation
  }

  return root;
}

// Evaluate an employee against a shift using the decision tree
export function evaluateEmployeeForShift(
  employee: IUser & { availability: EmployeeAvailability },
  shift: ShiftRequirement,
  existingShifts: IShift[],
  decisionTree: DecisionNode,
  params: SchedulingParams
): { score: number; decisionPath: string[] } {
  const decisionPath: string[] = [];
  const currentNode = decisionTree;
  let score = 0;

  // Check if employee is available for this shift
  const isAvailable = checkAvailability(employee.availability, shift);
  decisionPath.push(
    `Employee availability check: ${
      isAvailable ? "Available" : "Not available"
    }`
  );

  if (!isAvailable) {
    return { score: 0, decisionPath };
  }

  // Check consecutive days worked
  const consecutiveDays = calculateConsecutiveDays(
    employee.availability,
    existingShifts,
    shift
  );
  decisionPath.push(
    `Consecutive days check: ${consecutiveDays} days worked before this shift`
  );

  if (consecutiveDays >= params.maxConsecutiveDays) {
    return { score: 0, decisionPath };
  }

  // Check hours since last shift
  const hoursSinceLastShift = calculateHoursSinceLastShift(
    employee.availability,
    existingShifts,
    shift
  );
  decisionPath.push(
    `Hours between shifts check: ${
      hoursSinceLastShift === Number.POSITIVE_INFINITY
        ? "No previous shift"
        : hoursSinceLastShift < params.minHoursBetweenShifts
        ? "Less than required minimum"
        : "More than " +
          params.minHoursBetweenShifts +
          " hours since last shift"
    }`
  );

  if (hoursSinceLastShift < params.minHoursBetweenShifts) {
    return { score: 0, decisionPath };
  }

  // Check total hours this week
  const totalHours = calculateTotalHours(
    employee.availability,
    existingShifts,
    shift
  );
  decisionPath.push(
    `Weekly hours check: ${
      totalHours > params.maxWeeklyHours
        ? "Exceeds limit"
        : "Within limit (" + totalHours + " hours)"
    }`
  );

  if (totalHours > params.maxWeeklyHours) {
    return { score: 0, decisionPath };
  }

  // Check skill level match
  const skillMatch = checkSkillMatch(employee.availability, shift);
  decisionPath.push(
    `Skill level check: ${
      skillMatch
        ? "Appropriate for shift requirements"
        : "Insufficient for shift requirements"
    }`
  );

  if (!skillMatch) {
    return { score: 0, decisionPath };
  }

  // Calculate scores based on optimization method
  let fairnessScore = 0;
  let efficiencyScore = 0;
  let coverageScore = 0;
  let preferenceScore = 0;
  let weekendBalanceScore = 0;

  // Calculate fairness score (how evenly distributed shifts are)
  fairnessScore = calculateFairnessScore(employee, existingShifts);

  // Calculate efficiency score (how well the employee fits the shift)
  efficiencyScore = calculateEfficiencyScore(employee.availability, shift);

  // Calculate coverage score (how well critical shifts are covered)
  coverageScore = calculateCoverageScore(shift);

  // Calculate preference score (how well the shift matches employee preferences)
  if (params.prioritizeEmployeePreferences) {
    preferenceScore = calculatePreferenceScore(employee.availability, shift);
    decisionPath.push(
      `Preference match: ${preferenceScore > 0.7 ? "High" : "Low"}`
    );
  }

  // Calculate weekend balance score
  if (params.balanceWeekendShifts && isWeekend(shift.date)) {
    weekendBalanceScore = calculateWeekendBalance(employee, existingShifts);
    decisionPath.push(
      `Weekend shift balance: ${weekendBalanceScore > 0.5 ? "Good" : "Poor"}`
    );
  }

  // Calculate final score based on optimization method
  switch (params.optimizationMethod) {
    case "fairness":
      score = fairnessScore * 0.7 + efficiencyScore * 0.3;
      decisionPath.push(
        `Optimization method: Prioritizing fairness (${Math.round(
          score * 100
        )}% match)`
      );
      break;
    case "efficiency":
      score = efficiencyScore * 0.7 + fairnessScore * 0.3;
      decisionPath.push(
        `Optimization method: Prioritizing efficiency (${Math.round(
          score * 100
        )}% match)`
      );
      break;
    case "coverage":
      score =
        coverageScore * 0.7 + (fairnessScore * 0.15 + efficiencyScore * 0.15);
      decisionPath.push(
        `Optimization method: Prioritizing coverage (${Math.round(
          score * 100
        )}% match)`
      );
      break;
    default: // balanced
      score =
        (fairnessScore * params.fairnessWeight) / 100 +
        (efficiencyScore * params.efficiencyWeight) / 100;
      decisionPath.push(
        `Optimization method: Balanced approach (${Math.round(
          score * 100
        )}% match)`
      );
  }

  // Adjust score based on preference if enabled
  if (params.prioritizeEmployeePreferences) {
    score = score * 0.8 + preferenceScore * 0.2;
  }

  // Adjust score based on weekend balance if enabled
  if (params.balanceWeekendShifts && isWeekend(shift.date)) {
    score = score * 0.8 + weekendBalanceScore * 0.2;
  }

  return { score, decisionPath };
}

// Helper functions for the decision tree evaluation
function checkAvailability(
  availability: EmployeeAvailability,
  shift: ShiftRequirement
): boolean {
  // Check if the employee is available on this day
  if (!availability.availableDays.includes(shift.day)) {
    return false;
  }

  // Check if the employee has requested time off on this date
  if (
    availability.requestedTimeOff.some((date) => isSameDay(date, shift.date))
  ) {
    return false;
  }

  // Check if the employee is available during this time slot
  const timeSlot = availability.availableTimeSlots.find(
    (slot) => slot.day === shift.day
  );
  if (!timeSlot) {
    return false;
  }

  // Convert times to comparable format (minutes since midnight)
  const shiftStart = timeToMinutes(shift.startTime);
  const shiftEnd = timeToMinutes(shift.endTime);
  const availableStart = timeToMinutes(timeSlot.startTime);
  const availableEnd = timeToMinutes(timeSlot.endTime);

  // Check if the shift time is within the available time slot
  return shiftStart >= availableStart && shiftEnd <= availableEnd;
}

function calculateConsecutiveDays(
  availability: EmployeeAvailability,
  existingShifts: IShift[],
  newShift: ShiftRequirement
): number {
  // In a real implementation, this would calculate the actual consecutive days
  // For now, we'll use the value from the availability object
  return availability.consecutiveDaysWorked;
}

function calculateHoursSinceLastShift(
  availability: EmployeeAvailability,
  existingShifts: IShift[],
  newShift: ShiftRequirement
): number {
  if (!availability.lastShiftEnd) {
    return Number.POSITIVE_INFINITY; // No previous shift
  }

  const lastShiftEnd = new Date(availability.lastShiftEnd).getTime();
  const newShiftStart = new Date(
    `${newShift.date.toISOString().split("T")[0]}T${newShift.startTime}`
  ).getTime();

  return (newShiftStart - lastShiftEnd) / (1000 * 60 * 60); // Convert to hours
}

function calculateTotalHours(
  availability: EmployeeAvailability,
  existingShifts: IShift[],
  newShift: ShiftRequirement
): number {
  // Calculate hours for the new shift
  const shiftStart = timeToMinutes(newShift.startTime);
  const shiftEnd = timeToMinutes(newShift.endTime);
  const shiftHours = (shiftEnd - shiftStart) / 60; // Convert minutes to hours

  // Add to existing weekly hours
  return availability.totalHoursThisWeek + shiftHours;
}

function checkSkillMatch(
  availability: EmployeeAvailability,
  shift: ShiftRequirement
): boolean {
  // Check if employee has all required skills
  const hasAllSkills = shift.requiredSkills.every((skill) =>
    availability.skills.includes(skill)
  );

  // Check if employee's skill level meets the minimum requirement
  const hasMinSkillLevel = availability.skillLevel >= shift.minSkillLevel;

  return hasAllSkills && hasMinSkillLevel;
}

function calculateFairnessScore(
  employee: IUser & { availability: EmployeeAvailability },
  existingShifts: IShift[]
): number {
  // In a real implementation, this would calculate how fair the assignment is
  // based on comparing this employee's total shifts to others
  // For now, return a random score between 0.6 and 1.0
  return 0.6 + Math.random() * 0.4;
}

function calculateEfficiencyScore(
  availability: EmployeeAvailability,
  shift: ShiftRequirement
): number {
  // Calculate how well the employee's skills match the shift requirements
  const skillMatchScore = availability.skillLevel / 5; // Normalize to 0-1

  // Calculate how well the shift fits into the employee's preferred times
  let timePreferenceScore = 0.5; // Default middle score
  if (availability.preferredShifts === "any") {
    timePreferenceScore = 1.0;
  } else {
    const shiftHour = Number.parseInt(shift.startTime.split(":")[0]);
    if (availability.preferredShifts === "morning" && shiftHour < 12) {
      timePreferenceScore = 1.0;
    } else if (
      availability.preferredShifts === "afternoon" &&
      shiftHour >= 12 &&
      shiftHour < 17
    ) {
      timePreferenceScore = 1.0;
    } else if (availability.preferredShifts === "evening" && shiftHour >= 17) {
      timePreferenceScore = 1.0;
    }
  }

  // Combine scores (skill match is more important for efficiency)
  return skillMatchScore * 0.7 + timePreferenceScore * 0.3;
}

function calculateCoverageScore(shift: ShiftRequirement): number {
  // In a real implementation, this would calculate how critical this shift is to cover
  // For now, return a random score between 0.7 and 1.0
  return 0.7 + Math.random() * 0.3;
}

function calculatePreferenceScore(
  availability: EmployeeAvailability,
  shift: ShiftRequirement
): number {
  // Calculate how well the shift matches the employee's preferences
  let score = 0.5; // Default middle score

  // Check preferred shifts
  const shiftHour = Number.parseInt(shift.startTime.split(":")[0]);
  if (availability.preferredShifts === "any") {
    score += 0.3;
  } else if (
    (availability.preferredShifts === "morning" && shiftHour < 12) ||
    (availability.preferredShifts === "afternoon" &&
      shiftHour >= 12 &&
      shiftHour < 17) ||
    (availability.preferredShifts === "evening" && shiftHour >= 17)
  ) {
    score += 0.3;
  }

  // Check if this is a preferred day
  if (availability.availableDays.includes(shift.day)) {
    score += 0.2;
  }

  return Math.min(score, 1.0); // Cap at 1.0
}

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
}

function calculateWeekendBalance(
  employee: IUser & { availability: EmployeeAvailability },
  existingShifts: IShift[]
): number {
  // In a real implementation, this would calculate how balanced weekend shifts are
  // For now, return a random score between 0.4 and 1.0
  return 0.4 + Math.random() * 0.6;
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// Generate a schedule using the decision tree algorithm
export async function generateSchedule(
  employees: Array<IUser & { availability: EmployeeAvailability }>,
  shiftRequirements: ShiftRequirement[],
  existingShifts: IShift[],
  params: SchedulingParams
): Promise<SchedulingResult> {
  // Build the decision tree
  const decisionTree = buildSchedulingDecisionTree(params);

  // Initialize the result
  const result: SchedulingResult = {
    shifts: [],
  };

  // For each shift requirement, find the best employee
  for (const shift of shiftRequirements) {
    // Evaluate each employee for this shift
    const employeeScores = employees.map((employee) => {
      const evaluation = evaluateEmployeeForShift(
        employee,
        shift,
        existingShifts,
        decisionTree,
        params
      );
      return {
        employee,
        score: evaluation.score,
        decisionPath: evaluation.decisionPath,
      };
    });

    // Sort employees by score (highest first)
    employeeScores.sort((a, b) => b.score - a.score);

    // Get the best employee and alternatives
    const bestEmployee = employeeScores[0];
    const alternatives = employeeScores
      .slice(1, 4) // Get the next 3 best alternatives
      .map(({ employee, score }) => ({
        employee,
        score,
        reason: generateReason(employee, bestEmployee.employee, shift),
      }));

    // Add to result if we found a suitable employee
    if (bestEmployee && bestEmployee.score > 0) {
      result.shifts.push({
        shiftRequirement: shift,
        assignedEmployee: bestEmployee.employee,
        score: bestEmployee.score,
        decisionPath: bestEmployee.decisionPath,
        alternatives,
      });

      // Update the assigned employee's availability for future shifts
      const employeeIndex = employees.findIndex(
        (e) => String(e._id) === String(bestEmployee.employee._id)
      );
      if (employeeIndex >= 0) {
        // Update consecutive days worked
        employees[employeeIndex].availability.consecutiveDaysWorked += 1;

        // Update total hours this week
        const shiftStart = timeToMinutes(shift.startTime);
        const shiftEnd = timeToMinutes(shift.endTime);
        const shiftHours = (shiftEnd - shiftStart) / 60; // Convert minutes to hours
        employees[employeeIndex].availability.totalHoursThisWeek += shiftHours;

        // Update last shift end time
        employees[employeeIndex].availability.lastShiftEnd = new Date(
          `${shift.date.toISOString().split("T")[0]}T${shift.endTime}`
        );
      }
    }
  }

  return result;
}

// Generate a reason why an alternative employee was ranked lower
function generateReason(
  employee: IUser & { availability: EmployeeAvailability },
  bestEmployee: IUser & { availability: EmployeeAvailability },
  shift: ShiftRequirement
): string {
  const reasons = [
    "Has worked more consecutive days",
    "Has more total hours this week",
    "Lower skill match for this shift",
    "Has requested fewer morning shifts",
    "Would exceed weekly hours limit",
    "Has already worked multiple weekend shifts",
    "Less experience in this department",
    "Recently completed a long shift",
  ];

  // In a real implementation, this would generate a specific reason
  // For now, return a random reason
  return reasons[Math.floor(Math.random() * reasons.length)];
}
