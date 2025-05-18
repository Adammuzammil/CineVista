import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { setGlobalLoading } from "../redux/features/globalLoading";
import tmdbApi from "../api/tmdbApi";
import ImageHeader from "../components/common/ImageHeader";

import apiConfig from "../api/apiConfig";
import uiConfigs from "../configs/uiConfigs";
import Ratings from "../components/common/Ratings";
import Container from "../components/common/Container";
import CastSlide from "../components/common/CastSlide";
import VideoSlide from "../components/common/VideoSlide";
import BackdropSlide from "../components/common/BackdropSlide";
import PosterSlide from "../components/common/PosterSlide";
import Recommendations from "../components/common/Recommendations";
import MediaReviews from "../components/common/MediaReviews";
import Similar from "../components/common/Similar";

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();

  const [media, setMedia] = useState();
  const [genres, setGenres] = useState([]);
  const [images, setImages] = useState([]);

  const dispatch = useDispatch();

  const videoRef = useRef(null);

  function convertRuntime(runtime) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    return `${hours}h ${minutes}m`;
  }

  useEffect(() => {
    const getDetail = async () => {
      dispatch(setGlobalLoading(true));
      const response = await tmdbApi.detail(mediaType, mediaId);
      console.log("Details", response);
      dispatch(setGlobalLoading(false));

      if (response) {
        setMedia(response);
        setGenres(response.genres);
      }
    };

    const getImages = async () => {
      dispatch(setGlobalLoading(true));
      const response = await tmdbApi.getImages(mediaType, mediaId);
      dispatch(setGlobalLoading(false));
      if (response) {
        setImages(response);
      }
    };

    getDetail();
    getImages();
  }, []);

  return media ? (
    <>
      <ImageHeader
        imgPath={apiConfig.backdropPath(
          media.backdrop_path || media.poster_path
        )}
      />
      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
        }}
      >
        {/* media content */}
        <Box
          sx={{
            marginTop: { xs: "-10rem", md: "-15rem", lg: "-20rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
            }}
          >
            {/* poster */}
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
              }}
            >
              <Box
                sx={{
                  paddingTop: "140%",
                  ...uiConfigs.style.backgroundImage(
                    apiConfig.posterPath(
                      media.poster_path || media.backdrop_path
                    )
                  ),
                }}
              />
            </Box>
            {/* poster */}

            {/* media Info */}
            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                color: "text.primary",
              }}
            >
              <Stack spacing={5}>
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                  fontWeight="700"
                  sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                >
                  {`${media.title || media.name} ${
                    mediaType === "movie"
                      ? media.release_date.split("-")[0]
                      : media.first_air_date
                  }`}
                </Typography>

                {/* rate and genres */}
                <Stack direction="row" spacing={1}>
                  <Ratings value={media.vote_average} />

                  <Divider orientation="vertical" />

                  {genres.map((genre, i) => (
                    <Chip
                      label={genre.name}
                      variant="filled"
                      color="primary"
                      key={i}
                    />
                  ))}
                </Stack>
                {/* rate and genres */}

                {/* release date and duration */}
                <Stack direction="row" spacing={1}>
                  <Typography
                    variant="h4"
                    fontSize={{ xs: "1rem", md: "1rem", lg: "1.15rem" }}
                  >
                    Release Date:
                    {`${media.release_date || media.first_air_date}`}
                  </Typography>
                  <Divider orientation="vertical" />

                  {mediaType === "movie" && (
                    <Typography
                      variant="h4"
                      fontSize={{ xs: "1rem", md: "1rem", lg: "1.15rem" }}
                    >
                      Duration:
                      {convertRuntime(media?.runtime)}
                    </Typography>
                  )}
                </Stack>
                {/* rate and genres */}

                {/* overview */}
                <Typography
                  variant="body1"
                  sx={{ ...uiConfigs.style.typoLines(5) }}
                >
                  {media.overview}
                </Typography>
                {/* overview */}

                {/* buttons */}
                <Button
                  variant="contained"
                  sx={{ width: "max-content" }}
                  size="large"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => videoRef.current.scrollIntoView()}
                >
                  watch now
                </Button>
                {/* buttons */}

                {/* cast */}
                <Container header="cast">
                  <CastSlide />
                </Container>
                {/* cast */}
              </Stack>
            </Box>
            {/* media Info */}
          </Box>
        </Box>

        {/* media videos */}
        {/* <div ref={videoRef} style={{ paddingTop: "2rem" }}>
          <Container header="Videos">
            <VideoSlide />
          </Container>
        </div> */}
        {/* media videos */}

        {/* media backdrop */}
        {images?.backdrops?.length > 0 && (
          <Container header="backdrops">
            <BackdropSlide backdrops={images.backdrops} />
          </Container>
        )}
        {/* media backdrop */}

        {/* media posters */}
        {images?.posters?.length > 0 && (
          <Container header="posters">
            <PosterSlide posters={images.posters} />
          </Container>
        )}
        {/* media posters */}

        {/* media reviews */}
        <MediaReviews mediaType={mediaType} mediaId={mediaId} />
        {/* media reviews */}

        {/* media recommendation */}
        <Container header="recommendations">
          <Recommendations mediaType={mediaType} mediaId={mediaId} />
        </Container>
        {/* media recommendation */}

        {/* Media Similar */}
        <Container header="Similar">
          <Similar mediaType={mediaType} mediaId={mediaId} />
        </Container>
        {/* Media Similar */}
      </Box>
    </>
  ) : null;
};

export default MediaDetail;
