import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_KEY = import.meta.env.VITE_APP_TMDB_KEY;

const headers = {
  Authorization: "Bearer " + TMDB_KEY,
};

export const fetchData = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
