import type { RootStateType } from './Store';
import { TodoData } from '../../TodoData';

const getTodoList = (state: RootStateType): TodoData[] => state.reducerToolkit.todoList;

type ToolkitSelectorsType = {
  getTodoList: (state: RootStateType) => TodoData[];
};

const ToolkitSelectors: ToolkitSelectorsType = {
  getTodoList
};

export default ToolkitSelectors;
