import express from 'express';
import {
  getAllTodos,
  createTodo,
  updateTodoById,
  deleteTodoById,
} from './todoService';

const router = express.Router();

router.get('/todos', (req, res) => {
  res.json(getAllTodos());
});

router.post('/todos', (req, res) => {
  try {
    const { text } = req.body;
    const todo = createTodo(text);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.put('/todos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { text, completed } = req.body;
    const updatedTodo = updateTodoById(id, text, completed);
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.delete('/todos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    deleteTodoById(id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
});

export default router;
