import axiosClient from "./axiosClient";

export const category = {
  movie: "movie",
  tv: "tv",
};

const mediaType = {
  movie: "movie",
  tv: "tv",
};

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};

export const mediaCategory = {
  popular: "popular",
  top_rated: "top_rated",
};

const tmdbApi = {
  getMoviesList: (type, params) => {
    const url = "movie/" + movieType[type];
    return axiosClient.get(url, params);
  },
  getMovieGenre: (type) => {
    const url = "genre/" + category[type] + "/list";
    return axiosClient.get(url);
  },
  getMediaList: (mediaType, mediaCategory, page, params = {}) => {
    const url = `${mediaType}/${mediaCategory}?page=${page}`;
    return axiosClient.get(url, { params });
  },
  getUpcomingList: (mediaType, mediaCategory, page, params = {}) => {
    const url = `${mediaType}/${mediaCategory}?page=${page}&primary_release_date.gte=${params}`;
    return axiosClient.get(url, { params });
  },
  getTvList: (type, params) => {
    const url = "tv/" + tvType[type];
    return axiosClient.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = category[cate] + "/" + id + "/videos";
    return axiosClient.get(url, { params: {} });
  },
  getImages: (cate, id) => {
    const url = category[cate] + "/" + id + "/images";
    return axiosClient.get(url, { params: {} });
  },
  search: (mediaType, query, page) => {
    const url = `search/${mediaType}?query=${query}&page=${page}`;
    return axiosClient.get(url);
  },
  detail: (cate, id, params) => {
    const url = category[cate] + "/" + id;
    return axiosClient.get(url, params);
  },
  credits: (cate, id) => {
    const url = category[cate] + "/" + id + "/credits";
    return axiosClient.get(url, { params: {} });
  },
  recommend: (cate, id) => {
    const url = category[cate] + "/" + id + "/recommendations";
    return axiosClient.get(url, { params: {} });
  },
  similar: (cate, id) => {
    const url = category[cate] + "/" + id + "/similar";
    return axiosClient.get(url, { params: {} });
  },
  review: (cate, id) => {
    const url = category[cate] + "/" + id + "/reviews";
    return axiosClient.get(url, { params: {} });
  },
  person: (id) => {
    const url = "person/" + id;
    return axiosClient.get(url);
  },
  personMedias: (id) => {
    const url = "person/" + id + "/combined_credits";
    return axiosClient.get(url);
  },
};

export default tmdbApi;
