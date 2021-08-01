import React from "react";
import "@fontsource/roboto";
import "./App.css";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage, Scheduler, WorkAreas } from "./Pages";

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

function App() {
  return (
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
  );
}

export default App;
