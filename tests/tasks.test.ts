import request from 'supertest';
import app from '../src/api/app';

describe('Rutas de Tareas General', () => {
  it('should return unauthorized without token', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});
