import { Request, Response } from "express";
import { Lead } from "../types/lead";
import LeadModel from "../models/leadModel";
import { validationResult } from "express-validator";

export const createLead = async (req: Request, res: Response): Promise<void> => {
    try {      
        const leadData: Lead = {
            estateType: req.body.estateType,
            fullName: req.body.fullName,
            phone: req.body.phone,
            email: req.body.email,
            region: req.body.region,
            district: req.body.district, 
        };

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                success: false,
                message: errors.array()[0].msg,
            });
            return;
        }
        const lead = new LeadModel(leadData);
        const saveLead = await lead.save();

        res.status(201).json({
            success: true,
            data: saveLead,
            message: "Lead created successfully",
        });
    } catch (error) {
        console.error("Error creating lead:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
} 