import React from "react";
import '../css/ConversationStyle.css';
import '../css/ThankYouPage.css';
import $ from 'jquery';
//import firebase from "../firebase.js"

class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.AppendUserConvo = this.AppendUserConvo.bind(this);
		this.ThankUser = this.ThankUser.bind(this);
    }

    nextPath(path) {
        this.props.history.push(path);
    }

	ThankUser() {
		document.getElementById("ContainerBox").style.display = "none";
		document.getElementById("Buttons").style.display = "none";
		document.getElementById("Welcome").style.display = "none";
		document.getElementById("thankyou").style.display = "block";
	}

    AppendUserConvo() {
        const UserComment = document.getElementById("ConvoUserInput").value;
		//The next 2 comment blocks are the POST request to the firebase server
		//When performing testing, please keep the POST request commented out
		//and only use the dummy response, otherwise it will bloat the server 
		//with a bunch of useless documents
		
		/*const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({"text":UserComment,"userId":"User1"});

		const requestOptions = {
		  method: 'POST',
		  headers: myHeaders,
		  body: raw,
		  redirect: 'follow'
		};
		*/
		document.getElementById("ConvoHistory").innerHTML += '<p id="UserComment">'+UserComment+'</p>';
		/*fetch("https://us-central1-cs-4800-backend-server.cloudfunctions.net/api/message", requestOptions)
		  .then(response => response.text())
		  .then(result => document.getElementById("ConvoHistory").innerHTML += '<p id="TherabotComment">'+JSON.parse(result).message+'</p>')
		  .catch(error => console.log('error', error));
		*/
		  
		//DUMMY RESPONSE | ONLY USE FOR TESTING
		document.getElementById("ConvoHistory").innerHTML += '<p id="TherabotComment">Flarp Flerp Florp</p>';
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
            onClick={this.ThankUser}
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
		<div id = "thankyou" style={{display: "none"}}>
			<p>Thank you for using Therabot!</p>
		</div>
      </div>
    );
  }
}

export default Conversation;
