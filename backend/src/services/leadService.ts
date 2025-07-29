// src/services/leadService.ts
import { Lead } from "../types/lead";
import LeadModel, { LeadDoc } from "../models/leadModel";


export class LeadService {

  public async createLead(leadData: Lead): Promise<LeadDoc> {
    const lead = new LeadModel(leadData);
    return await lead.save();
  }


  public mapRequestToLead(body: any): Lead {
    return {
      estateType: body.estateType,
      fullName: body.fullname,
      phone: body.phone,
      email: body.email,
      region: body.region,
      district: body.district,
    };
  }
}



export const leadService = new LeadService();