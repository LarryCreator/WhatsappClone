import React from "react";
import Default from "../images/Default.jpg";
const ChatInfo = (props) => {
  return (
    <div id="chat-info">
      <img src={Default} alt="default" />
      <span>{props.name}</span>
    </div>
  );
};

export default ChatInfo;
