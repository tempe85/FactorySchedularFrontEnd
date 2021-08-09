import { Profile } from "oidc-client";
import { UserRoleType } from "../Enums";

export interface ILoggedInDataObject extends Profile {
  FirstName: string;
  LastName: string;
  AssignedWorkStationId: string;
  role: UserRoleType;
}
