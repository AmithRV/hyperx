import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';

function SyncData({ show = false, handleClose }) {
  return (
    <Modal size="sm" show={show} onHide={handleClose}>
      <Modal.Header className="py-2">
        <Modal.Title id="example-modal-sizes-title-sm">
          Data is not synced
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button variant="danger" className="w-100">
          sync
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default SyncData;
