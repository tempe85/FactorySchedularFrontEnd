import {
  IDTokenClaims,
  ProfileStandardClaims,
  UserSettings,
} from "oidc-client";
import { ILoggedInDataObject } from "./ILoggedInDataObject";

export type ExtendedProfile = IDTokenClaims &
  ProfileStandardClaims &
  ILoggedInDataObject;

export interface IExtendedUserSettings extends UserSettings {
  profile: ExtendedProfile;
}
