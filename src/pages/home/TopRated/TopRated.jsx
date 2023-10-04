import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/Filter/SwitchTabs";

import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/Carousel/Carousel";

const Popular = () => {
  const [params, setParams] = useState("movie");

  const { data, loading } = useFetch(`/${params}/top_rated`);
  const onTabChange = (tab) => {
    setParams(tab === "Movie" ? "movie" : "tv");
  };
  return (
    <section className="carousel">
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTabs data={["Movie", "Tv Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endpoint={params} />
    </section>
  );
};

export default Popular;
