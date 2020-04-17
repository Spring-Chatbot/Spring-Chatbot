import React from "react";
import '../css/RegisterPageStyle.css';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.ChkSuccessReg = this.ChkSuccessReg.bind(this);
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    ChkSuccessReg() {
        const FirstName = document.getElementById("FirstName").value;
        const UseName = document.getElementById("UseName").value;
        const EmailAdd = document.getElementById("EmailAdd").value;
        const pin = document.getElementById("pin").value;
        if (FirstName === "" || UseName === "" || EmailAdd === "" || pin === "") {
            document.getElementById("success").style.display = "none";
            document.getElementById("notsuccess").style.display = "block";
        } else {
            document.getElementById("success").style.display = "block";
            document.getElementById("BackToLogin").style.display = "block";
            document.getElementById("notsuccess").style.display = "none";
            document.getElementById("FirstName").style.display = "none";
            document.getElementById("UseName").style.display = "none";
            document.getElementById("EmailAdd").style.display = "none";
            document.getElementById("pin").style.display = "none";
            document.getElementById("DoneButton").style.display = "none";
        }
    }

  render() {
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
            <input type="text" id="EmailAdd" placeholder="E-mail address" />
            <input type="text" id="pin" placeholder="Please enter a custom PIN"/>
          </div>
          <button id="DoneButton" type="button" onClick={this.ChkSuccessReg}>
            Done
          </button>
          <div id="success" style={{display: "none"}}>
            Success! Please check your e-mail for your username and PIN.
          </div>
          <div id="notsuccess"style={{display: "none"}}>
            Registration was not successful. Please make sure all fields are filled out.
          </div>
                <button id="BackToLogin" type="button" onClick={() => this.nextPath('/')}
            style={{display: "none"}}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
