import React, { useState, useEffect } from "react";
const LoginComponent = (props) => {
  const [number, setNumber] = useState("");
  const [username, setUsername] = useState();
  useEffect(() => {
    //little appearing animation
    document.querySelector(".login-component").style.transform =
      "translateY(-20%)";
    document.querySelector(".login-component").style.opacity = "100";
  }, []);
  return (
    <div className="login-component">
      <h1 className="login-title">Whatsapp Clone</h1>
      <form
        className="not-a-form"
        onSubmit={(e) => {
          e.preventDefault();
          props.loginInfo(number, username);
        }}
      >
        <input
          type="tel"
          id="login-number"
          placeholder="Type your Number"
          minLength="8"
          autoComplete="off"
          onChange={(e) => {
            //this function makes sure that only numbers are allowed to be typed in.
            if (!isNaN(e.target.value)) {
              setNumber(e.target.value);
            } else {
              e.target.value = e.target.value.substring(
                0,
                e.target.value.length - 1
              );
            }
          }}
          required
        />
        <input
          type="text"
          id="login-username"
          placeholder="Type your username"
          minLength="3"
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginComponent;
