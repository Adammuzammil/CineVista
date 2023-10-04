import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineSearch } from "react-icons/hi";
import { useNavigate, useLocation, Link } from "react-router-dom";

import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState("top");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  //scroll
  const controlNavbar = () => {
    console.log("Current", window.scrollY);
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !toggle) {
        console.log("Last", lastScrollY);
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const toggleMenu = () => {
    setToggle(true);
    setShowSearch(false);
  };

  const openSearch = () => {
    setShowSearch(true);
    setToggle(false);
  };

  const searchHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`search/${query}`);

      //Making sure that it closes after a sec
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const pageNavigation = (mtype) => {
    if (mtype === "movie") {
      navigate("explore/movie");
    } else {
      navigate("explore/tv");
    }
    setToggle(false);
  };

  return (
    <nav className={`navbar ${toggle ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <ul className="navItems">
          <li className="navItem" onClick={() => pageNavigation("movie")}>
            Movies
          </li>
          <li className="navItem" onClick={() => pageNavigation("tv")}>
            TV Series
          </li>
          <li className="navItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobilenavItems">
          <HiOutlineSearch onClick={openSearch} />
          {toggle ? (
            <AiOutlineClose onClick={() => setToggle(false)} />
          ) : (
            <AiOutlineMenu onClick={toggleMenu} />
          )}
        </div>
      </ContentWrapper>

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchContainer">
              <input
                type="text"
                name=""
                id=""
                placeholder="Search..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchHandler}
              />
              <AiOutlineClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
