import React, { Component, useState, useEffect, useRef } from "react";
import MenuBar from "./menuBar";
import Chats from "./chats";
import ChatDisplay from "./chatDisplay";
import AddContact from "./addContact";
import Profile from "./profile";
import { socket } from "../socket/socket";

const WhatsappClone = (props) => {
  //section to set the states and reference to it.
  const [addingNewContact, setAddingNewContact] = useState(false);
  const [changingProfile, setChangingProfile] = useState(false);
  const [chatsopened, setChatsOpened] = useState([]);
  const [activeChat, setActiveChat] = useState({
    name: "",
    number: 0,
    messages: [],
  });
  const chatsopenedRef = useRef();
  chatsopenedRef.current = chatsopened;
  const activeChatRef = useRef();
  activeChatRef.current = activeChat;
  //
  useEffect(() => {
    //little appearing animation
    document.getElementById("actual-app").style.transform = "translateY(0)";
    document.getElementById("actual-app").style.opacity = "100";

    //socket that updates the chat messages view
    socket.on("update-view", (data, number, yourNumber, yourUsername) => {
      //data stands for the message data, like the message and who sent it.
      //number stands for the message receiver's number.
      //your number stands for the message sender's number.
      //yourUsername stands for the message sender's name.
      //if you're one of the people who's sending or receiving this message then set it's type and data.
      //otherwise, set it to null.
      let message =
        props.user.number == yourNumber
          ? data
          : props.user.number == number
          ? { msg: data.msg, type: "theirs" }
          : 0;
      //the chat opened list is a dynamic list based on the contacts list you pulled from
      //the database. You created it to avoid requesting the database all the time to update the view.
      //It basically makes the view update by itself.
      //So, this loop will iterate through the chatsopened list onlu if the chatsopened list has all
      //the contacts pulled from the database in it already. Otherwise it will iterate through the
      //database contact list.
      for (let contact of chatsopenedRef.current.length <
      props.user.contacts.length + 1
        ? props.user.contacts
        : chatsopenedRef.current) {
        // if you're the sender or you're the receiver with the sender chat open...
        if (
          contact.number == number ||
          (contact.number == yourNumber &&
            activeChatRef.current.number == contact.number)
        ) {
          setActiveChat(() => {
            let m = {
              name: contact.name,
              number: contact.number,
              messages: [...contact.messages],
            };
            m.messages.push(message);
            return m;
          });
          break;
        }
        //otherwise, if you're the receiver with the sender chat not open...
        else if (
          contact.number == yourNumber &&
          activeChatRef.current.number != contact.number
        ) {
          setChatsOpened(
            updateContactsOpened(contact, message, chatsopenedRef.current)
          );
        }
        //otherwise, if you're the receiver and you don't have the sender contact added at all...
        else if (
          props.user.number == number &&
          chatsopenedRef.current.filter(
            (contactt) => contactt.number == yourNumber
          ).length == 0
        ) {
          //Update the chatsopened list manually, because when you receive a message from a new contact, your
          //activeChat doesnt change. So it basically doesn't trigger your mechanism to update the contactsopened
          //list automatically.
          let newContact = {
            name: yourUsername,
            number: yourNumber,
            messages: [],
          };
          setChatsOpened(
            updateContactsOpened(newContact, message, chatsopenedRef.current)
          );
          //emit signal with the number you're adding, your number, and messages.
          socket.emit("newcontact", yourNumber, props.user.number, [message]);
        }
      }
    });
  }, []);
  useEffect(() => {
    if (!changingProfile) {
      let profileComponent = document.getElementById("profile-component");
      profileComponent.style.transform = "translateX(-100%)";
      profileComponent.style.opacity = "0";
    }
  }, [changingProfile]);
  useEffect(() => {
    //setting a reference to the div that gets dark and to the div that
    //has the add contact form
    let makeitdarkDiv = document.getElementById("makeitdark");
    let addContactDiv = document.getElementById("addContact");
    //if the add contact form wasn't called, then make it disappear and
    //set the darkening effects and etc off
    if (!addingNewContact) {
      document.getElementById("addContact").style.pointerEvents = "none";
      makeitdarkDiv.style.opacity = "0";
      addContactDiv.style.opacity = "0";
      document.body.style.pointerEvents = "all";
    }
  }, [addingNewContact]);
  useEffect(() => {
    if (!chatsopened.includes(activeChat)) {
      let fakechatsopened = [...chatsopened];
      for (let chat of chatsopened) {
        if (chat.number == activeChat.number) {
          let index = chatsopened.indexOf(chat);
          fakechatsopened.splice(index, 1);
        }
      }
      fakechatsopened.push(activeChat);
      setChatsOpened(fakechatsopened);
    }
  }, [activeChat]);
  const handleChatClick = (name, number) => {
    setActiveChat((current) => {
      //get the database information of the chat via socketio
      //loop through chatsopened if it's length is equals to props.user.contacts length, otherwise,
      //loop through props.user.contacts
      for (let contact of chatsopened.length < props.user.contacts.length + 1
        ? props.user.contacts
        : chatsopened) {
        //if the chat you just clicked is the same as the current in the loop and
        //the current active chat is not the one you just clicked in, then...
        if (contact.number == number && current.number != number) {
          if (!chatsopened.includes(contact)) {
            return contact;
          } else {
            return chatsopened.filter(
              (chat) => chat.number == contact.number
            )[0];
          }
        } else if (contact.number == number && current.number == number) {
          return contact;
        }
      }
    });
  };
  const handleAddContactClick = () => {
    //This function is called if the user clicked the add new contact button.
    //It changes the state to adding new contact.
    setAddingNewContact(true);
  };
  const handleChangeProfileClick = () => {
    setChangingProfile(true);
  };
  const addNewContact = (number) => {
    //This function is called when the user filled the add new contact form and
    //is submitting it.
    //The variable below is a boolean that checks if you have this contact you're trying
    //to add already.
    let doiHaveItAlready = false;
    for (let contact of props.user.contacts) {
      if (number == contact.number) {
        doiHaveItAlready = true;
        alert("This number is in your contact list already!");
        break;
      }
    }
    //if you don't have this contact, then emit the new contact signal for it to be added and
    //set the state to not adding a new contact anymore, because the proccess here is done.
    if (!doiHaveItAlready) {
      //emit signal with the number you're adding, your number, and messages.
      socket.emit("newcontact", number, props.user.number, []);
      setAddingNewContact(false);
    }
  };

  const updateContactsOpened = (contact, message, chatsopened) => {
    //this function is only called inside the update view socket inside this component.
    //it's also only called when you're the receiver and you don't have the sender's chat opened.
    //the contact parameter stands for the message sender's info
    let fakechatsopened = [...chatsopened];
    for (let chat of fakechatsopened) {
      if (chat.number == contact.number) {
        let index = fakechatsopened.indexOf(chat);
        fakechatsopened.splice(index, 1);
      }
    }
    let m = {
      name: contact.name,
      number: contact.number,
      messages: [...contact.messages],
    };
    m.messages.push(message);
    fakechatsopened.push(m);
    return fakechatsopened;
  };

  return (
    <div id="actual-app">
      <div id="makeitdark"></div>
      <div id="left-side">
        <MenuBar
          handleAddContact={handleAddContactClick}
          handleChangingProfile={handleChangeProfileClick}
        />
        <Chats user={props.user} clicked={handleChatClick} />
        <Profile
          name={props.user.username}
          number={props.user.number}
          changingProfile={changingProfile}
          takemeout={() => setChangingProfile(false)}
        />
      </div>
      <div id="right-side">
        <ChatDisplay currentChat={activeChat} user={props.user} />
      </div>
      <AddContact
        addTheContact={addNewContact}
        adding={addingNewContact}
        takemeout={() => setAddingNewContact(false)}
      />
    </div>
  );
};

export default WhatsappClone;
