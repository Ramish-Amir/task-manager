import { getTodos, addTodo, updateTodo, deleteTodo } from "./todoModel";

export const getAllTodos = () => getTodos();

export const createTodo = (text: string) => {
  if (!text || text.trim() === "") {
    throw new Error("Todo text cannot be empty");
  }
  return addTodo(text);
};

export const updateTodoById = (
  id: number,
  text?: string,
  completed?: boolean
) => {
  const updates: Partial<{ text: string; completed: boolean }> = {};
  if (text !== undefined) {
    if (text.trim() === "") throw new Error("Todo text cannot be empty");
    updates.text = text;
  }
  if (completed !== undefined) updates.completed = completed;
  const updatedTodo = updateTodo(id, updates);
  if (!updatedTodo) throw new Error("Todo not found");
  return updatedTodo;
};

export const deleteTodoById = (id: number) => {
  if (!deleteTodo(id)) throw new Error("Todo not found");
};
