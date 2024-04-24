import request from "supertest";
import app from '../app';


test('protected route test', async () => {
    const response = await request(app).get('/api/test/should-be-logged-in');
    expect(response.status).toBe(401);
    expect(response.body.message).toEqual("Unauthorized");
});

test('check if post are available', async () => {
    const response = await request(app).get('/api/should-be-admin');
    expect(response.status).toBe(404);
});
