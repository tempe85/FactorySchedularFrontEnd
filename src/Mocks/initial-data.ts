import { ITaskData } from "../Interfaces";

export const initialData: ITaskData = {
  tasks: {
    "task-1": { id: "task-1", content: "Zach Smith" },
    "task-2": { id: "task-2", content: "Don Nelson" },
    "task-3": { id: "task-3", content: "Sally McSallerson" },
    "task-4": { id: "task-4", content: "Alex Woodward" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Station 1",
      taskIds: [],
    },
    "column-2": {
      id: "column-2",
      title: "Station 2",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Station 3",
      taskIds: [],
    },
    workers: {
      id: "workers",
      title: "Available Workers",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3", "workers"],
};
