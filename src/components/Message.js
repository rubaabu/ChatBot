import React from "react";
import "./style.css";

export const Message = ({ message, currentUser }) => {
  // console.log(Date());
  //take the date and convert it  to see thte hour
  let time = new Date(message.createdAt).toLocaleDateString();

  let today = new Date().toLocaleDateString();
  // to get yestarday
  //____86400000 => 24 * 60 * 60 * 1000
  let yestarday = new Date(Date.now() - 86400000).toLocaleDateString();
  // yestarday = yestarday.setDate(yestarday.getDate() - 1);

  if (time == yestarday) {
    time = "Yestarday " + new Date(message.createdAt).toLocaleTimeString();
  } else if (time == today) {
    time = "Today " + new Date(message.createdAt).toLocaleTimeString();
  }

  return (
    <div className="message">
      <strong>
        {message.sender.name === currentUser.id ? "You" : message.sender.name}
      </strong>
      <p>{message.text}</p>
      <small className="date">{time}</small>
    </div>
  );
};
