import React, { useEffect, useState } from "react";
import ChatInfo from "./chatInfo";
import ActualChatDisplay from "./actualChatDisplay";
import MessageInput from "./messageInput";
const ChatDisplay = (props) => {
  const [currentChat, setCurrentChat] = useState(props.currentChat);
  useEffect(() => {
    //set the current chat, which is the one that's open at the moment based
    //on the props given by the parent
    setCurrentChat(props.currentChat);
  }, [props.currentChat]);
  const style =
    currentChat.name == ""
      ? { border: "2px solid #555", borderLeft: "none" }
      : {};
  return (
    <div id="chat-display" style={style}>
      {currentChat.name != "" ? (
        <React.StrictMode>
          <ChatInfo name={currentChat.name} />
          <ActualChatDisplay messages={currentChat.messages} user={props.user}>
            <MessageInput currentChat={currentChat} user={props.user} />
          </ActualChatDisplay>
        </React.StrictMode>
      ) : (
        ""
      )}
    </div>
  );
};
export default ChatDisplay;
