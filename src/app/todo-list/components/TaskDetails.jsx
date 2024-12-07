import Offcanvas from 'react-bootstrap/Offcanvas';
import Badge from 'react-bootstrap/Badge';
import React from 'react';

function TaskDetails({
  isVisible = false,
  title = '',
  status = '',
  handleClose,
}) {
  return (
    <Offcanvas
      show={isVisible}
      onHide={handleClose}
      className="bg-dark text-white"
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="pt-0">
        <div className="flex-direction: column;">
          <div className="my-2">
            <Badge pill bg={status === 'active' ? 'danger' : 'success'}>
              {status}
            </Badge>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default TaskDetails;
