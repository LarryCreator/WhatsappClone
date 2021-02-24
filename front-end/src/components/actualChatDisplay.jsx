import React, { useEffect, useState } from "react";
import YourMessage from "./yourMessage";
import TheirMessage from "./theirMessage";
const ActualChatDisplay = (props) => {
  const [messages, setMessages] = useState("");
  useEffect(() => {
    //change it's state based on the props given by the parent
    setMessages(props.messages);
  }, [props.messages]);
  useEffect(() => {
    //everytime a message is sent, it scrolls all the way down.
    var objDiv = document.querySelector("#actual-chat-display");
    objDiv.scrollTop = objDiv.scrollHeight;
  });
  return (
    <div id="actual-chat-display">
      {messages != 0
        ? messages.map((message) => {
            return message.type == "yours" ? (
              <YourMessage
                key={Math.random() * 1000000}
                message={message.msg}
              />
            ) : (
              <TheirMessage
                key={Math.random() * 1000000}
                message={message.msg}
              />
            );
          })
        : ""}
      {props.children}
    </div>
  );
};

export default ActualChatDisplay;
