import React from "react";
// import { useHistory } from "react-router-dom";
import "../css/ConversationStyle.css";
import "../css/ThankYouPage.css";
import $ from "jquery";
//import firebase from "../firebase.js"

export default function Conversation() {

    /* Unused (uncomment when needed)
    let history = useHistory();
    function nextPath(path: any) {
        history.push(path);
    }
    */

    function thankUser() {
            document.getElementById("ContainerBox")!.style.display = "none";
            document.getElementById("Buttons")!.style.display = "none";
            if (document.getElementById("Welcome") !== null)
                document.getElementById("Welcome")!.style.display = "none";
            document.getElementById("thankyou")!.style.display = "block";
    }

    function appendUserConvo() {
        const userComment = (document.getElementById(
            "ConvoUserInput"
        )! as HTMLTextAreaElement).value;
        //The next 2 comment blocks are the POST request to the firebase server
        //When performing testing, please keep the POST request commented out
        //and only use the dummy response, otherwise it will bloat the server
        //with a bunch of useless documents

        /*const myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		const raw = JSON.stringify({"text":userComment,"userId":"User1"});

		const requestOptions = {
		  method: 'POST',
		  headers: myHeaders,
		  body: raw,
		  redirect: 'follow'
		};
		*/
        document.getElementById("ConvoHistory")!.innerHTML +=
            "<p id='UserComment'>" + userComment + "</p>";
        /*fetch("https://us-central1-cs-4800-backend-server.cloudfunctions.net/api/message", requestOptions)
		  .then(response => response.text())
		  .then(result => document.getElementById("ConvoHistory").innerHTML += '<p id="TherabotComment">'+JSON.parse(result).message+'</p>')
		  .catch(error => console.log('error', error));
		*/

        //DUMMY RESPONSE | ONLY USE FOR TESTING
        document.getElementById("ConvoHistory")!.innerHTML +=
            "<p id='TherabotComment'>Flarp Flerp Florp</p>";
        $("#ConvoHistory").scrollTop($("#ConvoHistory")[0].scrollHeight);
        $("#ConvoUserInput").val("");
    }

    return (
        <div>
            <h1 id="Welcome">Welcome to Therabot</h1>
            <div id="ContainerBox">
                <textarea
                    id="ConvoUserInput"
                    placeholder="What's on your mind?"
                    defaultValue={""}
                />
                <div id="ConvoHistory" />
            <div id="Buttons">
                <button id="LeaveRoom" type="button" onClick={thankUser}>
                    Leave Chatroom
                </button>
                <button
                    id="UserSubmitConvo"
                    type="button"
                    onClick={appendUserConvo}
                >
                    Submit
                </button>
            </div>
	</div>
            <div id="thankyou" style={{ display: "none" }}>
                <p>Thank you for using Therabot!</p>
            </div>
        </div>
    );
}
