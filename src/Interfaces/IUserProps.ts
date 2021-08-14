import { AuthContextPropsExtended } from "./AuthContextPropsExtended";
import { ExtendedProfile } from "./IExtendedUserSettings";

export interface IUserProps {
  auth: AuthContextPropsExtended;
  userProfile: ExtendedProfile | undefined;
  isLoggedIn: boolean;
  isUserAnAdmin: boolean;
}
