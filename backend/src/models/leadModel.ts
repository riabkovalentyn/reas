import mongoose, { Schema, Document} from "mongoose";
import type { Lead } from "../types/lead";

export interface LeadDoc extends Lead, Document {}

const leadSchema: Schema = new Schema({
    estateType: {
        type: String,
        required: [true, "Estate type is required"]
    },
    fullName: {
        type: String,
        required: [true, "Full name is required"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    region: {
        type: String,
        required: [true, "Region is required"]
    },
    district: {
        type: String,
        required: [true, "District is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model<LeadDoc>("Lead", leadSchema);