import { IWorkStation } from "./IWorkStation";

export interface IWorkStationsByWorkArea {
  workAreaId: string;
  workStations: IWorkStation[];
}
