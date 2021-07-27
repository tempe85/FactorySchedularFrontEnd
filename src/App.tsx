import React from "react";
import "@fontsource/roboto";
import "./App.css";
import NavBar from "./Components/NavBar";
import Schedular from "./Schedular";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";

export const routes = [
  {
    path: "/WorkAreas",
    sidebar: () => <div></div>,
    main: () => <HomePage />,
  },
  {
    path: "/",
    exact: true,
    sidebar: () => <div></div>,
    main: () => <Schedular />,
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
