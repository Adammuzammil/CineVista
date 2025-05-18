import React, { useEffect, useState } from "react";
import tmdbApi from "../../api/tmdbApi";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../redux/features/globalLoading";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import uiConfigs from "../../configs/uiConfigs";
import { Swiper, SwiperSlide } from "swiper/react";
import apiConfig from "../../api/apiConfig";
import Ratings from "./Ratings";
import { routesGen } from "../../routes/routes";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Link } from "react-router-dom";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(mediaCategory, {
          params,
        });
        if (response) setMovies(response.results);
        dispatch(setGlobalLoading(false));
      } catch (error) {
        console.log(error);
      }
    };

    const getGenres = async () => {
      try {
        const response = await tmdbApi.getMovieGenre(mediaType);

        if (response) setGenre(response.genres);
        dispatch(setGlobalLoading(false));
      } catch (error) {
        console.log(error);
      }
    };

    getMovies();
    getGenres();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        color: "primary.contrastText",
        "&::before": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "30%",
          pointerEvents: "none",
          zIndex: 2,
          ...uiConfigs.style.gradientBgImage[theme.palette.mode],
        },
      }}
    >
      <Swiper
        grabCursor={true}
        loop={true}
        // modules={[Autoplay]}
        style={{ width: "100%", height: "max-content" }}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false
        // }}
      >
        {movies?.map((movie, idx) => (
          <SwiperSlide key={idx}>
            <Box
              sx={{
                paddingTop: {
                  xs: "130%",
                  sm: "80%",
                  md: "60%",
                  lg: "45%",
                },
                backgroundPosition: "top",
                backgroundSize: "cover",
                backgroundImage: `url(${apiConfig.backdropPath(
                  movie.backdrop_path || movie.poster_path
                )})`,
              }}
            />
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                ...uiConfigs.style.horizontalGradientBgImage[
                  theme.palette.mode
                ],
              }}
            />
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                paddingX: { sm: "10px", md: "5rem", lg: "10rem" },
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  paddingX: "30px",
                  color: "text.primary",
                  width: { sm: "unset", md: "30%", lg: "40%" },
                }}
              >
                <Stack spacing={4} direction="column">
                  <Typography
                    variant="h4"
                    fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                    fontWeight="700"
                    sx={{
                      ...uiConfigs.style.typoLines(2, "left"),
                    }}
                  >
                    {movie.title || movie.name}
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Ratings value={movie?.vote_average} />
                    <Divider orientation="vertical" />

                    {[...movie.genre_ids].splice(0, 2).map((genreId, index) => (
                      <Chip
                        variant="filled"
                        color="primary"
                        key={index}
                        label={
                          genre.find((e) => e.id === genreId) &&
                          genre.find((e) => e.id === genreId).name
                        }
                      />
                    ))}
                  </Stack>

                  {/* overview */}
                  <Typography
                    variant="body1"
                    sx={{
                      ...uiConfigs.style.typoLines(3),
                    }}
                  >
                    {movie.overview}
                  </Typography>
                  {/* overview */}

                  {/* buttons */}
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    component={Link}
                    to={routesGen.mediaDetail(mediaType, movie.id)}
                    sx={{ width: "max-content" }}
                  >
                    watch now
                  </Button>
                  {/* buttons */}
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSlide;
