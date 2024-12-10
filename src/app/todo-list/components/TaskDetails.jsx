import InputGroup from 'react-bootstrap/InputGroup';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Image from 'next/image';
import React, { useState } from 'react';

import '@/styles/todo-list/task-details.css';
import AddCategory from './AddCategory';

function TaskDetails({
  isVisible = false,
  title = '',
  status = '',
  createdAt = '',
  completedAt = '',
  categories = [],
  handleClose,
  handleDeleteTask,
  handleCategoryChange,
  handleAddCategory,
}) {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);

  return (
    <>
      <Offcanvas
        show={isVisible}
        onHide={handleClose}
        className="bg-dark text-white"
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Task Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="pt-0">
          <div className="d-flex; flex-direction: column;">
            <div className="my-2">
              <div className="d-flex justify-content-between align-items-center">
                <Badge pill bg={status === 'active' ? 'danger' : 'success'}>
                  {status}
                </Badge>

                <div className="category-wrap d-flex justify-content-between align-items-center w-100 bg-black mx-2">
                  <Form.Select
                    aria-label="Default select example"
                    className="mx-4 py-0 bg-black text-white category-select"
                    onChange={(e) => {
                      handleCategoryChange(e.target.value);
                    }}
                  >
                    {categories.map((category) => (
                      <option value={category.id} key={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Image
                    src="/svg/circle-plus.svg"
                    width={20}
                    height={20}
                    alt=""
                    className="mx-2 add-category"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  />
                </div>
              </div>

              <div className="d-flex; flex-direction: column; my-4">
                <p>{title}</p>
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

      <AddCategory
        show={showModal}
        handleClose={handleModalClose}
        handleAddCategory={handleAddCategory}
      />
    </>
  );
}

export default TaskDetails;
