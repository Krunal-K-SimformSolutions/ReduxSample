import { TodoData } from '../../TodoData';
import { types } from './Types';

export interface AddTodoAction {
  type: string;
  payload: object;
}

export interface UpdateTodoAction {
  type: string;
  payload: { data: TodoData };
}

export interface DeleteTodoAction {
  type: string;
  payload: { id: number };
}

export function addTodoItem(): AddTodoAction {
  return {
    type: types.addTodo,
    payload: {}
  };
}

export function updateTodoItem(payload: { data: TodoData }): UpdateTodoAction {
  return {
    type: types.updateTodo,
    payload
  };
}

export function deleteTodoItem(payload: { id: number }): DeleteTodoAction {
  return {
    type: types.deleteTodo,
    payload
  };
}
