import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../Components/NavBar";

interface IProps {
  children: React.ReactNode;
}
export function Layout(props: IProps) {
  return (
    <div>
      <NavBar>{props.children}</NavBar>{" "}
      <ToastContainer position="bottom-left" />
    </div>
  );
}
