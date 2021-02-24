import React from "react";
const MenuBar = (props) => {
  return (
    <div id="menuBar">
      <button
        id="activate-profile-menu-button"
        onClick={props.handleChangingProfile}
      >
        Your Profile
      </button>
      <button id="create-chat" onClick={props.handleAddContact}>
        Create a new chat
      </button>
    </div>
  );
};

export default MenuBar;
