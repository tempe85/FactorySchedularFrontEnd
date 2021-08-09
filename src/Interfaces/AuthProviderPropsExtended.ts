import { AuthProviderProps } from "oidc-react";
import { LoggedInUser } from "../Containers/LoggedInUser";

export interface AuthProviderPropsExtended
  extends Omit<AuthProviderProps, "onSignIn"> {
  onSignIn?: (userData: LoggedInUser | null) => Promise<void> | void;
}
