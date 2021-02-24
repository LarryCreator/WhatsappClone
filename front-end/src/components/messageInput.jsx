import React, { useState } from "react";
import { socket } from "../socket/socket";
const MessageInput = (props) => {
  return (
    <form
      id="message-input"
      onSubmit={(e) => {
        let input = e.target.querySelector("#msg-input");
        let data = {
          msg: input.value,
          type: "yours",
        };
        //emits a signal to the database with the message data, the receiver number, and your number
        //which means the sender number.
        socket.emit("private-msg", data, props.currentChat.number, props.user);
        input.value = "";
        input.focus();
        e.preventDefault();
      }}
    >
      <input
        autoComplete="off"
        autoCapitalize="on"
        type="text"
        id="msg-input"
        required
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;
