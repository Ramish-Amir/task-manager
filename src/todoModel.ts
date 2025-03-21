interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

let todos: Todo[] = [];
let nextId = 1;

export const getTodos = (): Todo[] => todos;
export const addTodo = (text: string): Todo => {
  const todo: Todo = { id: nextId++, text, completed: false };
  todos.push(todo);
  return todo;
};
export const updateTodo = (id: number, updates: Partial<Todo>): Todo | null => {
  const todo = todos.find((t) => t.id === id);
  if (!todo) return null;
  Object.assign(todo, updates);
  return todo;
};
export const deleteTodo = (id: number): boolean => {
  const initialLength = todos.length;
  todos = todos.filter((t) => t.id !== id);
  return todos.length < initialLength;
};
export const resetTodos = () => {
  todos = [];
  nextId = 1;
}; // For testing
