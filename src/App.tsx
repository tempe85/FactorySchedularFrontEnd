import React from "react";
import "@fontsource/roboto";
import "./App.css";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage, Scheduler, WorkAreas } from "./Pages";
import { AuthProvider, AuthProviderProps, User } from "oidc-react";
import { LoggedInUser } from "./Containers/LoggedInUser";
import { AuthProviderPropsExtended } from "./Interfaces/AuthProviderPropsExtended";
import { AdminPage } from "./Pages/Admin";
import { Provider } from "unstated";

export const routes = [
  {
    path: "/WorkAreas",
    sitebar: () => <div></div>,
    main: () => <WorkAreas />,
  },
  {
    path: "/Schedule",
    exact: true,
    sidebar: () => <div></div>,
    main: () => <Scheduler />,
  },
  {
    path: "/Admin",
    exact: true,
    sidebar: () => <div></div>,
    main: () => <AdminPage />,
  },
  {
    path: "/",
    sidebar: () => <div></div>,
    main: () => <HomePage />,
  },
];

const oidcConfiguration: AuthProviderPropsExtended = {
  onSignIn: async (user: LoggedInUser | null) => {
    window.location.hash = "";
  },
  autoSignIn: false,
  authority: "https://localhost:5001/",
  clientId: "frontend",
  scope:
    "openid profile factoryScheduler.fullaccess IdentityServerApi roles user_data",
  responseType: "code", //id_token
  redirectUri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://{add-non-development-here}",
};

//update client id later
function App() {
  return (
    <Provider>
      <AuthProvider {...(oidcConfiguration as AuthProviderProps)}>
        <Router>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
