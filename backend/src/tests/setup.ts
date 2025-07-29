import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { after } from 'node:test';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterEach(() => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        collection.deleteMany({});
    }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
