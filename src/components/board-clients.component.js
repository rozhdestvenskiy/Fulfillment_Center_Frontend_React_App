import React, { Component } from "react";

import ClientService from "../services/client.service";
import ClientStatusService from "../services/clientStatus.service";
import AuthService from "../services/auth.service";

import EventBus from "../common/EventBus";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {FaRegEdit, FaRegTrashAlt} from "react-icons/fa";
import FormConfirmation from './forms/form-confirmation.component';
import FormClient from './forms/form-client.component'


export default class BoardClients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clients: [],
      statuses: [],
      formShow: false, 
      delete_id: 0,
      confirmShow: false,
      data: null,
      rights: {
                 deleteItem: AuthService.checkAuth("ROLE_MANAGER"), 
                 addNewItem: AuthService.checkAuth("ROLE_MANAGER") 
              }
    };
    this.onClose = this.onClose.bind(this);
    this.onAddNew = this.onAddNew.bind(this);
    this.onSave = this.onSave.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.onEdit   = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.confirmClose = this.confirmClose.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  onClose(){
    this.setState({formShow: false, data: null})
  }
  addNewItem(obj){
    ClientService.addNewItem(obj).then(
      response => {
         this.refreshData();
      },
      error => {
      }
    );                                            
  }
  updateItem(obj){
    ClientService.updateItem(obj).then(
      response => {
         this.refreshData();
      },
      error => {
      }
    );                                            
  }
  deleteItem(id){
    ClientService.deleteItem(id).then(
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
               firstname: formState.firstname,
               lastname: formState.lastname,
               email: formState.email,
               status: formState.status,
              }
    if(obj.id === 0)
      return this.addNewItem(obj);

    return this.updateItem(obj);

  }
  onEdit(item){
    this.setState({formShow: true, data: item})
  }
  onDelete(id){
     this.confirmClose();
     return this.deleteItem(id);
  }
  confirmClose(){
    this.setState({delete_id: 0, confirmShow: false})
  };

  confirmDelete(id){

    this.setState({delete_id: id, confirmShow: true})
  }
  onAddNew(){
    this.setState({formShow: true})


  }
  refreshData(){
    ClientService.getAll().then(
      response => {
        this.setState({
          clients: response.data,
        });
      },
      error => {
        this.setState({
          clients: [],
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );                                            
  }
  componentDidMount() {
    this.refreshData();
    ClientStatusService.getAll().then(
      response => {
        this.setState({
          statuses: response.data,
        });
      },
      error => {
        this.setState({
          statuses: [],
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
          <h3>Clients</h3>
        </header>
        {this.state.rights.addNewItem && (
          <Button variant="primary" onClick={this.onAddNew} style={{marginBottom: '10px'}}>
            Add client
          </Button>
        )}
        <Table striped bordered hover>
          <thead>
             <tr>
                <th>#</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
          </thead>
          <tbody>
             {this.state.clients.map((item, index) => (
                <tr key={item.id}>
                    <td><FaRegEdit onClick={(e)=>{this.onEdit(item)}}/>
                    {this.state.rights.deleteItem && (
                        <FaRegTrashAlt  onClick={(e)=>{this.confirmDelete(item.id)}}/>
                    )}
                    </td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.email}</td>
                    <td>{item.status.name}</td>
                 </tr>
            ))}
          </tbody>
        </Table>
        <FormClient show={this.state.formShow} handleClose = {this.onClose} handleSave={this.onSave} statuses={this.state.statuses} data={this.state.data}/>
        <FormConfirmation show={this.state.confirmShow} handleClose = {this.confirmClose} handleYes={this.onDelete} item_id={this.state.delete_id}/>
      </div>
    );
  }
}
