import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import tmdbApi from "../../api/tmdbApi";
import { useParams } from "react-router-dom";
import { setGlobalLoading } from "../../redux/features/globalLoading";
import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import Container from "./Container";
import dayjs from "dayjs";
import apiConfig from "../../api/apiConfig";
import DOMPurify from "dompurify";

const MediaReview = ({ review }) => {
  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: "5px",
        position: "relative",
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Stack direction="row" spacing={2}>
        {/* avatar */}
        <Avatar
          sx={{
            width: 40,
            height: 40,
          }}
          // src={`${review.author_details.apiConfig.backdropPath(avatar_path)}`}
          src={`${apiConfig.backdropPath(review.author_details.avatar_path)}`}
        />
        {/* avatar */}
        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight="700">
              {review.author_details?.username}
            </Typography>
            <Typography variant="caption">
              {dayjs(review.created_at).format("DD-MM-YYYY HH:mm:ss")}
            </Typography>
          </Stack>
          <Typography
            variant="body1"
            textAlign="justify"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(review.content ? review.content : ""),
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

const MediaReviews = ({ mediaType, mediaId }) => {
  const [review, setReview] = useState([]);

  const dispatch = useDispatch();
  const [listReviews, setListReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState("");
  const [reviewCount, setReviewCount] = useState(0);

  const skip = 4;

  useEffect(() => {
    const getReviews = async () => {
      dispatch(setGlobalLoading(true));
      const response = await tmdbApi.review(mediaType, mediaId);
      dispatch(setGlobalLoading(false));
      console.log(response);

      if (response) {
        setReview(response.results);
      }
    };

    getReviews();
  }, []);

  useEffect(() => {
    setListReviews([...review]);
    setFilteredReviews([...review].splice(0, skip));
    setReviewCount(review.length);
  }, [review]);

  const onLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...listReviews].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  return (
    <>
      <Container header={`Reviews (${reviewCount})`}>
        <Stack spacing={4} marginBottom={2}>
          {filteredReviews.map((item) =>
            item.author ? (
              <Box key={item.id}>
                <MediaReview review={item} />
                <Divider
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                />
              </Box>
            ) : null
          )}
          {filteredReviews.length < listReviews.length && (
            <Button onClick={onLoadMore}>load more</Button>
          )}
        </Stack>
        {/* {user && (
          <>
            <Divider />
            <Stack direction="row" spacing={2}>
              <TextAvatar text={user.displayName} />
              <Stack spacing={2} flexGrow={1}>
                <Typography variant="h6" fontWeight="700">
                  {user.displayName}
                </Typography>
                <TextField
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  multiline
                  rows={4}
                  placeholder="Write your review"
                  variant="outlined"
                />
                <LoadingButton
                  variant="contained"
                  size="large"
                  sx={{ width: "max-content" }}
                  startIcon={<SendOutlinedIcon />}
                  loadingPosition="start"
                  loading={onRequest}
                  onClick={onAddReview}
                >
                  post
                </LoadingButton>
              </Stack>
            </Stack>
          </>
        )} */}
      </Container>
    </>
  );
};

export default MediaReviews;
