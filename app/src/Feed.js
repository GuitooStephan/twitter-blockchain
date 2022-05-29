import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import { TwitterContractAddress } from "./utils/config.js";
import { ethers } from "ethers";
import Twitter from "./utils/TweetFactory.json";

function Feed({ personal }) {
  const [posts, setPosts] = useState([]);

  // const getUpdatedTweets = (allTweets, address) => {
  //   let updatedTweets = [];
  //   // Here we set a personal flag around the tweets
  //   // for(let i=0; i<allTweets.length; i++) {
  //   for (let i = allTweets.length - 1; i >= 0; i--) {
  //     if (allTweets[i].username.toLowerCase() === address.toLowerCase()) {
  //       let tweet = {
  //         id: allTweets[i].id,
  //         tweetText: allTweets[i].tweetText,
  //         // isDeleted: allTweets[i].isDeleted,
  //         username: allTweets[i].username,
  //         // personal: true,
  //       };
  //       updatedTweets.push(tweet);
  //     } else {
  //       let tweet = {
  //         id: allTweets[i].id,
  //         tweetText: allTweets[i].tweetText,
  //         // isDeleted: allTweets[i].isDeleted,
  //         username: allTweets[i].username,
  //         // personal: false,
  //       };
  //       updatedTweets.push(tweet);
  //     }
  //   }
  //   return updatedTweets;
  // };

  // const getTweets = async () => {
  //   try {
  //     const { ethereum } = window;

  //     if (ethereum) {
  //       const provider = new ethers.providers.Web3Provider(ethereum);
  //       const signer = provider.getSigner();
  //       const TwitterContract = new ethers.Contract(
  //         TwitterContractAddress,
  //         Twitter.abi,
  //         signer
  //       );

  //       let allTweets = await TwitterContract.getTweets();
  //       setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
  //     } else {
  //       console.log("Ethereum object doesn't exist");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getTweets();
  // }, []);

  const getTweets = async () => {
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

        let allTweets = await TwitterContract.getTweets();
        let updatedTweets = [];
        // Here we set a personal flag around the tweets
        for (let i = allTweets.length - 1; i >= 0; i--) {
          if (
            allTweets[i].owner.toLowerCase() ===
            ethereum.selectedAddress.toLowerCase()
          ) {
            let tweet = {
              id: allTweets[i].tweetID,
              tweetText: allTweets[i].tweet,
              username: allTweets[i].owner,
              date: allTweets[i].publishedTime,
            };
            updatedTweets.push(tweet);
          } else {
            let tweet = {
              id: allTweets[i].tweetID,
              tweetText: allTweets[i].tweet,
              username: allTweets[i].owner,
              date: allTweets[i].publishedTime,
            };
            updatedTweets.push(tweet);
          }
        }
        setPosts(updatedTweets);
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
          Twitter.abi,
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

  const deleteTweet = async (id) => {
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

        let tx = await TwitterContract.deleteTweet(id);
        console.log(tx);
        getTweets();
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
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          tweetText={post.tweetText}
          username={post.username}
          deleteTweet={deleteTweet}
          personal={personal}
        />
      ))}
    </div>
  );
}

export default Feed;

//   const deleteTweet = (key) => async () => {
//     console.log(key);

//     // Now we got the key, let's delete our tweet
//     try {
//       const { ethereum } = window;

//       if (ethereum) {
//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();
//         const TwitterContract = new ethers.Contract(
//           TwitterContractAddress,
//           Twitter.abi,
//           signer
//         );

//         let deleteTweetTx = await TwitterContract.deleteTweet(key, true);
//         let allTweets = await TwitterContract.getTweets();
//         setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
//       } else {
//         console.log("Ethereum object doesn't exist");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="feed">
//       <div className="feed__header">
//         <h2>Home</h2>
//       </div>

//       <TweetBox />

//       <FlipMove>
//         {posts.map((post) => (
//           <Post
//             key={post.id}
//             displayName={post.username}
//             text={post.tweetText}
//             personal={post.personal}
//             onClick={deleteTweet(post.id)}
//           />
//         ))}
//       </FlipMove>
//     </div>
//   );
// }

// export default Feed;
