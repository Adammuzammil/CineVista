import { Box } from "@mui/material";
import apiConfig from "../../api/apiConfig";
import { useEffect, useRef } from "react";

const MediaVideo = ({ video }) => {
  const iframeRef = useRef();

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, [video]);

  return (
    <Box sx={{ height: "max-content" }}>
      <iframe
        key={video.key}
        src={apiConfig.youtubePath(video.key)}
        ref={iframeRef}
        width="100%"
        title={video.id}
        style={{ border: 0 }}
      ></iframe>
    </Box>
  );
};

export default MediaVideo;
