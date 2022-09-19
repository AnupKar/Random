import React from "react";
import styles from "./Home.module.css";
import { SideBar } from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const SomeCompo = () => {
  console.log("here in some compo .");
  return <h1>hello Raj</h1>;
};

export const Home = () => {
  const navigate = useNavigate();

  const getLoggedOut = () => {
    navigate("/login");
  };

  return (
    <>
      <div>
        <div className={styles.navBar}>
          <h4>TMS</h4>
          <div>
            <button>My trip</button>
            <button onClick={getLoggedOut}>Logout</button>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.sidebar}>
            <SideBar />
          </div>
          <div className={styles.mainContent}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
