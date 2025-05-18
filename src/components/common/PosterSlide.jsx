import React from "react";
import AutoSwiper from "./AutoSwiper";
import { SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import apiConfig from "../../api/apiConfig";

const PosterSlide = ({ posters }) => {
  return (
    <AutoSwiper>
      {posters.splice(0, 20).map((item, index) => (
        <SwiperSlide key={index} style={{ paddingRight: "10px" }}>
          <Box
            sx={{
              paddingTop: "160%",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundImage: `url(${apiConfig.posterPath(item.file_path)})`,
            }}
          ></Box>
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default PosterSlide;
