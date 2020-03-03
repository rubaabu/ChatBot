import React from "react";
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import { Users } from "./components/Users";
import "./App.css";
import Input from "./components/Input";
import MessagesList from "./components/MessagesList";
import RoomList from "./components/RoomList";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      roomList: [],
      active: [],
      test: ""
    };
  }

  // Testing
  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator: "v1:us1:06a94345-0931-4974-be5f-3b93c8603d63",
      userId: "ruba",
      tokenProvider: new TokenProvider({
        url:
          "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/06a94345-0931-4974-be5f-3b93c8603d63/token"
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        // the first room of the user that he is in
        const currentRoom = currentUser.rooms[0];
        console.log(currentUser);
        // calling the func that it is down
        this.subscribeToRoom(currentUser, currentRoom);
        // currentUser is me
        // currentRoom is the room that i am in

        // setting the states to the new data
        this.setState({
          currentUser,
          currentRoom,
          roomList: currentUser.rooms, // roomList: the rooms of the user
          active: currentUser.presenceStore // users on/offline
        });
        console.log(String(this.state.active.gojart));
      })
      .catch(error => console.log(error));
  }

  // func (to call it later or earliar !!!) that it takes 2 param the user (me) and the currentRoom that im seeing the messages from it

  subscribeToRoom = (currentUser, room) => {
    const messages = []; // to clear the messages from the prev room, cz this will be callback func
    currentUser.subscribeToRoom({
      roomId: room.id,
      messageLimit: 100,
      hooks: {
        onMessage: message => {
          messages.push(message);
          this.setState({
            messages,
            // to send the message to the current room that i'm typing in (to not have a bug -_-)
            currentRoom: room
          });
        }
      }
    });
  };

  // method with one param to send the messages to the server
  handleSendState = msg => {
    this.state.currentUser
      .sendSimpleMessage({ roomId: this.state.currentRoom.id, text: msg })
      .catch(err => {
        console.log(
          `Error adding message to ${this.state.currentRoom.name}: ${err}`
        );
      });
  };

  createRoom = async data => {
    const currentUser = this.state.currentUser;
    await currentUser
      .createRoom({
        id: "", // it will have automat id
        name: data.name,
        private: false,
        addUserIds: ["ruba", "gojart"],
        customData: { foo: 42 }
      })
      .then(() => {
        // alert(`Created room called ${data.name}`);
      })
      .catch(err => {
        console.log(`Error creating room ${err}`);
      });
    this.setState({ roomList: currentUser.rooms });
  };

  deleteRoom = async room => {
    const currentUser = this.state.currentUser;
    await currentUser
      .deleteRoom({ roomId: room })
      .then(() => {
        // alert(`Deleted room with ID: ${room}`);
      })
      .catch(err => {
        console.log(`Error deleted room ${room}: ${err}`);
      });
    this.setState({ roomList: currentUser.rooms });
  };

  render() {
    return (
      <div className="App">
        <RoomList
          rooms={this.state.roomList} // rooms list of the user
          click={this.subscribeToRoom} // callback func
          user={this.state.currentUser} // me
          createRoom={this.createRoom}
          deleteRoom={this.deleteRoom}
        />
        <div className="middle">
          <MessagesList
            messages={this.state.messages} // messages
            currentUser={this.state.currentUser} // me
            currentRoom={this.state.currentRoom} // the room that i'm in
          />
          <Input
            onSubmit={this.handleSendState} // callback func to send the mesgs to server
            currentRoom={this.state.currentRoom} // the room that i'm in
          />
        </div>

        <Users
          user={this.state.currentUser}
          active={this.state.active} // prasenceStore of the users (from => currentUser)
          currentRoom={this.state.currentRoom} // the room that i'm in
        />
      </div>
    );
  }
}
export default App;
