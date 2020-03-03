import "./style.css";
import React from "react";
import "status-indicator/styles.css";

export const Users = props => {
  const { user, active, currentRoom } = props;

  return (
    <div className="Users">
      <h3 className="title-users">Participants</h3>
      {/* the users that they are in the room */}
      {currentRoom.userIds &&
        currentRoom.userIds.map((user, index) => (^

          <div>
            {/* the state ot the current user */}
            {/* hasOwnProperty is true or false */}
            <div key={index} className="users">
              {active.hasOwnProperty(user) ? (
                <status-indicator positive></status-indicator> /* online */
              ) : (
                <status-indicator></status-indicator> /* offline */
              )}
              <span className="online">{user}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

// export const Users = props => {
//   const { user } = props;
//   console.log(user.users);
//   let mapUsers;
//   if (user.users === undefined) {
//     mapUsers = "Loading Users..";
//   } else {
//     mapUsers = user.users.map(u => (
//       <div>
//         <div className="online">
//           {u.name}
//           <div className="users">
//             {u.presence.state === "online" ? (
//               <status-indicator positive></status-indicator>
//             ) : (
//               <status-indicator></status-indicator>
//             )}
//           </div>
//         </div>
//       </div>
//     ));
//   }

//   return <div className="Users">{mapUsers}</div>;
// };
