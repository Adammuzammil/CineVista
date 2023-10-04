import React, { useState } from "react";
import "../style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/Filter/SwitchTabs";

import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/Carousel/Carousel";
import Home from "../Home";

const Trending = () => {
  const [params, setParams] = useState("day");

  const { data, loading } = useFetch(`/trending/all/${params}`);
  const onTabChange = (tab) => {
    setParams(tab === "Day" ? "day" : "week");
  };
  return (
    <section className="carousel">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </section>
  );
};

export default Trending;
