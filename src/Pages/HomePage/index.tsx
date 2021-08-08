import React from "react";
import { Layout } from "../../Containers/Layout";

export function HomePage() {
  return (
    <Layout>
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
    </Layout>
  );
}
