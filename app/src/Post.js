import React, { forwardRef } from "react";
import "./Post.css";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const Post = forwardRef(
  ({ displayName, text, personal, notDeleted, onClick }, ref) => {
    return (
      <div className="post" ref={ref}>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>{displayName} </h3>
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          <div className="post__footer">
            <ChatBubbleOutlineIcon fontSize="small" />
            <RepeatIcon fontSize="small" />
            <FavoriteBorderIcon fontSize="small" />
            <PublishIcon fontSize="small" />
            {personal ? <DeleteIcon fontSize="small" onClick={onClick} /> : ""}
            {personal ? <EditIcon fontSize="small" onClick={onClick} /> : ""}
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
