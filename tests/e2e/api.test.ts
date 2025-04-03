import request from 'supertest';
import app from '../../src/app';
import { resetTodos } from '../../src/todoModel';

describe('Todo API E2E Tests', () => {
  beforeEach(() => {
    resetTodos();
  });

  it('should get all todos (empty initially)', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('should create a todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .send({ text: 'New Todo' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ text: 'New Todo', completed: false });
  });

  it('should update a todo', async () => {
    const createRes = await request(app)
      .post('/api/todos')
      .send({ text: 'Todo' });
    const id = createRes.body.id;
    /**
     * Sends a PUT request to update a specific todo item by its ID.
     *
     * @constant {Response} updateRes - The response object returned from the API request.
     * @param {string} id - The unique identifier of the todo item to be updated.
     * @param {Object} payload - The data to update the todo item with.
     * @param {string} payload.text - The updated text for the todo item.
     * @param {boolean} payload.completed - The updated completion status of the todo item.
     * @returns {Promise<Response>} The response from the server after attempting to update the todo item.
     */
    const updateRes = await request(app)
      .put(`/api/todos/${id}`)
      .send({ text: 'Updated Todo', completed: true });
    expect(updateRes.status).toBe(200);
    expect(updateRes.body).toMatchObject({
      text: 'Updated Todo',
      completed: true,
    });
  });

  it('should delete a todo', async () => {
    const createRes = await request(app)
      .post('/api/todos')
      .send({ text: 'Todo' });
    const id = createRes.body.id;
    const deleteRes = await request(app).delete(`/api/todos/${id}`);
    expect(deleteRes.status).toBe(204);
  });
});
