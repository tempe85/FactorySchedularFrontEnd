export interface ITaskData {
  tasks: {
    [key: string]: {
      id: string;
      content: string;
    };
  };
  columns: {
    [key: string]: {
      id: string;
      title: string;
      taskIds: string[];
    };
  };
  columnOrder: string[];
}
