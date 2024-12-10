import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import React from 'react';

function AddCategory({ show = false, handleClose, handleAddCategory }) {
  return (
    <Modal show={show} onHide={handleClose} className="bg-dark">
      <Modal.Header closeButton>
        <Modal.Title className="tee"> Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Label</Form.Label>
            <Form.Control type="string" placeholder="..." autoFocus />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleAddCategory} className="w-100">
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddCategory;
