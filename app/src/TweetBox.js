// import { Button } from "@material-ui/core";
// import React, { useState } from "react";
// // import db from "./firebase";
// import "./TweetBox.css";

// function TweetBox() {
//   const [tweetMessage, setTweetMessage] = useState("");

//   // WALLET CONNECTION HERE
//   // const sendTweet = (e) => {
//   //   e.preventDefault();

//   //   db.collection("posts").add({
//   //     username: "# walletaddress",
//   //     displayName: "# walletaddress",
//   //     text: tweetMessage,
//   //   });

//   //   setTweetMessage("");
//   // };

//   return (
//     <div className="tweetBox">
//       <form>
//         <div className="tweetBox__input">
//           <input
//             value={tweetMessage}
//             onChange={(e) => setTweetMessage(e.target.value)}
//             placeholder="What's happening?"
//             type="text"
//           />
//         </div>
//         <Button
//           onClick="# WALLET REQUEST"
//           type="submit"
//           className="tweetBox__button"
//         >
//           Tweet
//         </Button>
//       </form>
//     </div>
//   );
// }

// export default TweetBox;

import React, { useState } from "react";
import "./TweetBox.css";
import { Button } from "@material-ui/core";
import { TwitterContractAddress } from "./config.js";
import { ethers } from "ethers";
import Twitter from "./utils/TweetFactory.json";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");

  const addTweet = async () => {
    let tweet = {
      tweetText: tweetMessage,
      isDeleted: false,
    };

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

        let twitterTx = await TwitterContract.addTweet(
          tweet.tweetText,
          tweet.isDeleted
        );

        console.log(twitterTx);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("Error submitting new Tweet", error);
    }
  };

  const sendTweet = (e) => {
    e.preventDefault();

    addTweet();

    setTweetMessage("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
        </div>

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
