import React, { Component } from "react";


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Multiselect from 'multiselect-react-dropdown';
import AuthService from "../../services/auth.service";



export default class FormProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data !== null?this.props.data.id:0,
      name: this.props.data !== null?this.props.data.name:'',
      location:this.props.data !== null?this.props.data.location:'',
      pricePerItem: this.props.data !== null?this.props.data.pricePerItem:0,
      qty: this.props.data !== null?this.props.data.qty:0,
      distributor: this.props.data !== null?this.props.data.distributor:[],
      rights: {
                 editItem: AuthService.checkAuth("ROLE_MANAGER") 
              }

    };
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangePricePerItem = this.onChangePricePerItem.bind(this);
    this.onChangeQty = this.onChangeQty.bind(this);
    this.onChangeDistributor = this.onChangeDistributor.bind(this);
    this.onRemoveDistributor = this.onRemoveDistributor.bind(this);

    this.onSave = this.onSave.bind(this);

  }
  onChangeName(event){
     this.setState({name: event.target.value});
  }
  onChangeLocation(event){
     this.setState({location: event.target.value});
  }

  onChangePricePerItem(event){
     this.setState({pricePerItem: event.target.value});
  }
  onChangeQty(event){
     this.setState({qty: event.target.value});
  }
  onChangeDistributor(selectedList, selectedItem){
     this.setState({distributor: selectedList});
  }
  onRemoveDistributor(selectedList, removedItem){
     this.setState({distributor: selectedList});
  }

  onSave(){
    this.props.handleSave(this.state);
  }

  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
        id: nextProps.data !== null?nextProps.data.id:0,
        name: nextProps.data !== null?nextProps.data.name:'',
        location:nextProps.data !== null?nextProps.data.location:'',
        pricePerItem: nextProps.data !== null?nextProps.data.pricePerItem:0,
        qty: nextProps.data !== null?nextProps.data.qty:0,
        distributor: nextProps.data !== null?nextProps.data.distributor:[]
     });

  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" 
                 onChange={this.onChangeName}
                 value={this.state.name}
                 disabled={!this.state.rights.editItem}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="Enter location" 
                 onChange={this.onChangeLocation}
                 value={this.state.location}
                 disabled={!this.state.rights.editItem}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <InputGroup className="mb-3">
              <Form.Label>Price</Form.Label>
              &nbsp;
              <Form.Control type="number" placeholder="Enter price" 
                 onChange={this.onChangePricePerItem}
                 value={this.state.pricePerItem}
                 disabled={!this.state.rights.editItem}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Form.Label>Quantity</Form.Label>
              &nbsp;
              <Form.Control type="number" placeholder="Enter Quantity" 
                 onChange={this.onChangeQty}
                 value={this.state.qty}
                 disabled={!this.state.rights.editItem}
              />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDistributor">
              <Form.Label>Distributors</Form.Label>
              <Multiselect
                options={this.props.distributors} // Options to display in the dropdown
                selectedValues={this.state.distributor} // Preselected value to persist in dropdown
                onSelect={this.onChangeDistributor} // Function will trigger on select event
                onRemove={this.onRemoveDistributor} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                disable={!this.state.rights.editItem}
              />
            </Form.Group>

          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button variant="primary" 
                  onClick={this.onSave}
                  disabled={!this.state.rights.editItem}
           >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
