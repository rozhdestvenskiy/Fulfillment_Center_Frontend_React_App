import React, { Component } from "react";


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import AuthService from "../../services/auth.service";




export default class FormUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data !== null?this.props.data.id:0,
      username: this.props.data !== null?this.props.data.username:'',
      email: this.props.data !== null?this.props.data.email:'',
      role: this.props.data !== null?this.props.data.roles[0].id:'',
      roles: this.props.roles !== null?this.props.roles.map((obj)=>{return {value:obj.id, label: obj.name.replace('ROLE_', '')}}):[],
    };
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onSave = this.onSave.bind(this);


  }
  onChangeEmail(event){
     this.setState({email: event.target.value});
  }
  onChangeRole(event){
     this.setState({role: event.value});
  }

  onSave(){
    this.props.handleSave(this.state);
  }

  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
        id: nextProps.data !== null?nextProps.data.id:0,
        username: nextProps.data !== null?nextProps.data.username:'',
        email: nextProps.data !== null?nextProps.data.email:'',
        role: nextProps.data !== null?nextProps.data.roles[0].id:'',
        roles: nextProps.roles !== null?nextProps.roles.map((obj)=>{return {value:obj.id, label: obj.name.replace('ROLE_', '')}}):[],
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
          <Modal.Title>Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formUsernamem">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" 
                 value={this.state.username}
                 disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" 
                 onChange={this.onChangeEmail}
                 value={this.state.email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Role</Form.Label>
              <Select  options={this.state.roles} 
                       defaultValue={this.getDefaultOptions(this.state.id, this.state.roles, this.state.role, false)}
                       onChange={this.onChangeRole}
              />
            </Form.Group>
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
