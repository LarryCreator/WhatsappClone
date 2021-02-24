import React, { useEffect, useState } from "react";

const AddContact = (props) => {
  const [number, setNumber] = useState("");
  useEffect(() => {
    //if props.adding is equals true, then make the darkening effect happen and
    //make itself visible.
    let makeitdarkDiv = document.getElementById("makeitdark");
    let addContactDiv = document.getElementById("addContact");
    makeitdarkDiv.style.opacity = "100";
    addContactDiv.style.opacity = "100";
    document.body.style.pointerEvents = "none";
    addContactDiv.style.pointerEvents = "all";
    //those two mousedown functions are responsible for making it
    //disappear when you click outside of it.
    addContactDiv.onmousedown = (e) => {
      e.stopPropagation();
    };
    document.onmousedown = (e) => {
      props.takemeout();
    };
  }, [props.adding]);
  return (
    <div id="addContact">
      <h1>Add new Contact</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          document.getElementById("addContactNumber").value = "";
          props.addTheContact(number);
        }}
      >
        <input
          type="text"
          placeholder="Number"
          id="addContactNumber"
          minLength="8"
          autoComplete="off"
          onChange={(e) => {
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
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddContact;
