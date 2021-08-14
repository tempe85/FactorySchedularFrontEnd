export interface ITaskData {
  tasks: ITaskDataTask;
  columns: ITaskDataColumn;
  columnOrder: string[];
}

export interface ITaskDataTask {
  [key: string]: {
    id: string;
    content: string;
  };
}

export interface ITaskDataColumn {
  [key: string]: {
    id: string;
    title: string;
    taskIds: string[];
  };
}
