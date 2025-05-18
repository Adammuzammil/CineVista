import { Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  const theme = useTheme();

  return (
    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
      <Typography fontWeight="700" fontSize="1.7rem">
        Fl<span style={{ color: theme.palette.primary.main }}>ix</span>r
      </Typography>
    </Link>
  );
};

export default Logo;
