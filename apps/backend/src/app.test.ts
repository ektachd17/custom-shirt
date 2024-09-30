import request from 'supertest';
import { app, server } from './app'; 

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-order-id'), // Mock uuid to always return 'test-order-id'
}));

describe('T-shirt Order API', () => {
  afterAll((done) => {
    // Close the server after all tests have run to prevent open handles
    server.close(done);
  });

  it('should create a new order', async () => {
    const newOrder = {
      color: 'black',
      material: 'Light Cotton',
      customText: 'Test Shirt',
      productType: 't-shirt',
    };

    const response = await request(app)
      .post('/api/orders')  // Ensure this route exists in the app
      .send(newOrder)
      .expect(200); // Expect status 200 (OK)

    // Check response data
    expect(response.body.message).toBe('Order saved successfully');
    expect(response.body.orderId).toBe('test-order-id');

    // Check if the order is stored correctly
    expect(response.body.orders['test-order-id']).toEqual({
      orderId: 'test-order-id',
      color: 'black',
      material: 'Light Cotton',
      customText: 'Test Shirt',
      productType: 't-shirt',
    });
  });

  it('should retrieve an order by ID', async () => {
    const response = await request(app)
      .get('/api/orders/test-order-id')  // Ensure this route exists in the app
      .expect(200); // Expect status 200 (OK)

    // Check the order data
    expect(response.body).toEqual({
      orderId: 'test-order-id',
      color: 'black',
      material: 'Light Cotton',
      customText: 'Test Shirt',
      productType: 't-shirt',
    });
  });

  it('should return 404 for non-existent order', async () => {
    const response = await request(app)
      .get('/api/orders/non-existent-id')
      .expect(404); // Expect status 404 (Not Found)

    expect(response.body.message).toBe('Order not found');
  });
});
