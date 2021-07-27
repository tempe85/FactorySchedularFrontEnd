import React from "react";
import { Task } from "./Task";

interface IProps {
  tasks: {
    id: string;
    content: string;
  }[];
}
const InnerList = ({ tasks }: IProps) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Task key={task.id} task={task} index={index} />
      ))}
    </>
  );
};

export default InnerList;

// export default React.memo(InnerList, (props, nextProps) => {
//   // if (nextProps.tasks === props.tasks) {
//   //   return false;
//   // }
//   // return true;
// });
