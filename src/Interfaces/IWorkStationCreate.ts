import { WorkStationType } from "../Enums";

export interface IWorkStationCreate {
  name: string;
  workAreaId: string;
  workStationType: WorkStationType;
  workerCapacity: number;
  description: string;
}
