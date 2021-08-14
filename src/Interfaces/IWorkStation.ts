import { WorkStationType } from "../Enums";
import { IEntity } from "./IEntity";
import { IWorkStationUser } from "./IWorkStationUser";

export interface IWorkStation extends IEntity {
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
