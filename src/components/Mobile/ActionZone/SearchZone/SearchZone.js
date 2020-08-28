import React, { useState } from "react";
import classes from "./SearchZone.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../store/actions/index";
import FriendResult from "./FriendResult/FriendResult";

const SearchZone = (props) => {
  const [searchInput, setSearchInput] = useState("");

  const friendState = useSelector((state) => state.friendsReducer);

  const dispatch = useDispatch();

  const onKeyPressHandler = () => {
    dispatch(actions.search(searchInput));
  };

  const user = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const addFriendHandler = (requestTo) => {
    dispatch(actions.addFriend(requestTo, token));

    props.io.emit("sendFriendRequest", { user });
  };

  let output;

  if (friendState.searchResult.length > 0 && searchInput.trim() !== "") {
    output = friendState.searchResult.map((user) => {
      return (
        <FriendResult
          username={user.username}
          addFriend={() => addFriendHandler(user.username)}
          key={user._id}
        />
      );
    });
  } else if (
    friendState.searchResult.length === 0 &&
    searchInput.trim() !== ""
  ) {
    output = <h2>Nothing found...</h2>;
  }

  return (
    <div className={classes.SearchZone}>
      <div className={classes.SearchInput}>
        <input
          type="text"
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={onKeyPressHandler}
          value={searchInput}
          placeholder="Search..."
        />
      </div>
      {output}
    </div>
  );
};

export default SearchZone;
