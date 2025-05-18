import React from "react";
import HeroSlide from "../components/common/HeroSlide";
import { category, movieType, tvType } from "../api/tmdbApi";
import { Box } from "@mui/material";
import uiConfigs from "../configs/uiConfigs";
import Container from "../components/common/Container";
import MediaSlide from "../components/common/MediaSlide";
import Upcoming from "../components/common/Upcoming";

const Home = () => {
  return (
    <>
      <HeroSlide mediaType={category.movie} mediaCategory={movieType.popular} />

      <Box marginTop="-4rem" sx={{ ...uiConfigs.style.mainContent }}>
        <Container header="Upcoming movies">
          <MediaSlide
            mediaType={category.movie}
            mediaCategory={movieType.upcoming}
          />
        </Container>

        <Container header="popular movies">
          <MediaSlide
            mediaType={category.movie}
            mediaCategory={movieType.popular}
          />
        </Container>

        <Container header="popular series">
          <MediaSlide mediaType={category.tv} mediaCategory={tvType.popular} />
        </Container>

        <Container header="top rated movies">
          <MediaSlide
            mediaType={category.movie}
            mediaCategory={movieType.top_rated}
          />
        </Container>

        <Container header="top rated series">
          <MediaSlide
            mediaType={category.tv}
            mediaCategory={tvType.top_rated}
          />
        </Container>
      </Box>
    </>
  );
};

export default Home;
