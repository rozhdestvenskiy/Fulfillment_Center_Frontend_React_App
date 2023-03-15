import React, { Component } from "react";


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import AuthService from "../../services/auth.service";




export default class FormClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data !== null?this.props.data.id:0,
      firstname: this.props.data !== null?this.props.data.firstname:'',
      lastname: this.props.data !== null?this.props.data.lastname:'',
      email: this.props.data !== null?this.props.data.email:'',
      status: this.props.data !== null?this.props.data.status.name:'New',
      statuses: this.props.statuses !== null?this.props.statuses.map((obj)=>{return {value:obj.name, label: obj.name.replace('_', ' ')}}):[],
      rights: {
                 editItem: AuthService.checkAuth("ROLE_MANAGER") 
              }

    };
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onSave = this.onSave.bind(this);


  }
  onChangeFirstName(event){
     this.setState({firstname: event.target.value});
  }
  onChangeLastName(event){
     this.setState({lastname: event.target.value});
  }
  onChangeEmail(event){
     this.setState({email: event.target.value});
  }
  onChangeStatus(event){
     this.setState({status: event.value});
  }

  onSave(){
    this.props.handleSave(this.state);
  }

  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
        id: nextProps.data !== null?nextProps.data.id:0,
        firstname: nextProps.data !== null?nextProps.data.firstname:'',
        lastname: nextProps.data !== null?nextProps.data.lastname:'',
        email: nextProps.data !== null?nextProps.data.email:'',
        status: nextProps.data !== null?nextProps.data.status.name:'New',
        statuses: nextProps.statuses !== null?nextProps.statuses.map((obj)=>{return {value:obj.name, label: obj.name.replace('_', ' ')}}):[],
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
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>Frst name</Form.Label>
              <Form.Control type="text" placeholder="Enter first name" 
                 onChange={this.onChangeFirstName}
                 value={this.state.firstname}
                 disabled={!this.state.rights.editItem}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control type="text" placeholder="Enter last name" 
                 onChange={this.onChangeLastName}
                 value={this.state.lastname}
                 disabled={!this.state.rights.editItem}
              />
            </Form.Group>


            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" 
                 onChange={this.onChangeEmail}
                 value={this.state.email}
                 disabled={!this.state.rights.editItem}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Select  options={this.state.statuses} 
                       defaultValue={this.getDefaultOptions(this.state.id, this.state.statuses, this.state.status, true)}
                       onChange={this.onChangeStatus}
                       isDisabled={!this.state.rights.editItem}
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
