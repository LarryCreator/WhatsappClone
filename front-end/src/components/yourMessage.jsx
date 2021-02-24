import React from "react";
const YourMessage = (props) => {
  return (
    <div className="your-message">
      <span className="message you">{props.message}</span>
    </div>
  );
};

export default YourMessage;
