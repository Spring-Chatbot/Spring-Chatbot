import React from "react";
import { useHistory } from "react-router-dom";
import "../css/RegisterPageStyle.css";
import firebase from "../firebase";

export default function Register() {
    let history = useHistory();
    function nextPath(path: any) {
        history.push(path);
    }

    function checkSuccessReg() {
        const getValue = (id: string) =>
            (document.getElementById(id)! as HTMLInputElement).value;

        const email = getValue("Email");
        const pass = getValue("Password");

        if (email === "" || pass === "") {
            document.getElementById("success")!.style.display = "none";
            document.getElementById("notsuccess")!.innerHTML =
                "Registration was not successful. Please make sure all fields are filled out.";
            document.getElementById("notsuccess")!.style.display = "block";
        } else {
            // Create user
            const auth = firebase.auth();
            const promise = auth.createUserWithEmailAndPassword(email, pass);
            promise
                .then(result => {
                    document.getElementById("success")!.style.display = "block";
                    document.getElementById("BackToLogin")!.style.display =
                        "block";
                    document.getElementById("notsuccess")!.style.display =
                        "none";
                    document.getElementById("DoneButton")!.style.display =
                        "none";
                })
                .catch(e => {
                    document.getElementById("success")!.style.display = "none";
                    document.getElementById("notsuccess")!.innerHTML =
                        e.message;
                    document.getElementById("notsuccess")!.style.display =
                        "block";
                });
        }
    }

    return (
        <div>
            <h1>Welcome to Therabot</h1>
            <div id="MainBox">
                <div id="MainBoxBanner">
                    <div id="MainTextBox">Register</div>
                </div>
                <input
                    type="text"
                    id="Email"
                    placeholder="Enter an email address"
                />
                <input
                    type="text"
                    id="Password"
                    placeholder="Enter a password"
                />
                <div id="buttonElement">
                    <button
                        id="DoneButton"
                        type="button"
                        onClick={checkSuccessReg}
                    >
                        Done
                    </button>
                </div>
                <div id="success" style={{ display: "none" }}>
                    Success! You are now registered to use Therabot!
                </div>
                <div id="notsuccess" style={{ display: "none" }}></div>
                <button
                    id="BackToLogin"
                    type="button"
                    onClick={() => nextPath("/")}
                    style={{ display: "none" }}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
