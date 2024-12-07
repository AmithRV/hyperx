import Offcanvas from 'react-bootstrap/Offcanvas';
import Badge from 'react-bootstrap/Badge';
import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function TaskDetails({
  isVisible = false,
  title = '',
  status = '',
  createdAt = '',
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
        <div className="d-flex; flex-direction: column;">
          <div className="my-2">
            <Badge pill bg={status === 'active' ? 'danger' : 'success'}>
              {status}
            </Badge>

            <div className="d-flex; flex-direction: column; my-4">
              <InputGroup className="mb-3">
                <InputGroup.Text
                  id="basic-addon1"
                  className="bg-dark text-white"
                >
                  Created at &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </InputGroup.Text>
                <Form.Control
                  className="bg-dark text-white"
                  readOnly
                  value={createdAt}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text
                  id="basic-addon1"
                  className="bg-dark text-white"
                >
                  Completed at
                </InputGroup.Text>
                <Form.Control className="bg-dark text-white" readOnly />
              </InputGroup>
            </div>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default TaskDetails;
