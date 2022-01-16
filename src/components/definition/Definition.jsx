import React from "react";
import PropTypes from "prop-types";

import "./definition.css";

function Definition({ title, value, customStyle }) {
  return value ? (
    <div className="definition" style={customStyle}>
      {Boolean(title) && <div className="title">{title}</div>}
      <div className="value">{value}</div>
    </div>
  ) : null;
}

Definition.propTypes = {
  title: PropTypes.string,
  value: PropTypes.node,
  customStyle: PropTypes.object
};

export default Definition;
