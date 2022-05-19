import { createReducer } from 'reduxsauce';
import { TodoData } from '../../TodoData';
import { AddTodoAction, DeleteTodoAction, UpdateTodoAction, Types } from './Actions';

interface InitialStateType {
  todoList: TodoData[];
}

const InitialState: InitialStateType = {
  todoList: []
};

// Handle Actions
const addHandler = (state: InitialStateType = InitialState) => {
  const { todoList } = state;
  return Object.assign({}, state, {
    todoList: [...todoList, TodoData.empty()]
  });
};

const updateHandler = (state: InitialStateType = InitialState, action: UpdateTodoAction) => {
  const {
    payload: { data }
  } = action;
  const { todoList } = state;
  const tempTodoList = [...todoList];
  const index: number = tempTodoList.findIndex((todo: TodoData) => todo.id === data.id);
  if (index !== -1) {
    tempTodoList[index] = data;
  }
  return Object.assign({}, state, {
    todoList: tempTodoList
  });
};

const deleteHandler = (state: InitialStateType = InitialState, action: DeleteTodoAction) => {
  const {
    payload: { id }
  } = action;
  const { todoList } = state;
  const tempList = todoList.filter((todo: TodoData) => todo.id !== id);
  return Object.assign({}, state, {
    todoList: tempList
  });
};

const handlers = {
  [Types.ADD_TODO_ITEM]: addHandler,
  [Types.UPDATE_TODO_ITEM]: updateHandler,
  [Types.DELETE_TODO_ITEM]: deleteHandler
};

export const todoSauce = createReducer<InitialStateType, AddTodoAction | UpdateTodoAction | DeleteTodoAction>(
  InitialState,
  handlers
);
