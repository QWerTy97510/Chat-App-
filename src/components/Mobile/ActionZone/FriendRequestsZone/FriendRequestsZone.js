import React, { useEffect, useState } from "react";
import classes from "./FriendRequestsZone.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../../store/actions/index";
import FriendReq from "./FriendReq/FriendReq";
import axios from "axios";
import baseURL from "../../../../store/actions/axiosBaseURL";

const FriendRequestsZone = (props) => {
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${baseURL}/friendRequest/getFR`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setData([...result.data.data]);
      })
      .catch((error) => console.log(error));
    return () => {};
  }, [token]);

  useEffect(() => {
    props.io.on("gotFriendRequest", ({ user }) => {
      setData([...data, user]);
    });
  }, [data, props.io]);

  const acceptFriendRequestHandler = (e, acceptTo) => {
    e.preventDefault();

    const newData = [...data];
    const updatedData = newData.filter((el) => el !== acceptTo);

    setData([...updatedData]);

    dispatch(actions.acceptFriend(acceptTo, token));
  };

  const rejectFriendRequestHandler = (e, rejectTo) => {
    e.preventDefault();

    const newData = [...data];
    const updatedData = newData.filter((el) => el !== rejectTo);

    setData([...updatedData]);

    dispatch(actions.rejectFriend(rejectTo, token));
  };

  let output = <h2>No friends requests</h2>;
  if (data.length > 0) {
    output = data.map((usr) => {
      return (
        <FriendReq
          user={usr}
          accept={(e) => acceptFriendRequestHandler(e, usr)}
          reject={(e) => rejectFriendRequestHandler(e, usr)}
          key={usr}
        />
      );
    });
  }

  return <div className={classes.FriendRequestZone}>{output}</div>;
};

export default FriendRequestsZone;
