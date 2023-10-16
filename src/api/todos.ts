import type { Todo } from '../types/Todo';
import { client } from '../utils/httpClient';

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=9922`);
};

export const createTodo = (title: string) => {
  return client.post<Todo>('/todos', {
    title,
    completed: false,
    userId: 9922,
  });
};

export const updateTodo = ({ id, title, completed }: Todo) => {
  return client.patch<Todo>(`/todos/${id}`, {
    title,
    completed,
  });
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};
