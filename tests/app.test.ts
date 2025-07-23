import request from 'supertest';
import app from '../src/api/app';

describe('Pruebas GET Y POST', () => {
  it('GET /api/tasks sin token retorna 401', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Unauthorized');
  });

  it('POST /api/user sin email retorna 400', async () => {
    const res = await request(app).post('/api/user').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Email is required');
  });
});
