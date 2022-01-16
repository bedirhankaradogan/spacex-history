import React from "react";
import PropTypes from "prop-types";

import "./launch-patch.css";

function LaunchPatch({ url }) {
  return url
    ? <img src={url} className="launch-patch-image"/>
    : <div className="launch-patch-image launch-patch-not-found">No mission patch</div>;
}

LaunchPatch.propTypes = {
  url: PropTypes.string
};

export default LaunchPatch;
