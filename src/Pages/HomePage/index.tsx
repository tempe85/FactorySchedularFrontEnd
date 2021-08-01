import React from "react";
import { toast } from "react-toastify";
import { Layout } from "../../Containers/Layout";

export function HomePage() {
  const notify = () => {
    toast("Wow so easy!");
  };
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
        <button onClick={notify}>CLICK ME</button>
        Please login and go to the schedule page to update work area schedules.
      </div>
    </Layout>
  );
}
