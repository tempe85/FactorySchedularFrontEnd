import React from "react";
import "@fontsource/roboto";
import "./App.css";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage, Scheduler, WorkAreas } from "./Pages";
import { AuthProvider, AuthProviderProps } from "oidc-react";

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
    path: "/",
    sidebar: () => <div></div>,
    main: () => <HomePage />,
  },
];

const oidcConfiguration: AuthProviderProps = {
  onSignIn: async (user: any) => {
    console.log(user);
    window.location.hash = "";
  },
  autoSignIn: false,
  authority: "https://localhost:5001",
  clientId: "frontend",
  scope: "openid profile factoryScheduler.fullaccess IdentityServerApi roles",
  responseType: "code", //id_token
  redirectUri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "https://{add-non-development-here}",
};

//update client id later
function App() {
  return (
    <AuthProvider {...oidcConfiguration}>
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
  );
}

export default App;
