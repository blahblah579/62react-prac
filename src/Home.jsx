import React from "react";
import LeftBar from "./LeftBar";
import HomePage from "./HomePage";
import "./home.css";

const Home = () => {
  return (
    <div className="main">
      <LeftBar />
      <HomePage />
    </div>
  );
};

export default Home;
