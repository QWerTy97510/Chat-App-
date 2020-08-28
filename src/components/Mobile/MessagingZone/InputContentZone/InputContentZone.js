import React, { useState } from "react";
import classes from "./InputContentZone.module.css";
import sendIcon from "../../../../icons/iconfinder_Artboard_16_3935314.svg";
import axios from "axios";
import { useParams } from "react-router";
import baseURL from "../../../../store/actions/axiosBaseURL";

const InputContentZone = () => {
  const { friend } = useParams();

  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const sendMessageHandler = (e) => {
    e.preventDefault();

    axios
      .post(
        `${baseURL}/message/send/${friend}`,
        { content: message },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {})
      .catch((err) => console.log(err));

    setMessage("");
  };

  const keyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessageHandler(e);
    }
  };

  return (
    <div className={classes.InputContentZone}>
      <input
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={keyDown}
        value={message}
        placeholder="Type..."
      />
      <button
        onClick={(e) => {
          sendMessageHandler(e);
        }}
      >
        <img src={sendIcon} alt="Send" />
      </button>
    </div>
  );
};

export default InputContentZone;
