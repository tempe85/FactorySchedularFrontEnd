import { IEntity } from "./IEntity";

export interface IWorkBuilding extends IEntity {
  id: string;
  name: string;
  description: string;
  createdDate: Date;
}
