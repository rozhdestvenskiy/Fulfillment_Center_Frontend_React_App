import React, { Component } from "react";

import UserService from "../services/user.service";
import RoleService from "../services/role.service";

import EventBus from "../common/EventBus";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {FaRegEdit, FaRegTrashAlt} from "react-icons/fa";
import FormConfirmation from './forms/form-confirmation.component';
import FormUser from './forms/form-user.component'
import AuthService from "../services/auth.service";




export default class BoardEmployees extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
      roles: [],
      formShow: false, 
      delete_id: 0,
      confirmShow: false,
      data: null,
    };
    this.onClose = this.onClose.bind(this);
    this.onSave = this.onSave.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.onEdit   = this.onEdit.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }
  onClose(){
    this.setState({formShow: false, data: null})
  }
  updateItem(obj){
    UserService.updateItem(obj).then(
      response => {
         this.refreshData();
      },
      error => {
      }
    );                                            
  }

  onSave(formState){
    this.setState({formShow: false})
    
    let obj = {id: formState.id,
               username: formState.username,
               email: formState.email,
               roles: [formState.role]
              }

    return this.updateItem(obj);

  }
  onEdit(item){
    this.setState({formShow: true, data: item})
  }

  refreshData(){
    UserService.getAll().then(
      response => {
        this.setState({
          users: response.data,
        });
      },
      error => {
        this.setState({
          users: [],
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );                                            
  }
  refreshRolesData(){
    RoleService.getAll().then(
      response => {
        this.setState({
          roles: response.data,
        });
      },
      error => {
        this.setState({
          roles: [],
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );                                            
  }

  componentDidMount() {
     this.refreshData();
     this.refreshRolesData();
  }

  render() {
    return (
      <div className="container">
        <header>
          <h3>Employees</h3>
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
                    <td><FaRegEdit onClick={(e)=>{this.onEdit(item)}}/>
                    </td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.roles[0].name.replace('ROLE_', '')}</td>
                 </tr>
            ))}
          </tbody>
        </Table>
        <FormUser  show={this.state.formShow} handleClose = {this.onClose} handleSave={this.onSave} roles={this.state.roles} data={this.state.data}/>
      </div>
    );
  }
}
