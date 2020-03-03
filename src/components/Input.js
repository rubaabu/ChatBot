import React from "react";
import "./style.css";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { Smile } from "react-feather";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngry } from "@fortawesome/free-solid-svg-icons";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMsg: "",
      showEmojiPicker: false
    };
  }

  handleInputValue = e => {
    const inputMsg = e.target.value;
    this.setState({ inputMsg: inputMsg });
  };

  toggleEmojiPicker = () => {
    this.setState({
      showEmojiPicker: !this.state.showEmojiPicker
    });
  };

  addEmoji = e => {
    const { inputMsg } = this.state;
    // console.log("native", e.native);
    const text = `${inputMsg}${e.native}`;
    this.setState({
      inputMsg: text,
      showEmojiPicker: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.inputMsg === "") {
      // do nothing
    } else {
      this.props.onSubmit(this.state.inputMsg);
    }

    this.setState({ inputMsg: "" });
  };
  //Louis if u are here please help me with the layout of the emojies box  -_-"
  render() {
    return (
      <div className="Input1">
        <form onSubmit={this.handleSubmit} className="input-group mb-3 frm">
          {this.state.showEmojiPicker ? (
            <Picker
              set="emojione"
              onSelect={this.addEmoji}
              className="picker"
            />
          ) : null}
          <button
            type="button"
            className="toggle"
            onClick={this.toggleEmojiPicker}
          >
            <FontAwesomeIcon icon={faAngry} />
          </button>

          <input
            className="input"
            type="text"
            value={this.state.inputMsg}
            onChange={this.handleInputValue}
            placeholder="Your Message...."
          />

          <button className="btn btn-outline send" type="submit">
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default Input;
