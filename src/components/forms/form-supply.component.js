import React, { Component } from "react";


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Multiselect from 'multiselect-react-dropdown';
import AuthService from "../../services/auth.service";



export default class FormSupply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data !== null?this.props.data.id:0,
      type: this.props.data !== null?this.props.data.type:'',
      size:this.props.data !== null?this.props.data.size:'',
      weightLimit: this.props.data !== null?this.props.data.weightLimit:0,
      qty: this.props.data !== null?this.props.data.qty:0,
      vendorSupplies: this.props.data !== null?this.props.data.vendorSupplies:[],
      rights: {
                 editItem: AuthService.checkAuth("ROLE_SUPERVISOR") 
              }

    };
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeWeightLimit = this.onChangeWeightLimit.bind(this);
    this.onChangeQty = this.onChangeQty.bind(this);
    this.onChangeVendorSupplies = this.onChangeVendorSupplies.bind(this);
    this.onRemoveVendorSupplies = this.onRemoveVendorSupplies.bind(this);

    this.onSave = this.onSave.bind(this);

  }

  onChangeType(event){
     this.setState({type: event.target.value});
  }
  onChangeSize(event){
     this.setState({size: event.target.value});
  }

  onChangeWeightLimit(event){
     this.setState({weightLimit: event.target.value});
  }
  onChangeQty(event){
     this.setState({qty: event.target.value});
  }
  onChangeVendorSupplies(selectedList, selectedItem){
     this.setState({vendorSupplies: selectedList});
  }
  onRemoveVendorSupplies(selectedList, removedItem){
     this.setState({vendorSupplies: selectedList});
  }

  onSave(){
    this.props.handleSave(this.state);
  }

  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
        id: nextProps.data !== null?nextProps.data.id:0,
        type: nextProps.data !== null?nextProps.data.type:'',
        size:nextProps.data !== null?nextProps.data.size:'',
        weightLimit: nextProps.data !== null?nextProps.data.weightLimit:0,
        qty: nextProps.data !== null?nextProps.data.qty:0,
        vendorSupplies: nextProps.data !== null?nextProps.data.vendorSupplies:[]
     });

  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Supply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group className="mb-3" controlId="formType">
              <Form.Label>Type</Form.Label>
              <Form.Control type="text" placeholder="Enter type" 
                 onChange={this.onChangeType}
                 value={this.state.type}
                 disabled={!this.state.rights.editItem}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLocation">
              <Form.Label>Size</Form.Label>
              <Form.Control type="text" placeholder="Enter size" 
                 onChange={this.onChangeSize}
                 value={this.state.size}
                 disabled={!this.state.rights.editItem}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <InputGroup className="mb-3">
              <Form.Label>Weight limit</Form.Label>
              &nbsp;
              <Form.Control type="number" placeholder="Enter weight limit" 
                 onChange={this.onChangeWeightLimit}
                 value={this.state.weightLimit}
                 disabled={!this.state.rights.editItem}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Form.Label>Quantity</Form.Label>
              &nbsp;
              <Form.Control type="number" placeholder="Enter quantity" 
                 onChange={this.onChangeQty}
                 value={this.state.qty}
                 disabled={!this.state.rights.editItem}
              />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDistributor">
              <Form.Label>Vendors</Form.Label>
              <Multiselect
                options={this.props.vendors} // Options to display in the dropdown
                selectedValues={this.state.vendorSupplies} // Preselected value to persist in dropdown
                onSelect={this.onChangeVendorSupplies} // Function will trigger on select event
                onRemove={this.onRemoveVendorSupplies} // Function will trigger on remove event
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
