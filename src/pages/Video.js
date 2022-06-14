import React from "react";
import { useParams } from "react-router";
// import { Link } from "react-router-dom";

const Video = () => {
  let { id } = useParams();
  return (
    <div className="video">
      <iframe
        width="560px"
        height="315px"
        src={"https://www.youtube.com/embed/" + id}
        title="Youtube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboardWrite; encryptedMedia; gyroscope; pictureInPicture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
