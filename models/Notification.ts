// models/Notification.ts
import mongoose, { Schema, type Document } from "mongoose"
import type { IUser } from "./User"

export interface INotification extends Document {
  recipient: IUser["_id"]
  sender?: IUser["_id"]
  type: "shift_assigned" | "shift_updated" | "shift_cancelled" | "payroll_processed" | "announcement" | "other"
  title: string
  message: string
  read: boolean
  relatedId?: Schema.Types.ObjectId
  relatedModel?: string
}

const NotificationSchema = new Schema<INotification>(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Recipient is required"],
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["shift_assigned", "shift_updated", "shift_cancelled", "payroll_processed", "announcement", "other"],
      required: [true, "Notification type is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    read: {
      type: Boolean,
      default: false,
    },
    relatedId: {
      type: Schema.Types.ObjectId,
    },
    relatedModel: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Notification || mongoose.model<INotification>("Notification", NotificationSchema)
