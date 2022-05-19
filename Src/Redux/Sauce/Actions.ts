import { AnyAction } from 'redux';
import { createActions } from 'reduxsauce';
import { TodoData } from '../../TodoData';
import { ActionTypes } from './Types';

export interface AddTodoAction extends AnyAction {
  type: ActionTypes['addTodo'];
  payload: {};
}

export interface UpdateTodoAction extends AnyAction {
  type: ActionTypes['updateTodo'];
  payload: {
    data: TodoData;
  };
}

export interface DeleteTodoAction extends AnyAction {
  type: ActionTypes['deleteTodo'];
  payload: {
    id: number;
  };
}

interface SauceActions {
  addTodoItem(): AddTodoAction;
  updateTodoItem(payload: { data: TodoData }): UpdateTodoAction;
  deleteTodoItem(payload: { id: number }): DeleteTodoAction;
}

export const { Types, Creators } = createActions<ActionTypes, SauceActions>({
  addTodoItem: null,
  updateTodoItem: ['payload'],
  deleteTodoItem: ['payload']
});
