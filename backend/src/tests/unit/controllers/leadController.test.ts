import { Request, Response } from 'express';
import { createLead } from '../../../controllers/leadController';
import LeadModel from '../../../models/leadModel';

// Mock express-validator
jest.mock('express-validator', () => ({
  validationResult: jest.fn().mockImplementation(() => ({
    isEmpty: () => true,
    array: () => []
  }))
}));

describe('Lead Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any = {};

  beforeEach(() => {
    mockRequest = {
      body: {
        estateType: 'House',
        fullname: 'Jane Smith',
        phone: '+9876543210',
        email: 'jane.smith@example.com',
        region: 'Eastern',
        district: 'Suburb'
      }
    };
    
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation(result => {
        responseObject = result;
        return mockResponse;
      })
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new lead successfully', async () => {
    // Mock the save method of LeadModel
    const saveSpy = jest.spyOn(LeadModel.prototype, 'save')
      .mockImplementationOnce(() => Promise.resolve({
        ...mockRequest.body,
        _id: '123456789',
        createdAt: new Date()
      }));

    await createLead(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(responseObject.success).toBe(true);
    expect(responseObject.data).toBeDefined();
    expect(responseObject.data.estateType).toBe(mockRequest.body.estateType);
    
    saveSpy.mockRestore();
  });

  it('should return 500 when an error occurs', async () => {
    const saveSpy = jest.spyOn(LeadModel.prototype, 'save')
      .mockImplementationOnce(() => Promise.reject(new Error('Database error')));

    await createLead(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(responseObject.success).toBe(false);
    expect(responseObject.message).toBe('Internal server error');
  });
});