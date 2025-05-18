import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import React, { useEffect, useState } from "react";
import apiConfig from "../../api/apiConfig";
import { Link } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import { routesGen } from "../../routes/routes";
import uiConfigs from "../../configs/uiConfigs";
import Ratings from "./Ratings";

const MediaItem = ({ media, mediaType }) => {
  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [rate, setRate] = useState(null);

  useEffect(() => {
    setTitle(media?.title || media?.name || media?.mediaTitle);

    setPosterPath(
      apiConfig.posterPath(
        media?.poster_path ||
          media?.backdrop_path ||
          media?.mediaPoster ||
          media?.profile_path
      )
    );

    setReleaseDate(media?.release_date && media?.release_date.split("-")[0]);

    setRate(media?.vote_average || media?.mediaRate);
  }, []);

  return (
    <Link
      to={
        mediaType !== "person"
          ? routesGen.mediaDetail(mediaType, media?.mediaId || media?.id)
          : routesGen.person(media?.id)
      }
    >
      <Box
        sx={{
          ...uiConfigs.style.backgroundImage(posterPath),
          paddingTop: "160%",
          "&:hover .media-info": { opacity: 1, bottom: 0 },
          "&:hover .media-back-drop, &:hover .media-play-btn": { opacity: 1 },
          color: "primary.contrastText",
          borderRadius: "10px",
        }}
      >
        <Box
          className="media-back-drop"
          sx={{
            opacity: { xs: 1, md: 0 },
            transition: "all 0.3s ease",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundImage:
              "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
          }}
        />
        <Button
          className="media-play-btn"
          variant="contained"
          startIcon={<PlayArrowIcon />}
          sx={{
            display: { xs: "none", md: "flex" },
            opacity: 0,
            transition: "all 0.3s ease",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            "& .MuiButton-startIcon": { marginRight: "-4px" },
          }}
        />
        <Box
          className="media-info"
          sx={{
            transition: "all 0.3s ease",
            opacity: { xs: 1, md: 0 },
            position: "absolute",
            bottom: { xs: 0, md: "-20px" },
            width: "100%",
            height: "max-content",
            boxSizing: "border-box",
            padding: { xs: "10px", md: "2rem 1rem" },
          }}
        >
          <Stack spacing={{ xs: 1, md: 2 }}>
            {rate && <Ratings value={rate} />}
            <Typography>{releaseDate}</Typography>

            <Typography
              variant="body1"
              fontWeight="700"
              sx={{
                fontSize: "1rem",
                ...uiConfigs.style.typoLines(1, "left"),
              }}
            >
              {title}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Link>
  );
};

export default MediaItem;
