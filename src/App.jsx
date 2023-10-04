import React, { useEffect } from "react";
import { fetchData } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getConfig, getGenre } from "./store/home-slice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Search from "./pages/home/Search/Search";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Info from "./pages/info/Info";

const App = () => {
  const pages = useSelector((state) => state.home.url);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPopular = async () => {
      const res = await fetchData("/configuration");

      const url = {
        backDrop: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
      };

      dispatch(getConfig(url));
    };

    fetchPopular();
    genresApi();
  }, []);

  const genresApi = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchData(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);

    // console.log(data);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenre(allGenres));
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Info />} />
        <Route path="search/:query" element={<Search />} />
        <Route path="/explore/:mediaType" element={<Info />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
