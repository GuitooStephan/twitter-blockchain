import { Button } from "@material-ui/core";
import React, { useState } from "react";
// import db from "./firebase";
import "./TweetBox.css";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");

  // WALLET CONNECTION HERE
  // const sendTweet = (e) => {
  //   e.preventDefault();

  //   db.collection("posts").add({
  //     username: "# walletaddress",
  //     displayName: "# walletaddress",
  //     text: tweetMessage,
  //   });

  //   setTweetMessage("");
  // };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <input
            value={tweetMessage}
            onChange={(e) => setTweetMessage(e.target.value)}
            placeholder="What's happening?"
            type="text"
          />
        </div>
        <Button
          onClick="# WALLET REQUEST"
          type="submit"
          className="tweetBox__button"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
