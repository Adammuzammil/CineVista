import React, { useEffect, useState } from "react";
import PersonGrid from "../components/common/PersonGrid";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import tmdbApi from "../api/tmdbApi";
import { setGlobalLoading } from "../redux/features/globalLoading";
import { Box, Stack, Toolbar, Typography } from "@mui/material";
import uiConfigs from "../configs/uiConfigs";
import apiConfig from "../api/apiConfig";
import Container from "../components/common/Container";

const PersonDetail = () => {
  const { personId } = useParams();
  const [person, setPerson] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const getPerson = async () => {
      dispatch(setGlobalLoading(true));
      const response = await tmdbApi.person(personId);
      console.log(response);
      dispatch(setGlobalLoading(false));

      // if (err) toast.error(err.message);
      if (response) setPerson(response);
    };

    getPerson();
  }, [personId]);

  return (
    <>
      <Toolbar />
      {person && (
        <>
          <Box sx={{ ...uiConfigs.style.mainContent }}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                sx={{
                  width: { xs: "50%", md: "20%" },
                }}
              >
                <Box
                  sx={{
                    paddingTop: "160%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "darkgrey",
                    backgroundImage: `url(${apiConfig.posterPath(
                      person.profile_path
                    )})`,
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: { xs: "100%", md: "80%" },
                  padding: { xs: "1rem 0", md: "1rem 2rem" },
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight="700">
                    {`${person.name} (${
                      person.birthday && person.birthday.split("-")[0]
                    }`}
                    {person.deathday &&
                      ` - ${person.deathday && person.deathday.split("-")[0]}`}
                    {")"}
                  </Typography>
                  <Typography sx={{ ...uiConfigs.style.typoLines(10) }}>
                    {person.biography}
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Container header="medias">
              <PersonGrid personId={personId} />
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default PersonDetail;
