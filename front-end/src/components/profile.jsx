import React, { useState, useEffect } from "react";
import arrow from "../images/arrow.svg";
import Default from "../images/Default.jpg";

const Profile = (props) => {
  const [name, setName] = useState(props.name);
  const [status, setStatus] = useState("Just relaxing...");
  useEffect(() => {
    //appearing animation
    let self = document.getElementById("profile-component");
    self.style.transform = "translateX(0%)";
    self.style.opacity = "100";
  }, [props.changingProfile]);

  return (
    <div id="profile-component">
      <div id="profComp-uppart">
        <img src={arrow} alt="" onClick={props.takemeout} />
        <h1 id="profile-component-title">Profile</h1>
      </div>
      <div id="profComp-profPicture">
        <div id="profComp-img">
          <img src={Default} />
          <span>Change</span>
        </div>
      </div>
      <div id="profComp-form">
        {/*yourname part*/}
        <p>Your name:</p>
        <div id="profile-name">
          <input
            type="text"
            id="form-name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            readOnly
          />
          <button
            id="profComp-editNameButton"
            onClick={() => {
              document.getElementById("form-name").readOnly = false;
              let self = document.getElementById("profComp-editNameButton");
              self.style.opacity = 0;
              self.style.pointerEvents = "none";
              setTimeout(() => {
                //this function makes the edit button disappear and the
                //save button appear smoothly
                let saveButton = document.getElementById(
                  "profComp-saveNameButton"
                );
                self.style.position = "absolute";
                saveButton.style.position = "relative";
                saveButton.style.opacity = "100";
                saveButton.style.pointerEvents = "all";
              }, 400);
            }}
          >
            Edit
          </button>
          <button
            id="profComp-saveNameButton"
            onClick={() => {
              document.getElementById("form-name").readOnly = true;
              let self = document.getElementById("profComp-saveNameButton");
              self.style.opacity = 0;
              self.style.pointerEvents = "none";
              setTimeout(() => {
                //this function makes the edit button disappear and the
                //save button appear smoothly
                let editButton = document.getElementById(
                  "profComp-editNameButton"
                );
                self.style.position = "absolute";
                editButton.style.position = "relative";
                editButton.style.opacity = "100";
                editButton.style.pointerEvents = "all";
              }, 400);
            }}
          >
            Save
          </button>
        </div>
        {/*your status part*/}
        <p>Status:</p>
        <div id="profile-status">
          <input
            type="text"
            id="form-status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            readOnly
          />
          <button
            id="profComp-editStatusButton"
            onClick={() => {
              document.getElementById("form-status").readOnly = false;
              let self = document.getElementById("profComp-editStatusButton");
              self.style.opacity = 0;
              self.style.pointerEvents = "none";
              setTimeout(() => {
                //this function makes the edit button disappear and the
                //save button appear smoothly
                let saveButton = document.getElementById(
                  "profComp-saveStatusButton"
                );
                self.style.position = "absolute";
                saveButton.style.position = "relative";
                saveButton.style.opacity = "100";
                saveButton.style.pointerEvents = "all";
              }, 400);
            }}
          >
            Edit
          </button>
          <button
            id="profComp-saveStatusButton"
            onClick={() => {
              document.getElementById("form-status").readOnly = true;
              let self = document.getElementById("profComp-saveStatusButton");
              self.style.opacity = 0;
              self.style.pointerEvents = "none";
              setTimeout(() => {
                //this function makes the edit button disappear and the
                //save button appear smoothly
                let editButton = document.getElementById(
                  "profComp-editStatusButton"
                );
                self.style.position = "absolute";
                editButton.style.position = "relative";
                editButton.style.opacity = "100";
                editButton.style.pointerEvents = "all";
              }, 400);
            }}
          >
            Save
          </button>
        </div>
        <p>Number:</p>
        <div id="profile-number">
          <input type="text" id="form-status" value={props.number} readOnly />
        </div>
      </div>
    </div>
  );
};

export default Profile;
