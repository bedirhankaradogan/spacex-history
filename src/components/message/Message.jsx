import React from "react";
import PropTypes from "prop-types";

import "./message.css";

function Message({ text }) {
  return (
    <div className="message">
      {text}
    </div>
  );
}

Message.propTypes = {
  text: PropTypes.string.isRequired
};

export default Message;
