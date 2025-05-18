const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3/",
  apiKey: import.meta.env.VITE_APP_TMDB_API_KEY,
  apiToken: import.meta.env.VITE_APP_TMDB_API_TOKEN,
  backdropPath: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  posterPath: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  youtubePath: (videoId) =>
    `https://www.youtube.com/embed/${videoId}?controls=0`,
};

export default apiConfig;
