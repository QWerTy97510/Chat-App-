import React, { useState, useEffect } from "react";
import classes from "./MessagingZone.module.css";
import TopSideActions from "./TopSideActions/TopSideActions";
import InputContentZone from "./InputContentZone/InputContentZone";
import Messages from "./Messages/Messages";
import { useParams, useHistory } from "react-router";
import axios from "axios";
import baseURL from "../../../store/actions/axiosBaseURL";

const MessagingZone = (props) => {
  const username = localStorage.getItem("username");
  const { friend } = useParams();

  const reactRouterHistory = useHistory();

  if (username === friend) reactRouterHistory.push("/");

  const [messages, setMessages] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${baseURL}/message/get/${friend}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        const msgs = result.data.messages.map((msg) => {
          return {
            ...msg,
            sentAt: new Date(msg.sentAt).toLocaleTimeString(),
          };
        });
        setMessages(msgs);
      })
      .catch((err) => console.log(err));
  }, [friend, token]);

  useEffect(() => {
    props.io.on("sendMessage", ({ message, userTo, userFrom }) => {
      if (
        (username === userFrom && friend === userTo) ||
        (username === userTo && friend === userFrom)
      ) {
        setMessages((oldMessages) => [
          ...oldMessages,
          {
            ...message,
            id: message._id,
            sentAt: new Date(message.createdAt).toLocaleTimeString(),
          },
        ]);
      }
    });
  }, [props.io, username, friend]);

  return (
    <div className={classes.MessagingZone}>
      <TopSideActions />
      <Messages io={props.io} messages={messages} friend={friend} />
      <InputContentZone />
    </div>
  );
};

export default MessagingZone;
