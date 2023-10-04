import React from "react";
import Banner from "./banner/Banner";
import "./style.scss";
import Trending from "./Trending/Trending";
import Popular from "./Popular/Popular";
import TopRated from "./TopRated/TopRated";

const Home = () => {
  return (
    <div className="home">
      <Banner />
      <Trending />
      <Popular />
      <TopRated />
      <div style={{ height: 1000 }}></div>
    </div>
  );
};

export default Home;
