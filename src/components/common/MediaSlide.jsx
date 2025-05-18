import React, { useEffect, useState } from "react";
import { setGlobalLoading } from "../../redux/features/globalLoading";
import { useDispatch } from "react-redux";
import tmdbApi from "../../api/tmdbApi";
import AutoSwiper from "./AutoSwiper";
import { SwiperSlide } from "swiper/react";
import MediaItem from "./MediaItem";

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await tmdbApi.getMediaList(
          mediaType,
          mediaCategory,
          page
        );
        if (response) setMovies(response.results);
        dispatch(setGlobalLoading(false));
      } catch (error) {
        console.log(error);
      }
    };

    getMovies();
  }, []);

  return (
    <AutoSwiper>
      {movies.map((movie, index) => (
        <SwiperSlide key={index} style={{ paddingRight: "10px" }}>
          <MediaItem media={movie} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlide;
