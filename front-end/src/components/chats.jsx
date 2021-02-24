import React, { useEffect, useState } from "react";
import Chat from "./chat";
const Chats = (props) => {
  const [chats, setChats] = useState(props.user);
  useEffect(() => {
    setChats(props.user);
  }, [props.user.contacts]);

  return (
    <div id="chats">
      {chats.contacts != null
        ? chats.contacts.map((chat) => {
            return (
              <Chat
                key={chat.number}
                name={chat.name}
                number={chat.number}
                clicked={props.clicked}
              />
            );
          })
        : ""}
    </div>
  );
};

export default Chats;
