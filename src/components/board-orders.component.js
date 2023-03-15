import React, { Component } from "react";

import OrderService from "../services/order.service";
import OrderStatusService from "../services/orderStatus.service";
import AuthService from "../services/auth.service";

import ClientService from "../services/client.service";
import ProductService from "../services/product.service";
import SupplyService from "../services/supply.service";


import EventBus from "../common/EventBus";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {FaRegEdit, FaRegTrashAlt} from "react-icons/fa";
import FormConfirmation from './forms/form-confirmation.component';
import FormOrder from './forms/form-order.component'



export default class BoardOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      products: [],
      supplies: [],
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
    this.refreshStatusesData = this.refreshStatusesData.bind(this);
    this.refreshProductsData = this.refreshProductsData.bind(this);
    this.refreshClientsData = this.refreshClientsData.bind(this);
    this.refreshSuppliesData = this.refreshSuppliesData.bind(this);

  }
  onClose(){
    this.setState({formShow: false, data: null})
  }
  addNewItem(obj){
    OrderService.addNewItem(obj).then(
      response => {
         this.refreshData();
      },
      error => {
      }
    );                                            
  }
  updateItem(obj){
    OrderService.updateItem(obj).then(
      response => {
         this.refreshData();
      },
      error => {
      }
    );                                            
  }
  deleteItem(id){
    OrderService.deleteItem(id).then(
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
               number: formState.number,
               orderDate: formState.orderDate,
               cost: formState.cost,
               client: formState.client,
               status: formState.status,
               supply: formState.supply,
               product: formState.product,

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
    OrderService.getAll().then(
      response => {
        const data = response.data.map((obj)=>{obj.orderDate = new Date(Date.parse(obj.orderDate)); return obj;});
        this.setState({
          orders: data,
        });
      },
      error => {
        this.setState({
          orders: [],
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );                                            
  }
  refreshStatusesData(){
    OrderStatusService.getAll().then(
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
  refreshProductsData(){
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
  refreshClientsData(){
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
  refreshSuppliesData(){
    SupplyService.getAll().then(
      response => {
        this.setState({
          supplies: response.data,
        });
      },
      error => {
        this.setState({
          supplies: [],
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );                                            
  }

  componentDidMount() {
    this.refreshData();
    this.refreshStatusesData();
    this.refreshProductsData();
    this.refreshClientsData()
    this.refreshSuppliesData()

  }

  render() {
    return (
      <div className="container">
        <header>
          <h3>Orders</h3>
        </header>
        {this.state.rights.addNewItem && (
        <Button variant="primary" onClick={this.onAddNew} style={{marginBottom: '10px'}}>
            Add order
        </Button>
        )}
        <Table striped bordered hover>
          <thead>
             <tr>
                <th>#</th>
                <th>Number</th>
                <th>Date</th>
                <th>Client</th>
                <th>Cost</th>
                <th>Product</th>
                <th>Supply</th>
                <th>Status</th>
              </tr>
          </thead>
          <tbody>
             {this.state.orders.map((item, index) => (
                <tr key={item.id}>
                    <td><FaRegEdit onClick={(e)=>{this.onEdit(item)}}/>
                    {this.state.rights.deleteItem && (
                        <FaRegTrashAlt  onClick={(e)=>{this.confirmDelete(item.id)}}/>
                    )}
                    </td>
                    <td>{item.number}</td>
                    <td>{item.orderDate.toLocaleDateString("en-US")}</td>
                    <td>{item.client.firstname} {item.client.lastname} email: {item.client.email}</td>
                    <td>{item.cost}</td>
                    <td>{item.product.name} {item.product.location} p:{item.product.pricePerItem} q:{item.product.qty}</td>
                    <td>{item.supply.type} size: {item.supply.size} limit: {item.supply.weightLimit}</td>
                    <td>{item.status.name}</td>
                 </tr>
            ))}
          </tbody>
        </Table>
        <FormOrder show={this.state.formShow} 
                   handleClose = {this.onClose} 
                   handleSave={this.onSave} 
                   statuses={this.state.statuses} 
                   clients={this.state.clients} 
                   products={this.state.products} 
                   supplies={this.state.supplies} 
                   data={this.state.data}
         />
        <FormConfirmation show={this.state.confirmShow} handleClose = {this.confirmClose} handleYes={this.onDelete} item_id={this.state.delete_id}/>
      </div>
    );
  }
}
