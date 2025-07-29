import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
import LeadModel from '../../models/leadModel';

describe('Lead Routes', () => {
  const validLeadData = {
    estateType: 'Apartment',
    fullname: 'John Doe',
    phone: '+1234567890',
    email: 'john.doe@example.com',
    region: 'Central',
    district: 'Downtown'
  };

  // Clear the database before each test
  beforeEach(async () => {
    await LeadModel.deleteMany({});
  });

  describe('POST /lead', () => {
    it('should create a new lead with valid data', async () => {
      const response = await request(app)
        .post('/lead')
        .send(validLeadData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.estateType).toBe(validLeadData.estateType);
      expect(response.body.data.fullname).toBe(validLeadData.fullname);
      expect(response.body.data.email).toBe(validLeadData.email);

      const leadCount = await LeadModel.countDocuments();
      expect(leadCount).toBe(1);
    });

    it('should return validation errors for invalid data', async () => {
      const invalidData = {
        estateType: '', 
        fullname: 'John Doe',
        phone: '+1234567890',
        email: 'invalid-email',
        region: 'Central',
        district: 'Downtown'
      };

      const response = await request(app)
        .post('/lead')
        .send(invalidData)
        .expect(400);

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.length).toBeGreaterThan(0);
      
      const errors = response.body.errors.map((err: any) => err.path);
      expect(errors).toContain('estateType');
      expect(errors).toContain('email');

      
      const leadCount = await LeadModel.countDocuments();
      expect(leadCount).toBe(0);
    });
  });

  describe('PUT /lead', () => {
    it('should create a new lead with valid data using PUT method', async () => {
      const response = await request(app)
        .put('/lead')
        .send(validLeadData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.estateType).toBe(validLeadData.estateType);
      expect(response.body.data.fullname).toBe(validLeadData.fullname);
      expect(response.body.data.email).toBe(validLeadData.email);

      
      const leadCount = await LeadModel.countDocuments();
      expect(leadCount).toBe(1);
    });

    it('should return validation errors for invalid data using PUT method', async () => {
      const invalidData = {
        // Missing required fields
        phone: '+1234567890',
        email: 'john.doe@example.com'
      };

      const response = await request(app)
        .put('/lead')
        .send(invalidData)
        .expect(400);

      expect(response.body.errors).toBeDefined();
      expect(response.body.errors.length).toBeGreaterThan(0);

      
      const leadCount = await LeadModel.countDocuments();
      expect(leadCount).toBe(0);
    });
  });
});