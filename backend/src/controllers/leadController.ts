import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { leadService } from "../services/leadService";
import { LeadDoc } from "../models/leadModel";

export const createLead = async (req: Request, res: Response): Promise<LeadDoc| void> => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
      return;
    }


    const leadData = leadService.mapRequestToLead(req.body);
    const savedLead = await leadService.createLead(leadData);


    res.status(201).json({
      success: true,
      data: savedLead,
      message: "Lead created successfully",
    });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Error creating lead",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};