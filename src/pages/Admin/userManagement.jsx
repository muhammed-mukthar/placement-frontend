import React, { useEffect, useState, useRef, useMemo, Fragment } from "react";
import { Link } from "react-router-dom";
import TableContainer from "../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  UncontrolledTooltip,
  Input,
  Form,
} from "reactstrap";
import { Table, Button } from "reactstrap";

import * as Yup from "yup";
import { useFormik } from "formik";

import { Name, Email, Tags, Projects, Img } from "./contactlistCol";

// Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";

import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const userManagement = (props) => {
  const userData = useSelector((store) => store.userData.userData);

  // meta title
  document.title = "User List | Skote - Vite React Admin & Dashboard Template";
  const createUser = async (data) => {
    console.log(data, "data");
    const response = await axios.post(
      `${import.meta.env.VITE__APP_API}/user/admin/create-user`,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${userData.jwtToken}`,
        },
      }
    );
    console.log(response, "res");

    if (response) {
      toast.success("User created Successfully");

      fetchData();
    }
  };

  const dispatch = useDispatch();
  const [contact, setContact] = useState();
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (contact && contact.name) || "",
      email: (contact && contact.email) || "",
      password: (contact && contact.password) || "",
      department: (contact && contact.department) || "",
      role: (contact && contact.role) || "", // Default role is "Student"
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      role: Yup.string().required("Please select a role"),

      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email")
        .required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
      department: Yup.string().required("Please Select Department"),
    }),
    onSubmit: (values) => {
      console.log("this is me ");
      if (isEdit) {
        const updateUser = {
          id: contact.id,
          name: values.name,
          email: values.email,
          password: values.password,
          department: values.department,
        };

        // update user
        dispatch(onUpdateUser(updateUser));
        validation.resetForm();
        setIsEdit(false);
      } else {
        const newUser = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          name: values["name"],
          email: values["email"],
          password: values["password"],
          department: values["department"],
          role: values["role"],
        };
        console.log(newUser);
        createUser(newUser);
        validation.resetForm();
      }
      toggle();
    },
  });

  const [users, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  let fetchData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE__APP_API}/user/users`,
      {
        headers: {
          Authorization: `Bearer ${userData.jwtToken}`,
        },
      }
    );
    console.log(response, "res");

    if (response.data.users) {
      setUserList(response.data.users);
    }
  };
  useEffect(() => {
    fetchData();
    setIsEdit(false);
  }, []);

  const acceptUserHandler = async (userId) => {
    const response = await axios.post(
      `${import.meta.env.VITE__APP_API}/user/approve/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userData.jwtToken}`,
        },
      }
    );
    console.log(response, "res");

    if (response) {
      toast.success("User Accepted Successfully");

      fetchData();
    }
  };

  //   useEffect(() => {
  //     setContact(users);
  //     setIsEdit(false);
  //   }, [users]);

  //   useEffect(() => {
  //     if (!isEmpty(users) && !!isEdit) {
  //       setContact(users);
  //       setIsEdit(false);
  //     }
  //   }, [users]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleUserClick = (arg) => {
    const user = arg;

    setContact({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      department: user.department,
    });
    setIsEdit(true);

    toggle();
  };

  var node = useRef();
  const onPaginationPageChange = (page) => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page);
    }
  };

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (users) => {
    setContact(users);
    setDeleteModal(true);
  };

  const handleDeleteUser = () => {
    if (contact && contact.id) {
      dispatch(onDeleteUser(contact.id));
    }
    setContact("");
    onPaginationPageChange(1);
    setDeleteModal(false);
  };

  const handleUserClicks = () => {
    setIsEdit(false);
    toggle();
  };

  const keyField = "id";
  console.log(users, "users");
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Contacts" breadcrumbItem="User List" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Col sm="11">
              <div className="text-sm-end mt-auto">
                {" "}
                {/* mt-auto pushes this button to the bottom */}
                <Button
                  type="button"
                  color="primary"
                  className="btn mb-2 me-2"
                  onClick={handleUserClicks}
                >
                  <i className="mdi mdi-plus-circle-outline me-1" />
                  Create New User
                </Button>
              </div>
            </Col>
          </div>

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Table bordered hover>
                    <thead className="table-light table-nowrap">
                      <tr>
                        <th>name </th>
                        <th>email</th>
                        <th>department</th>
                        <th>role</th>
                        <th>Accepted</th>
                      </tr>
                    </thead>

                    <tbody>
                      <Fragment>
                        {users &&
                          users.map((data) => (
                            <tr key={data._id}>
                              <td>{data.name}</td>
                              <td>{data.email}</td>
                              <td>{data.department}</td>
                              <td>{data.role}</td>
                              <td>
                                {data.isApproved ? (
                                  "Accepted"
                                ) : (
                                  <Button
                                    type="button"
                                    color="success"
                                    className="btn mb-2 me-2"
                                    onClick={() => {
                                      acceptUserHandler(data._id);
                                    }}
                                  >
                                    {" "}
                                    Accept
                                  </Button>
                                )}
                              </td>
                            </tr>
                          ))}
                      </Fragment>
                    </tbody>
                  </Table>

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                      {isEdit ? "Edit User" : "Add User"}
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <Row>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">Name</Label>
                              <Input
                                name="name"
                                type="text"
                                placeholder="Insert Name"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.name || ""}
                                invalid={
                                  validation.touched.name &&
                                  validation.errors.name
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.name &&
                              validation.errors.name ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.name}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Email</Label>
                              <Input
                                name="email"
                                label="Email"
                                type="email"
                                placeholder="Insert Email"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={
                                  validation.touched.email &&
                                  validation.errors.email
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.email &&
                              validation.errors.email ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.email}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Password</Label>
                              <Input
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="Insert Password"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.password || ""}
                                invalid={
                                  validation.touched.password &&
                                  validation.errors.password
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.password &&
                              validation.errors.password ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.password}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Department</Label>
                              <Input
                                type="select"
                                name="department"
                                className="form-select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.department || ""}
                                invalid={
                                  validation.touched.department &&
                                  validation.errors.department
                                    ? true
                                    : false
                                }
                              >
                                <option value="">Select Department</option>
                                <option value="IT">IT</option>
                                <option value="HR">HR</option>
                                <option value="Finance">Finance</option>
                                <option value="Marketing">Marketing</option>
                                <option value="BCA">BCA</option>
                              </Input>
                              {validation.touched.department &&
                              validation.errors.department ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.department}
                                </FormFeedback>
                              ) : null}
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Role</Label>
                              <Input
                                type="select"
                                name="role"
                                className="form-select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.role || ""}
                                invalid={
                                  validation.touched.role &&
                                  validation.errors.role
                                    ? true
                                    : false
                                }
                              >
                                <option value="">Select Role</option>
                                <option value="student">Student</option>
                                <option value="employee">Employee</option>
                              </Input>
                              {validation.touched.role &&
                                validation.errors.role && (
                                  <FormFeedback type="invalid">
                                    {validation.errors.role}
                                  </FormFeedback>
                                )}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn btn-success save-user"
                              >
                                Save
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default userManagement;
