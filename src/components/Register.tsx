import React from "react";
import { useHistory } from "react-router-dom";
import "../css/RegisterPageStyle.css";

export default function Register() {
    let history = useHistory();
    function nextPath(path: any) {
        history.push(path);
    }

    function checkSuccessReg() {
        const getValue = (id: string) =>
            (document.getElementById(id)! as HTMLInputElement).value;

        const FirstName = getValue("FirstName");
        const UseName = getValue("UseName");
        const EmailAdd = getValue("EmailAdd");
        const Pin = getValue("Pin");

        if (
            FirstName === "" ||
            UseName === "" ||
            EmailAdd === "" ||
            Pin === ""
        ) {
            document.getElementById("success")!.style.display = "none";
            document.getElementById("notsuccess")!.style.display = "block";
        } else {
            document.getElementById("success")!.style.display = "block";
            document.getElementById("BackToLogin")!.style.display = "block";
            document.getElementById("notsuccess")!.style.display = "none";
            document.getElementById("FirstName")!.style.display = "none";
            document.getElementById("UseName")!.style.display = "none";
            document.getElementById("EmailAdd")!.style.display = "none";
            document.getElementById("Pin")!.style.display = "none";
            document.getElementById("DoneButton")!.style.display = "none";
        }
    }

    return (
        <div>
            <h1>Welcome to Therabot</h1>
            <div id="MainBox">
                <div id="MainBoxBanner">
                    <div id="MainTextBox">Register</div>
                </div>
                <input type="text" id="FirstName" placeholder="First name" />
                <div id="TextMargin">
                    <input type="text" id="UseName" placeholder="Username" />
                    <input
                        type="text"
                        id="EmailAdd"
                        placeholder="E-mail address"
                    />
                    <input
                        type="text"
                        id="Pin"
                        placeholder="Please enter a custom PIN"
                    />
                </div>
                <button id="DoneButton" type="button" onClick={checkSuccessReg}>
                    Done
                </button>
                <div id="success" style={{ display: "none" }}>
                    Success! Please check your e-mail for your username and PIN.
                </div>
                <div id="notsuccess" style={{ display: "none" }}>
                    Registration was not successful. Please make sure all fields
                    are filled out.
                </div>
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
