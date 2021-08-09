import React from "react";
import { useAuth } from "oidc-react";
import { AuthContextPropsExtended } from "../Interfaces/AuthContextPropsExtended";
import { IUserProps } from "../Interfaces";

export function withUser<T>(Component: React.ComponentType<T>) {
  const displayName = Component.displayName || Component.name || "Component";

  const Element = (props: Omit<T, keyof IUserProps>) => {
    const auth = useAuth() as AuthContextPropsExtended;
    return <Component auth={auth} {...(props as T)} />;
  };

  if (Element) {
    (Element as any).displayName = `withUser(${displayName})`;
  }

  return Element;
}
