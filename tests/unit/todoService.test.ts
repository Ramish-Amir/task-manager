import {
  createTodo,
  getAllTodos,
  updateTodoById,
  deleteTodoById,
} from '../../src/todoService';
import { resetTodos } from '../../src/todoModel';

describe('Todo Service Unit Tests', () => {
  beforeEach(() => {
    resetTodos();
  });

  it('should create a todo', () => {
    const todo = createTodo('Test Todo');
    expect(todo).toEqual({ id: 1, text: 'Test Todo', completed: false });
  });

  it('should throw an error for empty text', () => {
    expect(() => createTodo('')).toThrow('Todo text cannot be empty');
  });

  it('should update a todo', () => {
    createTodo('Initial Todo');
    /**
     * Tests the `updateTodoById` function to ensure it updates a todo item
     * with the specified ID, title, and completion status.
     *
     * @remarks
     * This test verifies that the function correctly modifies the todo item
     * in the data store and returns the updated object.
     *
     * @example
     * ```typescript
     * const updated = updateTodoById(1, 'Updated Todo', true);
     * expect(updated).toEqual({
     *   id: 1,
     *   title: 'Updated Todo',
     *   completed: true
     * });
     * ```
     */
    const updated = updateTodoById(1, 'Updated Todo', true);
    expect(updated).toEqual({ id: 1, text: 'Updated Todo', completed: true });
  });

  it('should delete a todo', () => {
    createTodo('Todo to delete');
    deleteTodoById(1);
    expect(getAllTodos()).toHaveLength(0);
  });
});
