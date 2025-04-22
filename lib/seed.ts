// lib/seed.ts
import dbConnect from "./mongodb";
import User from "../models/User";
import Shift from "../models/Shift";
import Notification from "../models/Notification";
import { hash } from "bcryptjs";

export async function seedUsers() {
  await dbConnect();

  // Clear existing data
  await User.deleteMany({});
  await Shift.deleteMany({});
  await Notification.deleteMany({});

  console.log("Database cleared");

  // Create manager user
  const managerPassword = await hash("manager123", 10);
  const manager = await User.create({
    email: "manager@staffflow.com",
    password: managerPassword,
    firstName: "John",
    lastName: "Manager",
    role: "manager",
    department: "Operations",
    position: "Shift Manager",
    status: "active",
  });

  console.log("Manager created:", manager.email);

  // Create employee users with more diversity
  const employeePassword = await hash("employee123", 10);

  // Original employees
  const employee1 = await User.create({
    email: "employee@staffflow.com",
    password: employeePassword,
    firstName: "Jane",
    lastName: "Employee",
    role: "employee",
    department: "Operations",
    position: "Staff Member",
    status: "active",
  });

  const employee2 = await User.create({
    email: "alex@staffflow.com",
    password: employeePassword,
    firstName: "Alex",
    lastName: "Smith",
    role: "employee",
    department: "Sales",
    position: "Sales Associate",
    status: "active",
  });

  // Additional employees
  const employee3 = await User.create({
    email: "michael@staffflow.com",
    password: employeePassword,
    firstName: "Michael",
    lastName: "Johnson",
    role: "employee",
    department: "Customer Service",
    position: "Customer Support Rep",
    status: "active",
  });

  const employee4 = await User.create({
    email: "sarah@staffflow.com",
    password: employeePassword,
    firstName: "Sarah",
    lastName: "Williams",
    role: "employee",
    department: "Operations",
    position: "Team Lead",
    status: "active",
  });

  const employee5 = await User.create({
    email: "david@staffflow.com",
    password: employeePassword,
    firstName: "David",
    lastName: "Garcia",
    role: "employee",
    department: "Sales",
    position: "Senior Sales Associate",
    status: "active",
  });

  const employee6 = await User.create({
    email: "emma@staffflow.com",
    password: employeePassword,
    firstName: "Emma",
    lastName: "Chen",
    role: "employee",
    department: "Marketing",
    position: "Marketing Assistant",
    status: "active",
  });

  const employee7 = await User.create({
    email: "james@staffflow.com",
    password: employeePassword,
    firstName: "James",
    lastName: "Rodriguez",
    role: "employee",
    department: "Operations",
    position: "Inventory Specialist",
    status: "active",
  });

  const employee8 = await User.create({
    email: "olivia@staffflow.com",
    password: employeePassword,
    firstName: "Olivia",
    lastName: "Taylor",
    role: "employee",
    department: "Customer Service",
    position: "Service Desk Lead",
    status: "inactive",
  });

  console.log("All employees created");

  // Date helpers
  const now = new Date();

  // Create date helpers for different time periods
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayAfterTomorrow = new Date(now);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  const threeDaysLater = new Date(now);
  threeDaysLater.setDate(threeDaysLater.getDate() + 3);

  const fourDaysLater = new Date(now);
  fourDaysLater.setDate(fourDaysLater.getDate() + 4);

  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const twoWeeksLater = new Date(now);
  twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);

  // Store all shifts
  const shifts = [];

  // Create past shifts (completed)
  const pastShift1 = await Shift.create({
    employee: employee1._id,
    manager: manager._id,
    startTime: new Date(yesterday.setHours(9, 0, 0, 0)),
    endTime: new Date(yesterday.setHours(17, 0, 0, 0)),
    location: "Main Store",
    hourlyRate: 15,
    status: "completed",
    notes: "Helped with inventory count",
  });
  shifts.push(pastShift1);

  const pastShift2 = await Shift.create({
    employee: employee2._id,
    manager: manager._id,
    startTime: new Date(yesterday.setHours(12, 0, 0, 0)),
    endTime: new Date(yesterday.setHours(20, 0, 0, 0)),
    location: "Downtown Branch",
    hourlyRate: 16,
    status: "completed",
    notes: "Closed the store",
  });
  shifts.push(pastShift2);

  // Original shifts for employee1
  const shift1 = await Shift.create({
    employee: employee1._id,
    manager: manager._id,
    startTime: new Date(tomorrow.setHours(9, 0, 0, 0)),
    endTime: new Date(tomorrow.setHours(17, 0, 0, 0)),
    location: "Main Store",
    hourlyRate: 15,
    status: "scheduled",
  });
  shifts.push(shift1);

  const shift2 = await Shift.create({
    employee: employee1._id,
    manager: manager._id,
    startTime: new Date(dayAfterTomorrow.setHours(9, 0, 0, 0)),
    endTime: new Date(dayAfterTomorrow.setHours(17, 0, 0, 0)),
    location: "Main Store",
    hourlyRate: 15,
    status: "scheduled",
  });
  shifts.push(shift2);

  // Original shifts for employee2
  const shift3 = await Shift.create({
    employee: employee2._id,
    manager: manager._id,
    startTime: new Date(tomorrow.setHours(12, 0, 0, 0)),
    endTime: new Date(tomorrow.setHours(20, 0, 0, 0)),
    location: "Downtown Branch",
    hourlyRate: 16,
    status: "scheduled",
  });
  shifts.push(shift3);

  const shift4 = await Shift.create({
    employee: employee2._id,
    manager: manager._id,
    startTime: new Date(nextWeek.setHours(9, 0, 0, 0)),
    endTime: new Date(nextWeek.setHours(17, 0, 0, 0)),
    location: "Downtown Branch",
    hourlyRate: 16,
    status: "scheduled",
  });
  shifts.push(shift4);

  // Additional shifts for new employees
  const shift5 = await Shift.create({
    employee: employee3._id,
    manager: manager._id,
    startTime: new Date(tomorrow.setHours(10, 0, 0, 0)),
    endTime: new Date(tomorrow.setHours(18, 0, 0, 0)),
    location: "Main Store",
    hourlyRate: 15.5,
    status: "scheduled",
  });
  shifts.push(shift5);

  const shift6 = await Shift.create({
    employee: employee3._id,
    manager: manager._id,
    startTime: new Date(dayAfterTomorrow.setHours(10, 0, 0, 0)),
    endTime: new Date(dayAfterTomorrow.setHours(18, 0, 0, 0)),
    location: "Main Store",
    hourlyRate: 15.5,
    status: "scheduled",
  });
  shifts.push(shift6);

  const shift7 = await Shift.create({
    employee: employee4._id,
    manager: manager._id,
    startTime: new Date(dayAfterTomorrow.setHours(8, 0, 0, 0)),
    endTime: new Date(dayAfterTomorrow.setHours(16, 0, 0, 0)),
    location: "Downtown Branch",
    hourlyRate: 17,
    status: "scheduled",
  });
  shifts.push(shift7);

  const shift8 = await Shift.create({
    employee: employee4._id,
    manager: manager._id,
    startTime: new Date(threeDaysLater.setHours(8, 0, 0, 0)),
    endTime: new Date(threeDaysLater.setHours(16, 0, 0, 0)),
    location: "Downtown Branch",
    hourlyRate: 17,
    status: "scheduled",
  });
  shifts.push(shift8);

  const shift9 = await Shift.create({
    employee: employee5._id,
    manager: manager._id,
    startTime: new Date(tomorrow.setHours(12, 0, 0, 0)),
    endTime: new Date(tomorrow.setHours(20, 0, 0, 0)),
    location: "Suburban Mall",
    hourlyRate: 16.5,
    status: "scheduled",
  });
  shifts.push(shift9);

  const shift10 = await Shift.create({
    employee: employee5._id,
    manager: manager._id,
    startTime: new Date(fourDaysLater.setHours(12, 0, 0, 0)),
    endTime: new Date(fourDaysLater.setHours(20, 0, 0, 0)),
    location: "Suburban Mall",
    hourlyRate: 16.5,
    status: "scheduled",
  });
  shifts.push(shift10);

  // Fix: Change to valid status
  const pendingShift = await Shift.create({
    employee: employee6._id,
    manager: manager._id,
    startTime: new Date(threeDaysLater.setHours(9, 0, 0, 0)),
    endTime: new Date(threeDaysLater.setHours(17, 0, 0, 0)),
    location: "Main Store",
    hourlyRate: 15,
    status: "scheduled",
    notes: "Waiting for employee confirmation",
  });
  shifts.push(pendingShift);

  // Add a missed shift
  const missedShift = await Shift.create({
    employee: employee7._id,
    manager: manager._id,
    startTime: new Date(yesterday.setHours(8, 0, 0, 0)),
    endTime: new Date(yesterday.setHours(16, 0, 0, 0)),
    location: "Downtown Branch",
    hourlyRate: 15.75,
    status: "missed",
    notes: "Employee did not show up",
  });
  shifts.push(missedShift);

  const cancelledShift = await Shift.create({
    employee: employee7._id,
    manager: manager._id,
    startTime: new Date(tomorrow.setHours(12, 0, 0, 0)),
    endTime: new Date(tomorrow.setHours(20, 0, 0, 0)),
    location: "Downtown Branch",
    hourlyRate: 15.75,
    status: "cancelled",
    notes: "Cancelled due to low customer traffic forecast",
  });
  shifts.push(cancelledShift);

  // Future shifts
  const futureShift1 = await Shift.create({
    employee: employee6._id,
    manager: manager._id,
    startTime: new Date(nextWeek.setHours(9, 0, 0, 0)),
    endTime: new Date(nextWeek.setHours(17, 0, 0, 0)),
    location: "Main Store",
    hourlyRate: 15,
    status: "scheduled",
  });
  shifts.push(futureShift1);

  const futureShift2 = await Shift.create({
    employee: employee7._id,
    manager: manager._id,
    startTime: new Date(twoWeeksLater.setHours(10, 0, 0, 0)),
    endTime: new Date(twoWeeksLater.setHours(18, 0, 0, 0)),
    location: "Suburban Mall",
    hourlyRate: 15.75,
    status: "scheduled",
  });
  shifts.push(futureShift2);

  console.log("All shifts created");

  // Create notifications for original shifts - using corrected notification types
  await Notification.create({
    recipient: employee1._id,
    sender: manager._id,
    type: "shift_assigned",
    title: "New Shift Assigned",
    message: `You have been assigned a new shift on ${new Date(
      shift1.startTime
    ).toLocaleDateString()} from ${new Date(
      shift1.startTime
    ).toLocaleTimeString()} to ${new Date(
      shift1.endTime
    ).toLocaleTimeString()}.`,
    read: false,
    relatedId: shift1._id,
    relatedModel: "Shift",
  });

  await Notification.create({
    recipient: employee1._id,
    sender: manager._id,
    type: "shift_assigned",
    title: "New Shift Assigned",
    message: `You have been assigned a new shift on ${new Date(
      shift2.startTime
    ).toLocaleDateString()} from ${new Date(
      shift2.startTime
    ).toLocaleTimeString()} to ${new Date(
      shift2.endTime
    ).toLocaleTimeString()}.`,
    read: false,
    relatedId: shift2._id,
    relatedModel: "Shift",
  });

  await Notification.create({
    recipient: employee2._id,
    sender: manager._id,
    type: "shift_assigned",
    title: "New Shift Assigned",
    message: `You have been assigned a new shift on ${new Date(
      shift3.startTime
    ).toLocaleDateString()} from ${new Date(
      shift3.startTime
    ).toLocaleTimeString()} to ${new Date(
      shift3.endTime
    ).toLocaleTimeString()}.`,
    read: false,
    relatedId: shift3._id,
    relatedModel: "Shift",
  });

  await Notification.create({
    recipient: employee2._id,
    sender: manager._id,
    type: "shift_assigned",
    title: "New Shift Assigned",
    message: `You have been assigned a new shift on ${new Date(
      shift4.startTime
    ).toLocaleDateString()} from ${new Date(
      shift4.startTime
    ).toLocaleTimeString()} to ${new Date(
      shift4.endTime
    ).toLocaleTimeString()}.`,
    read: false,
    relatedId: shift4._id,
    relatedModel: "Shift",
  });

  // Additional notifications for all employees with corrected types
  // 1. System notifications - changed to "other"
  await Notification.create({
    recipient: employee3._id,
    sender: manager._id,
    type: "other", // Changed from "system_update"
    title: "System Maintenance",
    message:
      "The system will be down for maintenance this Saturday between 2-4 AM.",
    read: true,
    relatedId: null,
    relatedModel: null,
  });

  await Notification.create({
    recipient: employee4._id,
    sender: manager._id,
    type: "other", // Changed from "system_update"
    title: "System Maintenance",
    message:
      "The system will be down for maintenance this Saturday between 2-4 AM.",
    read: false,
    relatedId: null,
    relatedModel: null,
  });

  // 2. Shift reminder notifications - changed to "other"
  await Notification.create({
    recipient: employee3._id,
    sender: manager._id,
    type: "other", // Changed from "shift_reminder"
    title: "Upcoming Shift Reminder",
    message: `Reminder: You have a shift tomorrow at ${new Date(
      shift5.startTime
    ).toLocaleTimeString()} at ${shift5.location}.`,
    read: false,
    relatedId: shift5._id,
    relatedModel: "Shift",
  });

  await Notification.create({
    recipient: employee4._id,
    sender: manager._id,
    type: "other", // Changed from "shift_reminder"
    title: "Upcoming Shift Reminder",
    message: `Reminder: You have a shift tomorrow at ${new Date(
      shift7.startTime
    ).toLocaleTimeString()} at ${shift7.location}.`,
    read: true,
    relatedId: shift7._id,
    relatedModel: "Shift",
  });

  // 3. Shift change notifications - changed to "shift_updated"
  await Notification.create({
    recipient: employee5._id,
    sender: manager._id,
    type: "shift_updated", // Changed from "shift_changed"
    title: "Shift Time Updated",
    message: `Your shift on ${new Date(
      shift9.startTime
    ).toLocaleDateString()} has been updated. Please check the new details.`,
    read: false,
    relatedId: shift9._id,
    relatedModel: "Shift",
  });

  // 4. Shift cancellation notification
  await Notification.create({
    recipient: employee7._id,
    sender: manager._id,
    type: "shift_cancelled", // This one was already correct
    title: "Shift Cancelled",
    message: `Your shift on ${new Date(
      cancelledShift.startTime
    ).toLocaleDateString()} has been cancelled due to low customer traffic forecast.`,
    read: true,
    relatedId: cancelledShift._id,
    relatedModel: "Shift",
  });

  // 5. Missed shift notification - changed to "other"
  await Notification.create({
    recipient: employee7._id,
    sender: manager._id,
    type: "other", // Changed from "shift_missed"
    title: "Missed Shift",
    message: `You missed your scheduled shift on ${new Date(
      missedShift.startTime
    ).toLocaleDateString()}. Please contact your manager.`,
    read: false,
    relatedId: missedShift._id,
    relatedModel: "Shift",
  });

  // 6. General announcements
  await Notification.create({
    recipient: employee1._id,
    sender: manager._id,
    type: "announcement", // This one was already correct
    title: "Team Meeting",
    message:
      "There will be a team meeting next Friday at 2 PM. Attendance is mandatory.",
    read: false,
    relatedId: null,
    relatedModel: null,
  });

  await Notification.create({
    recipient: employee2._id,
    sender: manager._id,
    type: "announcement", // This one was already correct
    title: "Team Meeting",
    message:
      "There will be a team meeting next Friday at 2 PM. Attendance is mandatory.",
    read: true,
    relatedId: null,
    relatedModel: null,
  });

  await Notification.create({
    recipient: employee3._id,
    sender: manager._id,
    type: "announcement", // This one was already correct
    title: "Team Meeting",
    message:
      "There will be a team meeting next Friday at 2 PM. Attendance is mandatory.",
    read: false,
    relatedId: null,
    relatedModel: null,
  });

  // 7. Performance feedback - changed to "other"
  await Notification.create({
    recipient: employee5._id,
    sender: manager._id,
    type: "other", // Changed from "feedback"
    title: "Performance Feedback",
    message:
      "Great job on exceeding your sales target last week! Keep up the good work.",
    read: false,
    relatedId: null,
    relatedModel: null,
  });

  await Notification.create({
    recipient: employee6._id,
    sender: manager._id,
    type: "other", // Changed from "feedback"
    title: "Performance Feedback",
    message:
      "Your marketing campaign idea was implemented and has shown great results so far.",
    read: true,
    relatedId: null,
    relatedModel: null,
  });

  // 8. Add a payroll_processed notification
  await Notification.create({
    recipient: employee1._id,
    sender: manager._id,
    type: "payroll_processed",
    title: "Payroll Processed",
    message:
      "Your payroll for the previous period has been processed. Payment will be deposited in the next 24-48 hours.",
    read: false,
    relatedId: null,
    relatedModel: null,
  });

  await Notification.create({
    recipient: employee2._id,
    sender: manager._id,
    type: "payroll_processed",
    title: "Payroll Processed",
    message:
      "Your payroll for the previous period has been processed. Payment will be deposited in the next 24-48 hours.",
    read: true,
    relatedId: null,
    relatedModel: null,
  });

  console.log("All notifications created");

  return {
    manager,
    employees: [
      employee1,
      employee2,
      employee3,
      employee4,
      employee5,
      employee6,
      employee7,
      employee8,
    ],
    shifts: shifts,
  };
}
