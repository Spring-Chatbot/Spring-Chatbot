import React from "react";
import "../css/ConversationStyle.css";
import $ from "jquery";
import {therabot} from "./therabot";
import firebase from '../firebase';

export default function Conversation() {
	let phase = 1;

    function thankUser() {
            document.getElementById("ContainerBox")!.style.display = "none";
            document.getElementById("Buttons")!.style.display = "none";
            document.getElementById("Welcome")!.style.display = "none";
            document.getElementById("thankyou")!.style.display = "block";
						firebase.auth().signOut();
						console.log("signout");
    }

    function appendUserConvo() {
        const userComment = (document.getElementById(
            "ConvoUserInput"
        )! as HTMLTextAreaElement).value;
				document.getElementById("ConvoHistory")!.innerHTML +=
					"<p id='UserComment'>" + userComment + "</p>";
				phase = therabot(userComment,phase);
		
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
                <button 
									id="LeaveRoom" 
									type="button" 
									onClick={thankUser}
								>
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
