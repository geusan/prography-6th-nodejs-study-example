import supertest from 'supertest';
import { app } from '../../src/app';

describe('Test Todo feature', () => {
  const client = supertest(app);

  test('create todo', async () => {
    const payload = {
      title: 'new Todo',
      description: 'description',
    }
    const res = await client
      .post('/todos')
      .send(payload)
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(payload);
  })

  test('get Todo', async () => {
    const res = await client
      .get(`/todos/${process.env.TEST_TODO_ID}`);
    expect(res.status).toBe(200);
  })
})