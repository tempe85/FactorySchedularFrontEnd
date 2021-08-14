import React from "react";
import { UserRoleType } from "../Enums";

interface IProps {
  isAuthorized: boolean;
  userRoleType: UserRoleType;
  children: React.ReactNode;
}
export function Authorization({
  isAuthorized,
  userRoleType,
  children,
}: IProps) {
  const authorizationErrorText =
    userRoleType === UserRoleType.Admin
      ? "You must be logged in as an admin to view this page"
      : "You must be logged in to view this page";
  return isAuthorized ? (
    <>{children}</>
  ) : (
    <h1 style={{ textAlign: "center" }}>{authorizationErrorText}</h1>
  );
}
