import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import uiConfigs from "../../configs/uiConfigs";
import apiConfig from "../../api/apiConfig";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../redux/features/globalLoading";
import tmdbApi from "../../api/tmdbApi";

const CastSlide = () => {
  const { mediaType, mediaId } = useParams();
  const dispatch = useDispatch();

  const [casts, setCasts] = useState([]);

  useEffect(() => {
    const getCredits = async () => {
      dispatch(setGlobalLoading(true));
      const response = await tmdbApi.credits(mediaType, mediaId);

      dispatch(setGlobalLoading(false));

      if (response) {
        setCasts(response.cast);
      }
    };

    getCredits();
  }, []);

  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: { xs: "50%", md: "25%", lg: "20.5%" },
          color: "primary.contrastText",
        },
      }}
    >
      <Swiper
        spaceBetween={10}
        slidesPerView={"auto"}
        grabCursor={true}
        style={{ width: "100%", height: "max-content" }}
      >
        {casts.map((cast, i) => (
          <SwiperSlide key={i}>
            <Link>
              <Box
                sx={{
                  paddingTop: "120%",
                  color: "text.primary",
                  overflow: "hidden",
                  ...uiConfigs.style.backgroundImage(
                    apiConfig.posterPath(cast?.profile_path)
                  ),
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "max-content",
                    bottom: 0,
                    padding: "10px 5px",
                    backgroundColor: "rgba(0,0,0,0.6)",
                  }}
                >
                  <Typography
                    sx={{
                      ...uiConfigs.style.typoLines(1, "left"),
                    }}
                  >
                    {cast.name}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CastSlide;
