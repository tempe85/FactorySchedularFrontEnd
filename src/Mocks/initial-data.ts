import { ITaskData, IWorker, IWorkStation } from "../Interfaces";
import { ITaskDataColumn, ITaskDataTask } from "../Interfaces/ITaskData";

export const GetTaskData = (
  workers: IWorker[],
  workStations: IWorkStation[]
): ITaskData => {
  let retVal = {} as ITaskData;
  let tasks = {} as ITaskDataTask;
  let columns = {} as ITaskDataColumn;
  for (let worker of workers) {
    tasks = {
      ...tasks,
      [worker.id]: {
        id: worker.id,
        content: `${worker.firstName} ${worker.lastName}`,
      },
    };
  }

  let columnOrder = [];

  console.log("work stations", workStations);
  for (let workstation of workStations) {
    const getAssignedWorkers = workers
      .filter((p) => p.assignedWorkStationId === workstation.id)
      ?.map((p) => p.id);
    columnOrder.push(workstation.id);
    columns = {
      ...columns,
      [workstation.id]: {
        id: workstation.id,
        title: workstation.name,
        taskIds: getAssignedWorkers ?? [],
      },
    };
  }

  const unassignedWorkers = workers
    .filter((p) => p.assignedWorkStationId == null)
    ?.map((p) => p.id);
  const unassignedWorkersColumn = {
    id: "workers",
    title: "Available Workers",
    taskIds: unassignedWorkers ?? [],
  };

  columns = {
    ...columns,
    [unassignedWorkersColumn.id]: {
      id: unassignedWorkersColumn.id,
      title: unassignedWorkersColumn.title,
      taskIds: unassignedWorkersColumn.taskIds ?? [],
    },
  };
  columnOrder.push(unassignedWorkersColumn.id);

  retVal.tasks = tasks;
  retVal.columns = columns;
  retVal.columnOrder = columnOrder;

  return retVal;
};

export const InitialData: ITaskData = {
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
