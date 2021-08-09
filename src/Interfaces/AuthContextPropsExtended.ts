import { AuthContextProps } from "oidc-react";
import { LoggedInUser } from "../Containers/LoggedInUser";

export interface AuthContextPropsExtended extends AuthContextProps {
  userData?: LoggedInUser | null;
}
