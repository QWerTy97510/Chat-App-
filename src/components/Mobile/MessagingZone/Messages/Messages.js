import React, { useEffect } from "react";
import classes from "./Messages.module.css";
import SentMessage from "./SentMessage/SentMessage";
import IncomingMessage from "./IncomingMessage/IncomingMessage";

const Messages = (props) => {
  useEffect(() => {
    const element = document.querySelector("#messages");

    element.scrollTop = element.scrollHeight - element.clientHeight;
  }, [props.messages]);

  let output;
  if (props.messages.length > 0) {
    output = props.messages.map((msg) => {
      return msg.from !== props.friend ? (
        <SentMessage
          key={msg.id}
          writer="You"
          sentAt={msg.sentAt}
          content={msg.content}
        />
      ) : (
        <IncomingMessage
          key={msg.id}
          writer={msg.from}
          sentAt={msg.sentAt}
          content={msg.content}
        />
      );
    });
  }

  return (
    <div className={classes.Messages} id="messages">
      {output}
    </div>
  );
};

export default Messages;
