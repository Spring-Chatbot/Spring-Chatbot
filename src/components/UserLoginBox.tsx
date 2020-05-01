import React from "react";
import { useHistory } from "react-router-dom";
import "../css/IndexStyle.css";
import firebase from '../firebase';

export default function UserLoginBox() {

    let history = useHistory();
    function nextPath(path: any) {
        history.push(path);
    }
	
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser) {
			console.log(firebaseUser);
			// TODO: method to not allow random ppl to type to bot
			// without signing in first
		} else {
			console.log('No user signed in currently');
		}
	});

    function CheckSignIn() {
		const getValue = (id: string) =>
            (document.getElementById(id)! as HTMLInputElement).value;
		const email = getValue("email");
		const pass = getValue("password");
		
        if (email === "" || pass === "") {
			document.getElementById("SignInNotSuccess")!.innerHTML = 
				"Cannot sign in. Please make sure all fields are filled out.";
            document.getElementById("SignInNotSuccess")!.style.display =
                "block";
        } else {
			// Sign In
			const promise = firebase.auth().signInWithEmailAndPassword(email,pass);
			
			promise.then(result => {
				document.getElementById("SignInNotSuccess")!.style.display = 
					"none";
				nextPath("/talk");
			}).catch(e => {
				document.getElementById("SignInNotSuccess")!.innerHTML = 
					e.message;
				document.getElementById("SignInNotSuccess")!.style.display =
					"block";
			});
        }
    }

    return (
        <div>
            <h1>Welcome to Therabot</h1>
            <div id="MainBox">
                <div id="MainBoxBanner">
                    <div id="MainTextBox">User Login</div>
                </div>
                <input type="text" id="email" placeholder="Enter Email Address" />
                <input type="text" id="password" placeholder="Enter Password" />
                <div id="UserLoginButtons">
                <button
                    className="RegisterButton"
                    type="button"
                    onClick={() => nextPath("/register")}
                >
                    Click here to register
                </button>
                <button
                    className="SignInButton"
                    type="submit"
                    onClick={CheckSignIn}
                >
                    Sign in
                </button>
                </div>
                <div id="SignInNotSuccess" style={{ display: "none" }}>
                    
                </div>
            </div>
        </div>
    );
}
