import React, { useState } from "react";
import { initialData } from "../Mocks/initial-data";
import Column from "./Components/Column";
import {
  DragDropContext,
  DragStart,
  Droppable,
  DragUpdate,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import NavBar from "../Components/NavBar";
import { Button } from "@material-ui/core";
import Select from "react-select";
import { Card, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
function Schedular() {
  const [taskListData, setTaskListData] = useState(initialData);
  const [homeIndex, setHomeIndex] = useState<number | null>(null);

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
    <NavBar>
      {false && (
        <>
          <legend style={{ textAlign: "center" }}>
            Current Work Area Schedules
          </legend>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card style={{ width: "300px", margin: "20px" }}>
              <CardBody>
                <CardTitle tag="h5">Work Area 1</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Station Schedule
                </CardSubtitle>
                <CardText>
                  <div>
                    <div>Station 1: Zach Smith</div>
                    <div>Station 2: Don Nelson</div>
                    <div>Station 3:</div>
                  </div>
                </CardText>
              </CardBody>
            </Card>
            <Card style={{ width: "300px", margin: "20px" }}>
              <CardBody>
                <CardTitle tag="h5">Work Area 2</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Station Schedule
                </CardSubtitle>
                <CardText>
                  <div>
                    <div>Station 1:</div>
                    <div>Station 2: </div>
                    <div>Station 3:</div>
                  </div>
                </CardText>
              </CardBody>
            </Card>
            <Card style={{ width: "300px", margin: "20px" }}>
              <CardBody>
                <CardTitle tag="h5">Work Area 3</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">
                  Station Schedule
                </CardSubtitle>
                <CardText>
                  <div>
                    <div>Station 1: </div>
                    <div>Station 2: </div>
                    <div>Station 3:</div>
                  </div>
                </CardText>
              </CardBody>
            </Card>
          </div>
          <Card style={{ width: "300px", margin: "20px" }}>
            <CardBody>
              <CardTitle tag="h5">Unassigned Workers</CardTitle>

              <CardText>
                <div>
                  <div>Sally McSallerson </div>
                  <div>Alex Woodward </div>
                </div>
              </CardText>
            </CardBody>
          </Card>
        </>
      )}
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
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
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
                  <div>
                    <h1 style={{ textAlign: "center" }}>Work Area 2</h1>
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
            </>
          </DragDropContext>
        </>
      )}
    </NavBar>
  );
}

export default Schedular;
