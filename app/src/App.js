// import React, { useState, useEffect } from "react";
// import "./App.css";
// import Feed from "./Feed";
// import TwitterIcon from "@material-ui/icons/Twitter";
// import Web3 from "web3";

// function App() {
//   const [account, setAccount] = useState(); // state variable to set account.

//   useEffect(() => {
//     async function load() {
//       const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
//       const accounts = await web3.eth.requestAccounts();

//       setAccount(accounts[0]);
//     }

//     load();
//   }, []);

//   return (
//     <div className="app">
//       <TwitterIcon className="sidebar__twitterIcon" />
//       <Feed />
//     </div>
//   );
// }

// export default App;

import React from "react";
// import Sidebar from "./Sidebar";
import Feed from "./Feed";
// import Widgets from "./Widgets";
import "./App.css";
import { useState, useEffect } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(false);

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain:" + chainId);

      const ropstenChainId = "0x3";

      if (chainId !== ropstenChainId) {
        alert("You are not connected to the ropsten Testnet!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Found account", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  // Checks if wallet is connected to the correct network
  const checkCorrectNetwork = async () => {
    const { ethereum } = window;
    let chainId = await ethereum.request({ method: "eth_chainId" });
    console.log("Connected to chain:" + chainId);

    const ropstenChainId = "0x3";

    if (chainId !== ropstenChainId) {
      setCorrectNetwork(false);
    } else {
      setCorrectNetwork(true);
    }
  };

  useEffect(() => {
    connectWallet();
    checkCorrectNetwork();
  });

  return (
    <div>
      {currentAccount === "" ? (
        <button
          className="text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      ) : correctNetwork ? (
        <div className="app">
          <TwitterIcon className="sidebar__twitterIcon" />
          <Feed />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3">
          <div>----------------------------------------</div>
          <div>Please connect to the ropsten Testnet</div>
          <div>and reload the page</div>
          <div>----------------------------------------</div>
        </div>
      )}
    </div>
  );
}

export default App;
