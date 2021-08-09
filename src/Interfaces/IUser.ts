import { UserRoleType } from "../Enums";

export interface IUser {
  sub: string; //this is the Id
  role: UserRoleType;
  preferred_username: string;
  firstName: string;
  lastName: string;
  assignedWorkStationId: string;
}
