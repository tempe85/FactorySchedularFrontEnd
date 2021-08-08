import { WorkStationType } from "../Enums";
import { IWorkStationUser } from "./IWorkStationUser";

export interface IWorkStation {
  id: string;
  name: string;
  description: string;
  workStationType: WorkStationType;
  workAreaName: string;
  workAreaPosition: number;
  workStationUsers: IWorkStationUser[];
  workerCapacity: number;
  workAreaDescription: string;
  createdDate: Date;
}
