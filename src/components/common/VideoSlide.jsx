import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setGlobalLoading } from "../../redux/features/globalLoading";
import tmdbApi from "../../api/tmdbApi";

import NavSwiper from "./NavSwiper";
import MediaVideo from "./MediaVideo";
import { SwiperSlide } from "swiper/react";

const VideoSlide = () => {
  const { mediaType, mediaId } = useParams();
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getAllVideos = async () => {
      dispatch(setGlobalLoading(true));
      const response = await tmdbApi.getVideos(mediaType, mediaId);

      dispatch(setGlobalLoading(false));
      setVideos(response.results);
      if (response) {
      }
    };

    getAllVideos();
  }, []);

  return (
    <NavSwiper>
      {videos.splice(0, 5).map((video, index) => (
        <SwiperSlide key={index}>
          <MediaVideo video={video} />
        </SwiperSlide>
      ))}
    </NavSwiper>
  );
};

export default VideoSlide;
