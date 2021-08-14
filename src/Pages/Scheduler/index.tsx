import React, { useState, useEffect } from "react";
import Column from "./Components/Column";
import {
  DragDropContext,
  DragStart,
  DragUpdate,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import Select from "react-select";
import { Layout } from "../../Containers/Layout";
import {
  IEntity,
  ITaskData,
  IUserProps,
  IWorkArea,
  IWorkBuilding,
  IWorker,
  IWorkStation,
  IWorkStationWorkers,
} from "../../Interfaces";
import { toast } from "react-toastify";
import {
  getAllUsers,
  getWorkBuildings,
  getWorkBuildingWorkAreas,
  getWorkStationsByWorkAreaId,
  moveUserStation,
} from "../../API/Api";
import { GetTaskData, InitialData } from "../../Mocks/initial-data";
import { withTranslationStore } from "../../HOC/withTranslationStore";
import { withUser } from "../../HOC/withUser";
import { ITranslationStoreProps } from "../../Interfaces/ITranslationStoreProps";
import { Authorization } from "../../Components/Authorization";
import { UserRoleType } from "../../Enums";
import { IMoveUserStationRequest } from "../../Interfaces/IMoveUserStationRequest";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

interface ISelectionType<T extends IEntity> {
  value: T;
  label: string;
}
function Scheduler({
  isUserAnAdmin,
  auth,
  isLoggedIn,
  translationStore,
  userProfile,
}: ITranslationStoreProps & IUserProps) {
  const [taskListData, setTaskListData] = useState<ITaskData>(InitialData);
  const [homeIndex, setHomeIndex] = useState<number | null>(null);
  const [workBuildings, setWorkBuildings] = useState<IWorkBuilding[]>([]);
  const [workBuildingsSelections, setWorkBuildingsSelections] = useState<
    ISelectionType<IWorkBuilding>[]
  >([]);
  const [workAreaSelections, setWorkAreaSelections] = useState<
    ISelectionType<IWorkArea>[]
  >([]);
  const [buildingSelection, setBuldingSelection] =
    useState<ISelectionType<IWorkBuilding>>();
  const [workAreaSelection, setWorkAreaSelection] =
    useState<ISelectionType<IWorkArea>>();
  const [workStations, setWorkStations] = useState<IWorkStation[]>([]);
  const [allWorkers, setAllWorkers] = useState<IWorker[]>([]);
  const [unassignedWorkers, setUnassignedWorkers] = useState<IWorker[]>([]);
  const [workStationWorkers, setWorkStationWorkers] = useState<
    IWorkStationWorkers[]
  >([]);
  const [workAreas, setWorkAreas] = useState<IWorkArea[]>([]);

  useEffect(() => {
    fetchWorkBuildings();
    fetchWorkers();
  }, []);

  useEffect(() => {
    if (buildingSelection) {
      fetchBuildingWorkAreas(buildingSelection.value);
    }
  }, [buildingSelection?.label]);

  useEffect(() => {
    if (workAreaSelection) {
      fetchWorkStationsByWorkAreaId(workAreaSelection.value);
    }
  }, [workAreaSelection?.label]);

  const fetchWorkBuildings = async () => {
    try {
      const buildings = await getWorkBuildings();
      setWorkBuildings(buildings);
      const selections = getReactSelections(buildings);
      setWorkBuildingsSelections(selections);

      console.log("BUILDINGS", buildings);
    } catch (error) {
      toast.error("Unable to fetch work buildings", {
        autoClose: false,
      });
    }
  };

  const fetchWorkers = async () => {
    try {
      const workers = await getAllUsers();
      const unassignedWorkers = workers.filter(
        (p) => p.assignedWorkStationId == null
      );
      setAllWorkers(workers);
      setUnassignedWorkers(unassignedWorkers);
    } catch (e) {
      toast.error(`Could not fetch workers! ${e}`);
    }
  };

  const fetchWorkStationsByWorkAreaId = async (workArea: IWorkArea) => {
    try {
      const workStations = await getWorkStationsByWorkAreaId(workArea.id);
      setTaskListData(GetTaskData(allWorkers, workStations));
      setWorkStations(workStations);
      console.log("Task Data", GetTaskData(allWorkers, workStations));
    } catch (error) {
      toast.error("Unable to fetch work stations", {
        autoClose: false,
      });
    }
  };

  function getReactSelections<T extends IEntity>(
    values: T[]
  ): ISelectionType<T>[] {
    return values.map((p) => ({
      value: p,
      label: p.name,
    }));
  }

  const fetchBuildingWorkAreas = async (workBuilding: IWorkBuilding) => {
    try {
      const buildingWorkAreas = await getWorkBuildingWorkAreas(workBuilding.id);
      setWorkAreas(buildingWorkAreas);
      const selections = getReactSelections(buildingWorkAreas);
      setWorkAreaSelections(selections);
      console.log("Work Areas", buildingWorkAreas);

      //const buildingWorkAreas = await getWorkAreas()
    } catch (error) {
      toast.error(`Unable to fetch Building: ${workBuilding.name} work areas`, {
        autoClose: false,
      });
    }
  };

  const handleMoveUserStation = async (
    newWorkStationId: string,
    userId: string
  ) => {
    const updatedStationId =
      newWorkStationId === "workers" ? undefined : newWorkStationId;
    const workStationMoveRequest: IMoveUserStationRequest = {
      newWorkStationId: updatedStationId,
      userId,
    };

    try {
      await moveUserStation(workStationMoveRequest, userId);
      toast.success(`Worker moved to ${newWorkStationId}!`);
    } catch (error) {
      toast.error("Unable to fetch work stations", {
        autoClose: false,
      });
    }
  };

  const onDragEnd = (result: DropResult) => {
    setHomeIndex(null);
    const { destination, source, draggableId, type } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = [...taskListData.columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setTaskListData((prevState) => {
        return {
          ...prevState,
          columnOrder: newColumnOrder,
        };
      });
      return;
    }

    const startColumn = taskListData.columns[source.droppableId];
    const finishColumn = taskListData.columns[destination.droppableId];

    //Dropped in same column
    if (startColumn === finishColumn) {
      const newTaskIds = [...startColumn.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };
      setTaskListData((prevState) => {
        return {
          ...prevState,
          columns: {
            ...prevState.columns,
            [newColumn.id]: newColumn,
          },
        };
      });
      return;
    }

    //Moving from one column to another
    const startTaskIds = [...startColumn.taskIds];
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...startColumn,
      taskIds: startTaskIds,
    };
    const finishTaskIds = [...finishColumn.taskIds];
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };
    console.log("newStart", newStart, "newFinish", newFinish);
    handleMoveUserStation(newFinish.id, draggableId);

    setTaskListData((prevState) => {
      return {
        ...prevState,
        columns: {
          ...prevState.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };
    });
  };

  const onDragStart = (start: DragStart) => {
    const homeIndex = taskListData.columnOrder.indexOf(
      start.source.droppableId
    );
    setHomeIndex(homeIndex);
  };

  const options = [
    { value: "test1", label: "Work Area 1" },
    { value: "strawberry", label: "Work Area 2" },
    { value: "vanilla", label: "Work Area 3" },
  ];

  const onDragUpdate = (update: DragUpdate) => {};

  return (
    <Layout>
      <Authorization
        isAuthorized={isLoggedIn}
        userRoleType={UserRoleType.FactorySchedulerUser}
      >
        {workBuildingsSelections && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "100px",
            }}
          >
            <div style={{ width: "500px", textAlign: "center" }}>
              <h4 style={{ textAlign: "left" }}>Select a work Building :</h4>
              <Select
                options={workBuildingsSelections}
                onChange={(selection) => {
                  if (selection) {
                    setBuldingSelection(selection);
                  }
                }}
              />
              {workAreaSelections && (
                <>
                  <h4 style={{ textAlign: "left", paddingTop: "15px" }}>
                    Select a Work Area :
                  </h4>
                  <Select
                    options={workAreaSelections}
                    onChange={(selection) => {
                      if (selection) {
                        setWorkAreaSelection(selection);
                      }
                    }}
                  />
                </>
              )}
              {/* <div style={{ paddingTop: "20px" }}>
                <Button color="primary" variant="contained">
                  Start Scheduling
                </Button>
              </div> */}
            </div>
          </div>
        )}
        {true && (
          <>
            <DragDropContext
              onDragUpdate={onDragUpdate}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            >
              <>
                {/* <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => ( */}
                {/* <Container {...provided.droppableProps} ref={provided.innerRef}> */}

                {workAreaSelection && taskListData && (
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <div>
                      <div>
                        <h1 style={{ textAlign: "center", paddingTop: "50px" }}>
                          {workAreaSelection?.value.name}
                        </h1>
                        <Container>
                          {taskListData.columnOrder.map((columnId, index) => {
                            if (columnId === "workers") return;
                            const column = taskListData.columns?.[columnId];
                            const tasks = column.taskIds.map(
                              (taskId) => taskListData.tasks?.[taskId]
                            );

                            const isDropDisabled =
                              homeIndex !== null ? index < homeIndex : false;
                            return (
                              <Column
                                key={column.id}
                                column={column}
                                tasks={tasks}
                                isDropDisabled={false}
                                index={index}
                              />
                            );
                          })}
                          {/* {provided.placeholder} */}
                        </Container>
                      </div>
                    </div>

                    {/* )}
        </Droppable> */}
                    <div>
                      <Container>
                        <Column
                          column={taskListData.columns["workers"]}
                          tasks={taskListData.columns["workers"].taskIds.map(
                            (p) => taskListData.tasks?.[p]
                          )}
                          isDropDisabled={false}
                          index={5}
                        />
                      </Container>
                      <div style={{ textAlign: "center" }}>
                        {/* <Button color="primary" variant="contained">
                          Save Schedule
                        </Button> */}
                        {/* <Button color="secondary" variant="contained">
                          Undo
                        </Button> */}
                      </div>
                    </div>
                  </div>
                )}
              </>
            </DragDropContext>
          </>
        )}
      </Authorization>
    </Layout>
  );
}

export default withTranslationStore(withUser(Scheduler));
