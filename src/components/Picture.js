import React from "react";
import { Link } from "react-router-dom";
const Picture = ({ item }) => {
  return (
    <Link
      to={`/video/${item.id}`}
      className="picture"
      // target="_blank"
      rel="noreferrer noopener"
    >
      <img src={item.imgSrc} alt={item.title} />
      <p>{item.title}</p>
    </Link>
  );
};

export default Picture;
