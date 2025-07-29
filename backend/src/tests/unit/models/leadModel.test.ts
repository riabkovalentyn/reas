import LeadModel from '../../../models/leadModel';

describe('Lead Model', () => {
  const validLeadData = {
    estateType: 'Apartment',
    fullname: 'John Doe',
    phone: '+1234567890',
    email: 'john.doe@example.com',
    region: 'Central',
    district: 'Downtown'
  };

  it('should create a valid lead', async () => {
    const lead = new LeadModel(validLeadData);
    const savedLead = await lead.save();
    
    expect(savedLead._id).toBeDefined();
    expect(savedLead.estateType).toBe(validLeadData.estateType);
    expect(savedLead.fullName).toBe(validLeadData.fullname);
    expect(savedLead.phone).toBe(validLeadData.phone);
    expect(savedLead.email).toBe(validLeadData.email);
    expect(savedLead.region).toBe(validLeadData.region);
    expect(savedLead.district).toBe(validLeadData.district);
    expect(savedLead.createdAt).toBeDefined();
  });

  it('should fail validation when required fields are missing', async () => {
    const invalidLeadData = {
    estateType: 'Jed',
    fullname: '+3506516',
    phone: 'Mike',
    email: 'john.doeexample.com',
    region: 'Anton',
    district: '+365489'

    };

    const lead = new LeadModel(invalidLeadData);
    
    await expect(lead.save()).rejects.toThrow();
  });

  it('should have a createdAt date by default', async () => {
    const lead = new LeadModel(validLeadData);
    const savedLead = await lead.save();
    
    expect(savedLead.createdAt).toBeInstanceOf(Date);
  });
});