import React from "react";
import classes from "./IncomingMessage.module.css";

const IncomingMessage = (props) => {
  return (
    <div className={classes.IncomingMessage}>
      <h4 className={classes.Senter}>{props.writer}</h4>
      <h4 className={classes.Time}>{props.sentAt}</h4>
      <div className={classes.Content}>
        <p>{props.content}</p>
      </div>
    </div>
  );
};

export default IncomingMessage;
