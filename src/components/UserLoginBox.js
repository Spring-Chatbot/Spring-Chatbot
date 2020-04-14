import React from "react";
import '../css/IndexStyle.css';

class UserLoginBox extends React.Component {
  constructor(props) {
      super(props);
      this.ChkSignIn = this.ChkSignIn.bind(this);
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  ChkSignIn() {
      var LoginUseName = document.getElementById("LoginUseName").value;
      var Loginpin = document.getElementById("LoginPIN").value;
      if (LoginUseName === "" || Loginpin === "") {
        document.getElementById("SignInNotSuccess").style.display = "block";
      } else {
        document.getElementById("SignInNotSuccess").style.display = "none";
        this.nextPath('/talk');
      }
  }

    render() {
    return (
      <div>
        <h1>Welcome to Therabot</h1>
        <div id="MainBox">
          <div id="MainBoxBanner">
            <div id="MainTextBox">User Login</div>
          </div>
          <input type="text" id="LoginUseName" placeholder="Username" />
          <input type="text" id="LoginPIN" placeholder="Enter your PIN" />
          <button className="RegisterButton" type="button" onClick={() => this.nextPath('/register')}>
			Click here to register
          </button>
          <button className="SignInButton" type="submit" onClick={this.ChkSignIn}>
			Sign in
          </button>
          <div id="SignInNotSuccess" style={{display: "none"}}>
            Cannot sign in. Please make sure all fields are filled out.
          </div>
        </div>
      </div>
    );
  }
}

export default UserLoginBox;
