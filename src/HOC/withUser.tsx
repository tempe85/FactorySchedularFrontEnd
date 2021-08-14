import React from "react";
import { useAuth } from "oidc-react";
import { AuthContextPropsExtended } from "../Interfaces/AuthContextPropsExtended";
import { IUserProps } from "../Interfaces";
import { ExtendedProfile } from "../Interfaces/IExtendedUserSettings";
import { UserRoleType } from "../Enums";

const IsLoggedInUserAnAdmin = (userProfile: ExtendedProfile): boolean => {
  return userProfile.role === UserRoleType.Admin;
};

const IsLoggedIn = (auth: AuthContextPropsExtended): boolean => {
  return !!auth && !!auth.userData;
};

export function withUser<T>(Component: React.ComponentType<T>) {
  const displayName = Component.displayName || Component.name || "Component";

  const Element = (props: Omit<T, keyof IUserProps>) => {
    const auth = useAuth() as AuthContextPropsExtended;
    const userProfile = auth.userData?.profile;
    const isLoggedIn = IsLoggedIn(auth);
    const isUserAnAdmin = !!userProfile && IsLoggedInUserAnAdmin(userProfile);
    return (
      <Component
        isLoggedIn={isLoggedIn}
        isUserAnAdmin={isUserAnAdmin}
        userProfile={userProfile}
        auth={auth}
        {...(props as T)}
      />
    );
  };

  if (Element) {
    (Element as any).displayName = `withUser(${displayName})`;
  }

  return Element;
}
