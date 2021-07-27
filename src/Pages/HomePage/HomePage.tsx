import React from "react";
import NavBar from "../../Components/NavBar";

function HomePage() {
  return (
    <NavBar>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "200px",
        }}
      >
        {"Welcome To Factory Schedular! 🏭"}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Please login and go to the schedule page to update work area schedules.
      </div>
    </NavBar>
  );
}

export default HomePage;
