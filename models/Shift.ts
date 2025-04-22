// models/Shift.ts
import mongoose, { Schema, type Document } from "mongoose"
import type { IUser } from "./User"

export interface IShift extends Document {
  employee: IUser["_id"]
  manager: IUser["_id"]
  startTime: Date
  endTime: Date
  status: "scheduled" | "completed" | "missed" | "cancelled"
  location: string
  notes?: string
  hourlyRate: number
  totalHours?: number
  totalPay?: number
}

const ShiftSchema = new Schema<IShift>(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Employee is required"],
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Manager is required"],
    },
    startTime: {
      type: Date,
      required: [true, "Start time is required"],
    },
    endTime: {
      type: Date,
      required: [true, "End time is required"],
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "missed", "cancelled"],
      default: "scheduled",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    notes: {
      type: String,
    },
    hourlyRate: {
      type: Number,
      required: [true, "Hourly rate is required"],
    },
    totalHours: {
      type: Number,
    },
    totalPay: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
)

// Calculate total hours and pay before saving
ShiftSchema.pre("save", function (next) {
  if (this.startTime && this.endTime) {
    // Calculate total hours (in hours)
    const startTime = new Date(this.startTime).getTime()
    const endTime = new Date(this.endTime).getTime()
    const diffInMs = endTime - startTime
    const diffInHours = diffInMs / (1000 * 60 * 60)

    this.totalHours = Number.parseFloat(diffInHours.toFixed(2))
    this.totalPay = Number.parseFloat((this.totalHours * this.hourlyRate).toFixed(2))
  }
  next()
})

export default mongoose.models.Shift || mongoose.model<IShift>("Shift", ShiftSchema)
