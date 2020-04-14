import React from "react";
import '../css/ConversationStyle.css';
import $ from 'jquery';

window.$ = $;

class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.AppendUserConvo = this.AppendUserConvo.bind(this);
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    AppendUserConvo() {
        var UserComment = document.getElementById("ConvoUserInput").value;
        document.getElementById("ConvoHistory").innerHTML += '<p id="UserComment">' + UserComment + '</p>';
        document.getElementById("ConvoHistory").innerHTML += '<p id="TherabotComment">' + "FLARP FLERP FLORP" + '</p>';
        $('#ConvoHistory').scrollTop($('#ConvoHistory')[0].scrollHeight);
        $('#ConvoUserInput').val('');
    }

  render() {
    return (
      <div>
		<h1>Welcome to Therabot</h1>
        <div id="ContainerBox">
          <textarea
            id="ConvoUserInput"
            type="text"
            placeholder="What's on your mind?"
            defaultValue={""}
          />
          <div id="ConvoHistory" />
        </div>
        <div id="Buttons">
          <button
            id="LeaveRoom"
            type="button"
            onClick={() => this.nextPath('/thankyou')}
          >
            Leave Chatroom
          </button>
          <button
            id="UserSubmitConvo"
            type="button"
            onClick={this.AppendUserConvo}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default Conversation;
