import { User } from "oidc-react";
import {
  ExtendedProfile,
  IExtendedUserSettings,
} from "../Interfaces/IExtendedUserSettings";

export class LoggedInUser extends User {
  constructor(settings: IExtendedUserSettings) {
    super(settings);

    this.profile = settings.profile;
  }

  profile: ExtendedProfile;
}
