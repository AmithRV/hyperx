import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteCategoryConfirmModal({
  isVisible = false,
  label = '',
  handleClose,
  handleDeleteCategory,
}) {
  return (
    <Modal show={isVisible} onHide={handleClose} className="bg-black">
      <Modal.Header closeButton>
        <Modal.Title>Delete Category</Modal.Title>
      </Modal.Header>
      <Modal.Body className="fs-6">
        Delete the Category{' '}
        <span className="text-danger fw-medium">{label}</span>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDeleteCategory}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteCategoryConfirmModal;
