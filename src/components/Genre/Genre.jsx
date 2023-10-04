import React from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const Genre = ({ data }) => {
  const { genre } = useSelector((state) => state.home);
  //   console.log(genre);
  return (
    <div className="genres">
      {data?.map((genr) => {
        if (!genre[genr]?.name) return;
        return <div className="genre">{genre[genr]?.name}</div>;
      })}
    </div>
  );
};

export default Genre;
