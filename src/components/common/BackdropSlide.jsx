import React from "react";
import NavSwiper from "./NavSwiper";
import { SwiperSlide } from "swiper/react";
import { Box } from "@mui/material";
import apiConfig from "../../api/apiConfig";

const BackdropSlide = ({ backdrops }) => {
  return (
    <NavSwiper>
      {backdrops.splice(0, 10).map((item, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              paddingTop: "60%",
              backgroundPosition: "top",
              backgroundSize: "cover",
              backgroundImage: `url(${apiConfig.backdropPath(item.file_path)})`,
            }}
          ></Box>
        </SwiperSlide>
      ))}
    </NavSwiper>
  );
};

export default BackdropSlide;
