import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import Table from 'react-bootstrap/Table';


export default class BoardPackers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    UserService.getPackers().then(
      response => {
        this.setState({
          users: response.data
        });
      },
      error => {
        this.setState({
          users: []
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header>
          <h3>Packers</h3>
        </header>
        <Table striped bordered hover>
          <thead>
             <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
          </thead>
          <tbody>
             {this.state.users.map((item, index) => (
                <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.roles[0].name.replace('ROLE_', '')}</td>
                 </tr>
            ))}
          </tbody>
        </Table>

      </div>
    );
  }
}
