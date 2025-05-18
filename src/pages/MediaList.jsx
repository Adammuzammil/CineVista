import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import usePrevious from "../hooks/usePrevious";
import { setGlobalLoading } from "../redux/features/globalLoading";
import tmdbApi, { category } from "../api/tmdbApi";
import HeroSlide from "../components/common/HeroSlide";
import { Box, Button, Stack, Typography } from "@mui/material";
import uiConfigs from "../configs/uiConfigs";
import MediaGrid from "../components/common/MediaGrid";
import { LoadingButton } from "@mui/lab";

const MediaList = () => {
  const { mediaType } = useParams();

  const [medias, setMedias] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currCategory, setCurrCategory] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  const prevMediaType = usePrevious(mediaType);
  const dispatch = useDispatch();

  const mediaCategories = useMemo(() => ["popular", "top_rated"], []);

  const category = ["popular", "top rated"];

  useEffect(() => {
    const getMedias = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true));
      setMediaLoading(true);

      const response = await tmdbApi.getMediaList(
        mediaType,
        mediaCategories[currCategory],
        currPage
      );

      setMediaLoading(false);
      dispatch(setGlobalLoading(false));

      if (response) {
        if (currPage !== 1)
          setMedias((media) => [...media, ...response.results]);
        else setMedias([...response.results]);
      }
    };

    if (mediaType !== prevMediaType) {
      setCurrCategory(0);
      setCurrPage(1);
    }

    getMedias();
  }, [
    mediaType,
    currCategory,
    currPage,
    prevMediaType,
    dispatch,
    mediaCategories,
  ]);

  const onCategoryChange = (indx) => {
    if (currCategory === indx) return;
    setMedias([]);
    setCurrPage(1);
    setCurrCategory(indx);
  };

  const onLoadMore = () => setCurrPage(currPage + 1);

  return (
    <>
      <HeroSlide
        mediaType={mediaType}
        mediaCategory={mediaCategories[currCategory]}
      />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: 4 }}
        >
          <Typography>
            {mediaType === "movie" ? "Movies" : "TV Series"}
          </Typography>
          <Stack direction="row" spacing={2}>
            {category.map((cate, index) => (
              <Button
                key={index}
                size="large"
                variant={currCategory === index ? "contained" : "text"}
                sx={{
                  color:
                    currCategory === index
                      ? "primary.contrastText"
                      : "text.primary",
                }}
                onClick={() => onCategoryChange(index)}
              >
                {cate}
              </Button>
            ))}
          </Stack>
        </Stack>
        <MediaGrid medias={medias} mediaType={mediaType} />

        <LoadingButton
          sx={{ marginTop: 8 }}
          fullWidth
          color="primary"
          loading={mediaLoading}
          onClick={onLoadMore}
        >
          load more
        </LoadingButton>
      </Box>
    </>
  );
};

export default MediaList;
