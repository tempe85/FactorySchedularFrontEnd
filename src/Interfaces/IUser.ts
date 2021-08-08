import { UserRoleType } from "../Enums";

export interface IUser {
  role: UserRoleType;
  preferred_username: string;
  firstName: string;
  lastName: string;
  assignedWorkStationId: string;
}
