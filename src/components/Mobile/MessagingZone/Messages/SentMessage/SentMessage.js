import React from "react";
import classes from "./SentMessage.module.css";

const SentMessage = (props) => {
  return (
    <div className={classes.SentMessage}>
      <h4 className={classes.Senter}>{props.writer}</h4>
      <h4 className={classes.Time}>{props.sentAt}</h4>
      <div className={classes.Content}>
        <p>{props.content}</p>
      </div>
    </div>
  );
};

export default SentMessage;
