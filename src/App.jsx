import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import themeConfigs from "./configs/themeConfigs";
import CssBaseline from "@mui/material/CssBaseline";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import routes from "./routes/routes";
import PageWrapper from "./components/common/PageWrapper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const App = () => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: theme })}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes.map((route, index) =>
            route.index ? (
              <Route
                index
                key={index}
                element={
                  route.state ? (
                    <PageWrapper state={route.state}>
                      {route.element}
                    </PageWrapper>
                  ) : (
                    route.element
                  )
                }
              />
            ) : (
              <Route
                path={route.path}
                key={index}
                element={
                  route.state ? (
                    <PageWrapper state={route.state}>
                      {route.element}
                    </PageWrapper>
                  ) : (
                    route.element
                  )
                }
              />
            )
          )}
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
