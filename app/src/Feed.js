import React, { useState } from "react";
import "./Feed.css";
import Post from "./Post";
import TweetBox from "./TweetBox";
// import db from "./firebase";

function Feed() {
  const [posts] = useState([]);

  // WALLET CONNECTION HERE

  // useEffect(() => {
  //   db.collection("posts").onSnapshot((snapshot) => {
  //     setPosts(snapshot.docs.map((doc) => doc.data()));
  //   });
  // }, []);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <TweetBox />
      {posts.map((post) => (
        <Post
          displayName={post.displayName}
          username={post.username}
          text={post.text}
          image={post.image}
        />
      ))}
    </div>
  );
}

export default Feed;
