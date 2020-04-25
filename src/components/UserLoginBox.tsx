import React from "react";
import { useHistory } from "react-router-dom";
import "../css/IndexStyle.css";

export default function UserLoginBox() {
    let history = useHistory();
    function nextPath(path: any) {
        history.push(path);
    }

    function CheckSignIn() {
        const LoginUserName = (document.getElementById(
            "LoginUserName"
        )! as HTMLInputElement).value;
        const LoginPin = (document.getElementById(
            "LoginPIN"
        )! as HTMLInputElement).value;
        if (LoginUserName === "" || LoginPin === "") {
            document.getElementById("SignInNotSuccess")!.style.display =
                "block";
        } else {
            document.getElementById("SignInNotSuccess")!.style.display = "none";
            nextPath("/talk");
        }
    }

    return (
        <div>
            <h1>Welcome to Therabot</h1>
            <div id="MainBox">
                <div id="MainBoxBanner">
                    <div id="MainTextBox">User Login</div>
                </div>
                <input type="text" id="LoginUserName" placeholder="Username" />
                <input type="text" id="LoginPIN" placeholder="Enter your PIN" />
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
                    Cannot sign in. Please make sure all fields are filled out.
                </div>
            </div>
        </div>
    );
}
