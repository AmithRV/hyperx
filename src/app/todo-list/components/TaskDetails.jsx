import Offcanvas from 'react-bootstrap/Offcanvas';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import React from 'react';
import Image from 'next/image';

function TaskDetails({
  isVisible = false,
  title = '',
  status = '',
  createdAt = '',
  completedAt = '',
  handleClose,
  handleDeleteTask,
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

              {completedAt && (
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    id="basic-addon1"
                    className="bg-dark text-white"
                  >
                    Completed at
                  </InputGroup.Text>
                  <Form.Control
                    className="bg-dark text-white"
                    readOnly
                    value={completedAt}
                  />
                </InputGroup>
              )}

              <Button
                variant="danger"
                className="d-flex align-items-center"
                onClick={handleDeleteTask}
              >
                <Image
                  src="/svg/trash.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="mx-1"
                />
                <label>Delete</label>
              </Button>
            </div>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default TaskDetails;
