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
  IUserProps,
  IWorkArea,
  IWorkBuilding,
  IWorker,
  IWorkStation,
  IWorkStationWorkers,
} from "../../Interfaces";
import { toast } from "react-toastify";
import { getWorkBuildings, getWorkBuildingWorkAreas } from "../../API/Api";
import { InitialData } from "../../Mocks/initial-data";
import { withTranslationStore } from "../../HOC/withTranslationStore";
import { withUser } from "../../HOC/withUser";
import { ITranslationStoreProps } from "../../Interfaces/ITranslationStoreProps";
import { Authorization } from "../../Components/Authorization";
import { UserRoleType } from "../../Enums";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

interface ISelectionType {
  value: string;
  label: string;
}
function Scheduler({
  isUserAnAdmin,
  auth,
  isLoggedIn,
  translationStore,
  userProfile,
}: ITranslationStoreProps & IUserProps) {
  const [taskListData, setTaskListData] = useState(InitialData);
  const [homeIndex, setHomeIndex] = useState<number | null>(null);
  const [workBuildings, setWorkBuildings] = useState<IWorkBuilding[]>([]);
  const [workBuildingsSelections, setWorkBuildingsSelections] = useState<
    ISelectionType[]
  >([]);
  const [workAreaSelections, setWorkAreaSelections] = useState<
    ISelectionType[]
  >([]);
  const [buildingSelection, setBuldingSelection] = useState<ISelectionType>();
  const [workAreaSelection, setWorkAreaSelection] = useState<ISelectionType>();
  const [stations, setStations] = useState<IWorkStation[]>([]);
  const [workers, setWorkers] = useState<IWorker[]>([]);
  const [workStationWorkers, setWorkStationWorkers] = useState<
    IWorkStationWorkers[]
  >([]);
  const [workAreas, setWorkAreas] = useState<IWorkArea[]>([]);

  useEffect(() => {
    fetchWorkBuildings();
  }, []);

  const fetchWorkBuildings = async () => {
    try {
      const buildings = await getWorkBuildings();
      setWorkBuildings(buildings);
      const selections = getReactSelections(buildings.map((p) => p.name));
      setWorkBuildingsSelections(selections);

      console.log("BUILDINGS", buildings);
      if (buildings) {
        await fetchBuildingWorkAreas(buildings[0]);
      }
    } catch (error) {
      toast.error("Unable to fetch work buildings", {
        autoClose: false,
      });
    }
  };

  function getReactSelections(values: string[]): ISelectionType[] {
    return values.map((p) => ({
      value: p,
      label: p,
    }));
  }

  const fetchBuildingWorkAreas = async (workBuilding: IWorkBuilding) => {
    try {
      const buildingWorkAreas = await getWorkBuildingWorkAreas(workBuilding.id);
      setWorkAreas(buildingWorkAreas);
      const selections = getReactSelections(
        buildingWorkAreas.map((p) => p.name)
      );
      setWorkAreaSelections(selections);
      console.log("Work Areas", buildingWorkAreas);

      //const buildingWorkAreas = await getWorkAreas()
    } catch (error) {
      toast.error(`Unable to fetch Building: ${workBuilding.name} work areas`, {
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
        {false && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "100px",
            }}
          >
            <div style={{ width: "500px", textAlign: "center" }}>
              <h4>Select one or more Work Areas to schedule:</h4>
              <Select isMulti options={options} />
              <div style={{ paddingTop: "20px" }}>
                <Button color="primary" variant="contained">
                  Start Scheduling
                </Button>
              </div>
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
                <Select
                  options={workBuildingsSelections}
                  onChange={(selection) => {
                    if (selection) {
                      setBuldingSelection(selection);
                    }
                  }}
                />
                {buildingSelection && (
                  <Select
                    options={workAreaSelections}
                    onChange={(selection) => {
                      if (selection) {
                        setWorkAreaSelection(selection);
                      }
                    }}
                  />
                )}
                {workAreaSelection && (
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <div>
                      <div>
                        <h1 style={{ textAlign: "center" }}>Work Area 1</h1>
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
                        <Button color="primary" variant="contained">
                          Save Schedule
                        </Button>
                        <Button color="secondary" variant="contained">
                          Undo
                        </Button>
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
