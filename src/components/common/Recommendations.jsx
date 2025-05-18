import React, { useEffect, useState } from "react";
import AutoSwiper from "./AutoSwiper";
import { SwiperSlide } from "swiper/react";
import MediaItem from "./MediaItem";
import tmdbApi from "../../api/tmdbApi";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../redux/features/globalLoading";

const Recommendations = ({ mediaType, mediaId }) => {
  const [recommend, setRecommend] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const response = await tmdbApi.recommend(mediaType, mediaId);
        // if (response) setMovies(response.results);\
        dispatch(setGlobalLoading(false));
        if (response) {
          setRecommend(response.results);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getRecommendations();
  }, []);

  return (
    <AutoSwiper>
      {recommend.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default Recommendations;
