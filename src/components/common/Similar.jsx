import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import tmdbApi from "../../api/tmdbApi";
import { setGlobalLoading } from "../../redux/features/globalLoading";
import AutoSwiper from "./AutoSwiper";
import { SwiperSlide } from "swiper/react";
import MediaItem from "./MediaItem";

const Similar = ({ mediaType, mediaId }) => {
  const [similar, setSimilar] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSimilar = async () => {
      try {
        const response = await tmdbApi.similar(mediaType, mediaId);
        console.log(response);
        dispatch(setGlobalLoading(false));
        if (response) {
          setSimilar(response.results);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSimilar();
  }, []);

  return (
    <AutoSwiper>
      {similar.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default Similar;
