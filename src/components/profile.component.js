import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            Hey, <strong>{currentUser.username}</strong>!
          </h3>
          <h5>This is your profile page</h5>
        </header>
        {/*<p>*/}
        {/*  <strong>Token:</strong>{" "}*/}
        {/*  {currentUser.accessToken.substring(0, 20)} ...{" "}*/}
        {/*  {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}*/}
        {/*</p>*/}
        <p>
          <strong>Your ID:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Your Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Your role:</strong>{" "}
        {/*<ul>*/}
        {/*  {currentUser.roles &&*/}
        {/*    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}*/}
        {/*</ul>*/}
        {currentUser.roles}
      </div>: null}
      </div>
    );
  }
}
