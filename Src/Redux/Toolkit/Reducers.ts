import { createSlice } from '@reduxjs/toolkit';
import type { FetchTodoError } from './Actions';
import type { PayloadAction, Draft } from '@reduxjs/toolkit';
import { TodoData } from '../../TodoData';
import { cleanAction, fetchTodoList } from './Actions';

interface InitialStateType {
  todoList: TodoData[];
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const InitialState: InitialStateType = {
  todoList: [],
  error: null,
  status: 'idle'
};

function cleanSuccess(state: Draft<InitialStateType>): void {
  state.todoList = [];
  state.error = null;
  state.status = 'idle';
}

function addTodoItem(state: Draft<InitialStateType>): void {
  state.todoList.push(TodoData.empty());
}

function updateTodoItem(state: Draft<InitialStateType>, action: PayloadAction<{ data: TodoData }>): void {
  const {
    payload: { data }
  } = action;
  const { todoList } = state;
  const index: number = todoList.findIndex((todo: TodoData) => todo.id === data.id);
  if (index !== -1) {
    state.todoList[index] = data;
  }
}

function deleteTodoItem(state: Draft<InitialStateType>, action: PayloadAction<{ id: number }>): void {
  const {
    payload: { id }
  } = action;
  const { todoList } = state;
  const tempList = todoList.filter((todo: TodoData) => todo.id !== id);
  state.todoList = tempList;
}

const toolkitSlice = createSlice({
  name: 'reducerToolkit',
  initialState: InitialState,
  reducers: {
    addTodoItem,
    updateTodoItem,
    deleteTodoItem
  },
  extraReducers: (builder) => {
    builder.addCase(cleanAction, cleanSuccess);

    builder.addCase(fetchTodoList.pending, (state: Draft<InitialStateType>) => {
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(fetchTodoList.fulfilled, (state: Draft<InitialStateType>, action: PayloadAction<TodoData[]>) => {
      if (action.payload) state.todoList = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(fetchTodoList.rejected, (state: Draft<InitialStateType>, action: PayloadAction<FetchTodoError>) => {
      if (action.payload) state.error = action.payload.message;
      state.status = 'failed';
    });
  }
});

export const reducerToolkit = toolkitSlice.reducer;
export const ToolkitActions = { ...toolkitSlice.actions, cleanAction, fetchTodoList };
