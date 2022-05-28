import React from "react";
import "./App.css";
import Feed from "./Feed";
import TwitterIcon from "@material-ui/icons/Twitter";

function App() {
  return (
    <div className="app">
      <TwitterIcon className="sidebar__twitterIcon" />
      <Feed />
    </div>
  );
}

export default App;
