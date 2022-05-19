import { TodoData } from '../../TodoData';
import { AddTodoAction, UpdateTodoAction, DeleteTodoAction } from './Actions';
import { types } from './Types';

interface InitialStateType {
  todoList: TodoData[];
}

const InitialState: InitialStateType = {
  todoList: []
};

export const todoNormal = (
  state: InitialStateType = InitialState,
  action: AddTodoAction | UpdateTodoAction | DeleteTodoAction
) => {
  switch (action.type) {
    case types.addTodo: {
      const { todoList } = state;
      return Object.assign({}, state, {
        todoList: [...todoList, TodoData.empty()]
      });
    }

    case types.updateTodo: {
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
    }

    case types.deleteTodo: {
      const {
        payload: { id }
      } = action;
      const { todoList } = state;
      const tempList = todoList.filter((todo: TodoData) => todo.id !== id);
      return Object.assign({}, state, {
        todoList: tempList
      });
    }

    default: {
      return state;
    }
  }
};
