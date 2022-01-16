import React from "react";
import PropTypes from "prop-types";

import "./gallery-view.css";

function GalleryView({ images }) {
  return (
    <div className="gallery-view">
      {images.map(image => (
        <a
          key={image}
          href={image}
          className="gallery-view-cell transition-animation"
          target="_blank"
          rel="noreferrer">
          <img className="gallery-view-cell-image" src={image}/>
        </a>
      ))}
    </div>
  );
}

GalleryView.propTypes = {
  images: PropTypes.array.isRequired
};

export default GalleryView;
