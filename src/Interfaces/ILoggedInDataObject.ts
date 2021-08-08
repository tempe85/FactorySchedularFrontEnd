import { IUser } from "./IUser";

export interface ILoggedInDataObject {
  userData: {
    profile: IUser;
  };
}
