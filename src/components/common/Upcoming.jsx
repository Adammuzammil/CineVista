import React, { useState } from "react";
import { useEffect } from "react";
import tmdbApi from "../../api/tmdbApi";

const Upcoming = ({ mediaType, mediaCategory }) => {
  const [page, setPage] = useState(1);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await tmdbApi.getUpcomingList(
          mediaType,
          mediaCategory,
          page,
          today
        );
        console.log(response);
        // if (response) setMovies(response.results);
        dispatch(setGlobalLoading(false));
      } catch (error) {
        console.log(error);
      }
    };

    getMovies();
  }, []);
  return <div>Upcoming</div>;
};

export default Upcoming;
