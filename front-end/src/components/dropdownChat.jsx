import React, { useEffect, useRef, useState } from "react";

const DropDown = (props) => {
  const [active, setActive] = useState(props.active);
  const dropdownRef = useRef();
  useEffect(() => {
    setActive(props.active ? true : false);
  }, [props.active]);
  useEffect(() => {
    if (active) {
      dropdownRef.current.style.opacity = "100";
      dropdownRef.current.style.pointerEvents = "all";
      dropdownRef.current.style.transform = "translateY(75%)";
    } else {
      dropdownRef.current.style.removeProperty("opacity");
      dropdownRef.current.style.removeProperty("pointer-events");
      dropdownRef.current.style.removeProperty("transform");
    }

    document.onmousedown = (e) => {
      props.disappear();
    };
  });
  return (
    <ul ref={dropdownRef} className="dropdown-chat">
      <li>Delete Chat</li>
      <li>Pin Chat</li>
      <li>Archive Chat</li>
    </ul>
  );
};

export default DropDown;
