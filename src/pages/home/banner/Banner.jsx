import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "../../../components/LazyImages/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const Banner = () => {
  const selector = useSelector((state) => state.home.url);
  const navigate = useNavigate();
  const [bckgrnd, setBckgrnd] = useState("");
  const [query, setQuery] = useState("");

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      selector.backDrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    console.log(bg);
    setBckgrnd(bg);
  }, [data]);

  const searchHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`search/${query}`);
    }
  };
  return (
    <section className="heroSection">
      {!loading && (
        <div className="backDropImg">
          <Img src={bckgrnd} />
        </div>
      )}

      <div className="merge-layer"></div>

      <ContentWrapper>
        <div className="heroSectionContent">
          <span className="title">Welcome.</span>
          <span className="subtitle">
            Dive into a world of blockbuster entertainment with our movie
            catalog. Explore Now.
          </span>
          <div className="searchContainer">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </section>
  );
};

export default Banner;
