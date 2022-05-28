// import React, { useState } from "react";
// import "./Feed.css";
// import Post from "./Post";
// import TweetBox from "./TweetBox";
// // import db from "./firebase";

// function Feed() {
//   const [posts] = useState([]);

//   // WALLET CONNECTION HERE

//   // useEffect(() => {
//   //   db.collection("posts").onSnapshot((snapshot) => {
//   //     setPosts(snapshot.docs.map((doc) => doc.data()));
//   //   });
//   // }, []);

//   return (
//     <div className="feed">
//       <div className="feed__header">
//         <h2>Home</h2>
//       </div>
//       <TweetBox />
//       {posts.map((post) => (
//         <Post
//           displayName={post.displayName}
//           username={post.username}
//           text={post.text}
//           image={post.image}
//         />
//       ))}
//     </div>
//   );
// }

// export default Feed;

import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import { TwitterContractAddress } from "./config.js";
import { ethers } from "ethers";
import Twitter from "./utils/TweetFactory.json";

function Feed({ personal }) {
  const [posts, setPosts] = useState([]);

  const getUpdatedTweets = (allTweets, address) => {
    let updatedTweets = [];
    // Here we set a personal flag around the tweets
    for (let i = 0; i < allTweets.length; i++) {
      if (allTweets[i].username.toLowerCase() === address.toLowerCase()) {
        let tweet = {
          id: allTweets[i].id,
          tweetText: allTweets[i].tweetText,
          isDeleted: allTweets[i].isDeleted,
          username: allTweets[i].username,
          personal: true,
        };
        updatedTweets.push(tweet);
      } else {
        let tweet = {
          id: allTweets[i].id,
          tweetText: allTweets[i].tweetText,
          isDeleted: allTweets[i].isDeleted,
          username: allTweets[i].username,
          personal: false,
        };
        updatedTweets.push(tweet);
      }
    }
    return updatedTweets;
  };

  const getAllTweets = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        );

        let allTweets = await TwitterContract.getAllTweets();
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTweets();
  }, []);

  const deleteTweet = (key) => async () => {
    console.log(key);

    // Now we got the key, let's delete our tweet
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        );

        let deleteTweetTx = await TwitterContract.deleteTweet(key, true);
        let allTweets = await TwitterContract.getAllTweets();
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox />

      {posts.map((post) => (
        <Post
          key={post.id}
          displayName={post.username}
          text={post.tweetText}
          personal={post.personal}
          onClick={deleteTweet(post.id)}
        />
      ))}
    </div>
  );
}

export default Feed;
