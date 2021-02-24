import React, { useRef, useState } from "react";
import Default from "../images/Default.jpg";
import downArrow from "../images/down-arrow.svg";
import DropDown from "./dropdownChat";
const Chat = (props) => {
  const [dropdown, setDropDown] = useState(false);
  const downArrowRef = useRef();
  const chatRef = useRef();
  return (
    <div
      ref={chatRef}
      className="chat"
      onClick={(e) => {
        //if the click was actually on the parent and not on any child, continue.
        if (e.target != downArrowRef.current) {
          //change it's background color to the active one, and remove
          //the active background color from any other that was active before
          let chats = document.querySelectorAll(".chat");
          for (let chat of chats) {
            if (chat.style.backgroundColor == "rgba(0, 0, 0, 0.61)") {
              chat.style.removeProperty("background-color");
            }
            if (
              chat.querySelector("span").textContent == props.name &&
              chat.style.backgroundColor != "rgba(0, 0, 0, 0.61)"
            ) {
              chat.style.backgroundColor = "rgba(0, 0, 0, 0.61)";
            }
          }
          //call clicked function from props
          props.clicked(props.name, props.number);
        }
      }}
      onMouseEnter={() => {
        //if the arrow is over this chat, then make the down arrow visible
        downArrowRef.current.style.opacity = "100";
        downArrowRef.current.style.right = "45px";
      }}
      onMouseLeave={() => {
        //if the arrow leaves this chat, then make the down arrow invisible
        downArrowRef.current.style.opacity = "0";
        downArrowRef.current.style.removeProperty("right");
      }}
    >
      <img src={Default} alt="default" />
      <span>{props.name}</span>
      <img
        onClick={() => {
          setDropDown(true);
        }}
        className="downArrows-chat"
        src={downArrow}
        ref={downArrowRef}
      />
      <DropDown
        active={dropdown}
        disappear={() => {
          setDropDown(false);
        }}
      />
    </div>
  );
};

export default Chat;
