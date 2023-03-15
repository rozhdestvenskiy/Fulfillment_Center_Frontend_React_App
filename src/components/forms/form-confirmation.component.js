import React, { Component } from "react";


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AuthService from "../../services/auth.service";



export default class FormConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.item_id,
    };
    this.onYes = this.onYes.bind(this);


  }

  onYes(id){
    this.props.handleYes(id);
  }

  componentDidMount() {
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to delete the object?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={(e)=>this.onYes(this.props.item_id)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
