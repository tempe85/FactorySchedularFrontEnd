import React from "react";
import { Task } from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import "./style.css";
import InnerList from "./InnerList";

interface ContainerProps {}
interface TaskListProps {
  isDraggingOver: boolean;
}

const Container = styled.div<ContainerProps>`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  text-align: left;
  display: flex;
  flex-direction: column;
  width: 220px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div<TaskListProps>`
  padding: 8px;
  background-color: ${(props) =>
    props.isDraggingOver ? "skyblue" : "inherit"};
  min-height: 100px;
  flex-grow: 1;
`;

interface IProps {
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
  tasks: {
    id: string;
    content: string;
  }[];
  isDropDisabled: boolean;
  index: number;
}

function Column({ column, tasks, isDropDisabled, index }: IProps) {
  return (
    // <Draggable draggableId={column.id} index={index}>
    //   {(provided) => (
    //     <Container {...provided.draggableProps} ref={provided.innerRef}>
    <Container>
      {/* <Title {...provided.dragHandleProps}>{column.title}</Title> */}
      <Title>{column.title}</Title>
      <Droppable
        droppableId={column.id}
        isDropDisabled={isDropDisabled}
        type="task"
      >
        {(provided, snapshot) => (
          <TaskList
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <InnerList tasks={tasks} />
            {/* {tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))} */}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
    //   )}
    // </Draggable>
  );
}

export default Column;
