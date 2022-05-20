import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TodoData } from '../../TodoData';

export const cleanAction = createAction<void, string>('cleanAction');

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type FetchTodoError = {
  message: string;
};

export const fetchTodoList = createAsyncThunk<TodoData[], number, { rejectValue: FetchTodoError }>(
  'todos/fetch',
  async (limit: number, thunkApi) => {
    try {
      // Fetch the backend endpoint:
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos?limit=${limit}`);

      // Check if status is not okay:
      if (response.status !== 200) {
        // Return the error message:
        return thunkApi.rejectWithValue({ message: 'Failed to fetch todo list.' });
      } else {
        // Get the JSON from the response:
        const data: Todo[] = await response.json();

        // Return result:
        return data.map((todo: Todo) => TodoData.withTodo(todo));
      }
    } catch (err) {
      // Return the error message:
      return thunkApi.rejectWithValue({ message: err.message ?? 'Failed to fetch todo list.' });
    }
  }
);
