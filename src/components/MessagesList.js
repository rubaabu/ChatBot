import React from "react";
import { Message } from "./Message";
import "./style.css";
import ScrollToBottom from "react-scroll-to-bottom";

const MessagesList = props => {
  const { messages, currentUser, currentRoom } = props;
  // console.log("room", currentRoom);

  return (
    <div className="msg-List">
      <h1 className="room-name">{currentRoom.name}</h1>

      <ScrollToBottom>
        <div className="msgList">
          {messages.length > 0 &&
            messages.map((message, index) => {
              return (
                <Message
                  message={message}
                  index={index}
                  currentUser={currentUser}
                />
              );
            })}
        </div>
      </ScrollToBottom>
    </div>
  );
};

export default MessagesList;
