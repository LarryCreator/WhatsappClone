import React from "react";
const TheirMessage = (props) => {
  return (
    <div className="their-message">
      <span className="message them">{props.message}</span>
    </div>
  );
};

export default TheirMessage;
