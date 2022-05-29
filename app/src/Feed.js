import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import FlipMove from "react-flip-move";
import "./Feed.css";
import { TwitterContractAddress } from "./utils/config.js";
import { ethers } from "ethers";
import TweetFactory from "./utils/TweetFactory.json";

function Feed({ personal }) {
  // const [edit, setEdit] = useState(false);
  const [posts, setPosts] = useState([]);

  // const handleEdit = () => {
  //   if (!edit) {
  //     setEdit(true);
  //   } else {
  //     setEdit(false);
  //   }
  // };

  const getUpdatedTweets = (allTweets, address) => {
    let updatedTweets = [];
    for (let i = allTweets.length - 1; i >= 0; i--) {
      // don't show empty tweets and from 0x0000000000000000000000000000000000000000 account
      if (
        allTweets[i].tweet === "" ||
        allTweets[i].owner === "0x0000000000000000000000000000000000000000"
      ) {
        let tweet = {
          id: allTweets[i].tweetId,
          tweetText: "deleted Tweet",
          isDeleted: allTweets[i].isDeleted,
          username: allTweets[i].owner,
          notDeleted: false,
        };
        updatedTweets.push(tweet);
      }

      if (allTweets[i].owner.toLowerCase() === address.toLowerCase()) {
        let tweet = {
          id: allTweets[i].tweetId,
          tweetText: allTweets[i].tweet,
          isDeleted: allTweets[i].isDeleted,
          username: allTweets[i].owner,
          personal: true,
          notDeleted: true,
        };
        updatedTweets.push(tweet);
      } else {
        let tweet = {
          id: allTweets[i].tweetId,
          tweetText: allTweets[i].tweet,
          isDeleted: allTweets[i].isDeleted,
          username: allTweets[i].owner,
          personal: false,
          notDeleted: true,
        };
        updatedTweets.push(tweet);
      }
    }
    return updatedTweets;
  };

  const getTweets = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          TweetFactory.abi,
          signer
        );

        let allTweets = await TwitterContract.getTweets();
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTweets();
  }, []);

  const addTweet = async (tweetText) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          TweetFactory.abi,
          signer
        );

        let tx = await TwitterContract.addTweet(tweetText);
        console.log(tx);
        getTweets();
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTweet = (key) => async () => {
    console.log(key);

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          TweetFactory.abi,
          signer
        );

        await TwitterContract.deleteTweet(key);
        let allTweets = await TwitterContract.getTweets();
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editTweet = (key, tweetText) => async () => {
    console.log(key);

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          TweetFactory.abi,
          signer
        );

        await TwitterContract.updateTweet(key, tweetText);
        let allTweets = await TwitterContract.getTweets();
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
        <h2>Feed</h2>
      </div>
      <TweetBox addTweet={addTweet} />
      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.id}
            displayName={post.username}
            text={post.tweetText}
            personal={post.personal}
            notDeleted={post.notDeleted}
            onClick={deleteTweet(post.id)}
            // onClickEdit={editTweet(post.id)}
            // edit={edit}
            // onClickEditButton={handleEdit}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
