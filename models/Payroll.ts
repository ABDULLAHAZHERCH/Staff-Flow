// models/Payroll.ts
import mongoose, { Schema, type Document } from "mongoose"
import type { IUser } from "./User"
import type { IShift } from "./Shift"

export interface IPayroll extends Document {
  employee: IUser["_id"]
  manager: IUser["_id"]
  startDate: Date
  endDate: Date
  shifts: IShift["_id"][]
  totalHours: number
  totalPay: number
  status: "pending" | "processed" | "paid"
  paymentDate?: Date
  paymentMethod?: string
  notes?: string
}

const PayrollSchema = new Schema<IPayroll>(
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
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    shifts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Shift",
      },
    ],
    totalHours: {
      type: Number,
      required: [true, "Total hours is required"],
    },
    totalPay: {
      type: Number,
      required: [true, "Total pay is required"],
    },
    status: {
      type: String,
      enum: ["pending", "processed", "paid"],
      default: "pending",
    },
    paymentDate: {
      type: Date,
    },
    paymentMethod: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Payroll || mongoose.model<IPayroll>("Payroll", PayrollSchema)
