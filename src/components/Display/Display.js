import React from "react";
import PropTypes from "prop-types";

import "./display.css";

Display.propTypes = {
  value: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired
};

/**
 * Generic component to display the countdown elements.
 */
function Display({ value, unit }) {
  return (
    <div className="displayContainer">
      <span className="displayValue">{value || "0"}</span>
      <span className="displayUnit">{unit || "Seconds"}</span>
    </div>
  );
}

export default Display;
