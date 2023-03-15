import React, { Component } from "react";

import ProductService from "../services/product.service";
import ProductDistributorService from "../services/productDistributor.service";

import EventBus from "../common/EventBus";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {FaRegEdit, FaRegTrashAlt} from "react-icons/fa";
import FormConfirmation from './forms/form-confirmation.component';
import FormProduct from './forms/form-product.component'
import AuthService from "../services/auth.service";



export default class BoardProductsData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      distributors: [],
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
    ProductService.addNewItem(obj).then(
      response => {
         this.refreshData();
      },
      error => {
      }
    );                                            
  }
  updateItem(obj){
    ProductService.updateItem(obj).then(
      response => {
         this.refreshData();
      },
      error => {
      }
    );                                            
  }
  deleteItem(id){
    ProductService.deleteItem(id).then(
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
               name: formState.name,
               location: formState.location,
               pricePerItem: formState.pricePerItem,
               qty: formState.qty,
               distributor: formState.distributor.map((obj, index) =>obj.id)
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
    ProductService.getAll().then(
      response => {
        this.setState({
          products: response.data,
        });
      },
      error => {
        this.setState({
          products: [],
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );                                            
  }
  refreshDistributorData(){
    ProductDistributorService.getAll().then(
      response => {
        this.setState({
          distributors: response.data,
        });
      },
      error => {
        this.setState({
          distributors: [],
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );                                            
  }

  componentDidMount() {
     this.refreshData();
     this.refreshDistributorData();
  }

  render() {
    return (
      <div className="container">
        <header>
          <h3>Products</h3>
        </header>
        {this.state.rights.addNewItem && (
          <Button variant="primary" onClick={this.onAddNew} style={{marginBottom: '10px'}}>
             Add product
          </Button>
        )}
        <Table striped bordered hover>
          <thead>
             <tr>
                <th>#</th>
                <th>Name</th>
                <th>Location</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
          </thead>
          <tbody>
             {this.state.products.map((item, index) => (
                <tr key={item.id}>
                    <td><FaRegEdit onClick={(e)=>{this.onEdit(item)}}/>
                    {this.state.rights.deleteItem && (
                        <FaRegTrashAlt  onClick={(e)=>{this.confirmDelete(item.id)}}/>
                    )}
                    </td>
                    <td>{item.name}</td>
                    <td>{item.location}</td>
                    <td>{item.pricePerItem}</td>
                    <td>{item.qty}</td>
                 </tr>
            ))}
          </tbody>
        </Table>
        <FormProduct  show={this.state.formShow} handleClose = {this.onClose} handleSave={this.onSave} distributors={this.state.distributors} data={this.state.data}/>
        <FormConfirmation show={this.state.confirmShow} handleClose = {this.confirmClose} handleYes={this.onDelete} item_id={this.state.delete_id}/>

      </div>
    );
  }
}
