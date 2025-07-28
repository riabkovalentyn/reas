import express from "express";
import { check } from "express-validator";
import * as leadController from "../controllers/leadController";

const router = express.Router();

const validateLead = [
    check("estateType").notEmpty().withMessage("Estate type is required"),
    check("fullName").notEmpty().withMessage("Full name is required"),
    check("phone").notEmpty().withMessage("Phone number is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("region").notEmpty().withMessage("Region is required"),
    check("district").notEmpty().withMessage("District is required"),
]

router.put("/lead", validateLead, leadController.createLead);

export default router;