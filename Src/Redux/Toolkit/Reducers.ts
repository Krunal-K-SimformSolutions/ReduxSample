import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction, Draft } from '@reduxjs/toolkit';
import { TodoData } from '../../TodoData';
import { cleanAction } from './Actions';

interface InitialStateType {
  todoList: TodoData[];
}

const InitialState: InitialStateType = {
  todoList: []
};

function cleanSuccess(state: Draft<InitialStateType>): void {
  state.todoList = [];
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
  }
});

export const reducerToolkit = toolkitSlice.reducer;
export const ToolkitActions = { ...toolkitSlice.actions, cleanAction };
