import React from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class RoomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  handleName = e => {
    const name = e.target.value;
    this.setState({ name });
  };

  sendData = e => {
    e.preventDefault();
    const data = {
      name: this.state.name
    };
    if (this.state.name == "") {
      //do nothing
    } else {
      this.props.createRoom(data);
      this.setState({ name: "" });
    }
  };

  render() {
    const { rooms, click, user, deleteRoom } = this.props;
    // console.log("user", rooms.id);
    return (
      <div className="roomList">
        <h1 className="userName">{user.name}</h1>
        <p className="title-rooms">Groups</p>
        {rooms.map((room, index) => (
          <div className="M-list">
            <div key={index} className="room" onClick={() => click(user, room)}>
              <div className="roomName">{room.name}</div>
              <button class="deleteBtn" onClick={() => deleteRoom(room.id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        ))}

        <form>
          <div className="createRoom">
            <button className="createBtn" onClick={this.sendData}>
              Create
            </button>

            <input
              className="createInp"
              placeholder=" Name"
              type="text"
              value={this.state.name}
              onChange={this.handleName}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default RoomList;
