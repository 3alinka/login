import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <div className="Login">
        <form method="POST" action="http://localhost:8080/login">
          email: <input name="email" />
          <br />
          password: <input name="password" />
          <br />
          <button type="submit">login</button>
        </form>
      </div>
    );
  }
}
