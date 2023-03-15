import React, { Component } from "react";


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import AuthService from "../../services/auth.service";



export default class FormReference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data !== null?this.props.data.id:0,
      name: this.props.data !== null?this.props.data.name:'',
      rights: {
                 editItem: AuthService.checkAuth("ROLE_MANAGER") 
              }
    };
    this.onChangeName = this.onChangeName.bind(this);
    this.onSave = this.onSave.bind(this);


  }
  onChangeName(event){
     this.setState({name: event.target.value});
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
     });

  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
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
