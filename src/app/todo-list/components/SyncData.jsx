import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';

function SyncData({
  show = false,
  loading = false,
  handleClose,
  handleUploadOfflineTasks,
}) {
  return (
    <Modal size="sm" show={show} onHide={handleClose}>
      <Modal.Header className="py-2">
        <Modal.Title id="example-modal-sizes-title-sm">
          Data is not synced
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          variant="danger"
          className="w-100"
          onClick={handleUploadOfflineTasks}
          disabled={loading}
        >
          {loading ? 'syncing...' : 'sync'}
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default SyncData;
