import React, { Component } from "react";


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Select from 'react-select';
import AuthService from "../../services/auth.service";



export default class FormOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data !== null?this.props.data.id:0,
      number: this.props.data !== null?this.props.data.number:'',
      orderDate: this.props.data !== null?this.props.data.orderDate: new Date(),
      cost: this.props.data !== null?this.props.data.cost: 0,
      status: this.props.data !== null?this.props.data.status.name:'Not_processed',
      supply: this.props.data !== null?this.props.data.supply.id: 0,
      client: this.props.data !== null?this.props.data.client.id: 0,
      product: this.props.data !== null?this.props.data.product.id: 0,
      statuses: this.props.statuses !== null?this.props.statuses.map((obj)=>{return {value:obj.name, label: obj.name.replace('_', ' ')}}).filter((el)=>AuthService.checkAuth("ROLE_SUPERVISOR")?true:el.value !== 'Cancelled'):[],
      clients: this.props.clients !== null?this.props.clients.map((obj)=>{return {value:obj.id, label: obj.firstname + ' ' + obj.lastname + '(' + obj.email+')'}}):[],
      products: this.props.products !== null?this.props.products.map((obj)=>{return {value:obj.id, label: obj.name}}):[],
      supplies: this.props.supplies !== null?this.props.supplies.map((obj)=>{return {value:obj.id, label: obj.type + ' ' + obj.size + ' ' + obj.weightLimit}}):[],
      rights: {
                 editItem: AuthService.checkAuth("ROLE_MANAGER") 
              }

    };
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeOrderDate = this.onChangeOrderDate.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeSupply = this.onChangeSupply.bind(this);
    this.onChangeClient = this.onChangeClient.bind(this);
    this.onChangeProduct = this.onChangeProduct.bind(this);

    this.onSave = this.onSave.bind(this);


  }
  onChangeNumber(event){
     this.setState({number: event.target.value});
  }
  onChangeOrderDate(event){
     this.setState({orderDate: event});
  }
  onChangeCost(event){
     this.setState({cost: event.target.value});
  }
  onChangeStatus(event){
     this.setState({status: event.value});
  }
  onChangeSupply(event){
     this.setState({supply: event.value});
  }
  onChangeClient(event){
     this.setState({client: event.value});
  }
  onChangeProduct(event){
     this.setState({product: event.value});
  }

  onSave(){
    this.props.handleSave(this.state);
  }

  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
        id: nextProps.data !== null?nextProps.data.id:0,
        number: nextProps.data !== null?nextProps.data.number:'',
        orderDate: nextProps.data !== null?nextProps.data.orderDate: new Date(),
        cost: nextProps.data !== null?nextProps.data.cost:0,
        status: nextProps.data !== null?nextProps.data.status.name:'Not_processed',
        supply: nextProps.data !== null?nextProps.data.supply.id: 0,
        client: nextProps.data !== null?nextProps.data.client.id: 0,
        product: nextProps.data !== null?nextProps.data.product.id: 0,
        statuses: nextProps.statuses !== null?nextProps.statuses.map((obj)=>{return {value:obj.name, label: obj.name.replace('_', ' ')}}).filter((el)=>AuthService.checkAuth("ROLE_SUPERVISOR")?true:el.value !== 'Cancelled'):[],
        clients: nextProps.clients !== null?nextProps.clients.map((obj)=>{return {value:obj.id, label: obj.firstname + ' ' + obj.lastname + '(' + obj.email+')'}}):[],
        products: nextProps.products !== null?nextProps.products.map((obj)=>{return {value:obj.id, label: obj.name}}):[],
        supplies: nextProps.supplies !== null?nextProps.supplies.map((obj)=>{return {value:obj.id, label: obj.type + ' ' + obj.size + ' ' + obj.weightLimit}}):[],

     });

  }
  getDefaultOptions(id, options, value, isDefault)
  {
     if(id == 0 && !isDefault)
       return;
     const result = options.filter(obj => obj.value == value);

     return (result.length > 0)?result[0]:options[0];
  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}  size='xl'> 
        <Modal.Header closeButton>
          <Modal.Title>Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group className="mb-3" controlId="formNumber">
              <InputGroup className="mb-3">

              <Form.Label>Number</Form.Label>&nbsp;&nbsp;
              <Form.Control type="text" placeholder="Enter number" 
                 onChange={this.onChangeNumber}
                 value={this.state.number}
                 disabled={!this.state.rights.editItem}

              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Form.Label>Date</Form.Label>&nbsp;&nbsp;
              <Form.Control type="text" placeholder="Enter date" 
                 disabled
                 onChange={this.onChangeOrderDate}
                 value={this.state.orderDate.toLocaleDateString("en-US")}
              />

              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Form.Label>Cost</Form.Label>&nbsp;&nbsp;
              <Form.Control type="number" placeholder="Enter cost" 
                 onChange={this.onChangeCost}
                 value={this.state.cost}
                 disabled={!this.state.rights.editItem}
              />
              </InputGroup>
            </Form.Group>
              <Form.Label>Client</Form.Label>
              <Select  options={this.state.clients} 
                       defaultValue={this.getDefaultOptions(this.state.id, this.state.clients, this.state.client, false)}
                       onChange={this.onChangeClient}
                 isDisabled={!this.state.rights.editItem}
              />
              <Form.Label>Product</Form.Label>
              <Select  options={this.state.products} 
                       defaultValue={this.getDefaultOptions(this.state.id, this.state.products, this.state.product, false)}
                       onChange={this.onChangeProduct}
                 isDisabled={!this.state.rights.editItem}
              />
              <Form.Label>Supply</Form.Label>
              <Select  options={this.state.supplies} 
                       defaultValue={this.getDefaultOptions(this.state.id, this.state.supplies, this.state.supply, false)}
                       onChange={this.onChangeSupply}
              />

              <Form.Label>Status</Form.Label>
              <Select  options={this.state.statuses} 
                       defaultValue={this.getDefaultOptions(this.state.id, this.state.statuses, this.state.status, true)}
                       onChange={this.onChangeStatus}
              />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.onSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
