import "./App.css";
import { useState, useEffect, useRef } from "react";
import LoginComponent from "./components/loginComponent";
import WhatsappClone from "./components/whatsappClone";
import { socket } from "./socket/socket";
const axios = require("axios");

function App() {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState({});
  const [usersOnline, setUsersOnline] = useState([]);
  const [loginInformation, setLoginInformation] = useState({
    number: 0,
    username: "a",
  });
  const userRef = useRef();
  userRef.current = user;
  const handleLogin = (n, u) => {
    let data = { number: n, username: u, id: socket.id };
    setLoginInformation(data);
    let onlineUsers = [...usersOnline];
    onlineUsers.push(data);
    setUsersOnline(onlineUsers);
  };
  useEffect(() => {
    //listening to signal from database about the new contact.
    socket.on("update-contact-view", (namee, number, messages) => {
      let newContact = { name: namee, number: number, messages: messages };
      let userrContacts = [...userRef.current.contacts];
      userrContacts.push(newContact);
      let newuser = {
        username: userRef.current.username,
        number: userRef.current.number,
        contacts: userrContacts,
      };
      setUser(newuser);
    });
  }, []);

  useEffect(() => {
    let api = "http://localhost:4500";
    let data = new FormData();
    console.log("using");
    data.append("number", loginInformation.number);
    data.append("username", loginInformation.username);
    axios.post(`${api}/get-login-info`, data).then((resp) => {
      setUser(resp.data != "" ? resp.data : {});
      setLogged(resp.data != "" ? true : false);
    });
  }, [loginInformation]);
  return (
    <div className="App">
      {logged === true && user != {} ? (
        <WhatsappClone user={user} />
      ) : (
        <LoginComponent loginInfo={handleLogin} />
      )}
    </div>
  );
}

export default App;
