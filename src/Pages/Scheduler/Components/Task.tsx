import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface ContainerProps {
  readonly isDragging: boolean;
  readonly isDragDisabled: boolean;
}

const Container = styled.div<ContainerProps>`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isDragDisabled
      ? "lightgrey"
      : props.isDragging
      ? "lightgreen"
      : "white"};
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

interface IProps {
  task: {
    id: string;
    content: string;
  };
  index: number;
}

export function Task({ task, index }: IProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          isDragDisabled={false}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
}
