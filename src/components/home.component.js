import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
/*
    UserService.getAll().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
*/
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>"Fulfillment Center" Demo Full Stack Application with Spring Boot RESTful API</h3>
          <p>This could be a great foundation for a future custom CRM product.</p>
        </header>
      </div>
    );
  }
}
