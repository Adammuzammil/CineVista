import React, { useEffect, useState } from "react";
import tmdbApi from "../../api/tmdbApi";
import { Button, Grid } from "@mui/material";
import MediaItem from "./MediaItem";

const PersonGrid = ({ personId }) => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const skip = 8;

  useEffect(() => {
    const getMedias = async () => {
      const response = await tmdbApi.personMedias(personId);
      console.log(response);

      if (response) {
        const mediasSorted = response.cast.sort(
          (a, b) => getReleaseDate(b) - getReleaseDate(a)
        );
        setMedias([...mediasSorted]);
        setFilteredMedias([...mediasSorted].splice(0, skip));
      }
    };

    getMedias();
  }, [personId]);

  const getReleaseDate = (media) => {
    const date =
      media.media_type === "movie"
        ? new Date(media.release_date)
        : new Date(media.first_air_date);
    return date.getTime();
  };

  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  return (
    <>
      <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
        {filteredMedias.map((media, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <MediaItem media={media} mediaType={media.media_type} />
          </Grid>
        ))}
      </Grid>
      {filteredMedias.length < medias.length && (
        <Button onClick={onLoadMore}>load more</Button>
      )}
    </>
  );
};

export default PersonGrid;
