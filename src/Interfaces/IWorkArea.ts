import { IEntity } from "./IEntity";

export interface IWorkArea extends IEntity {
  id: string;
  buildingName: string;
  buildingDescription: string;
  name: string;
  description: string;
  createdDate: Date;
}
