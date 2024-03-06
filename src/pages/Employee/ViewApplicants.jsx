import React, { useEffect, useState, useRef, useMemo, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

// Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "../../components/Common/ApplicantModal";

import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const ViewApplicants = (props) => {
  const userData = useSelector((store) => store.userData.userData);
  const Navigate = useNavigate();
  let { jobId } = useParams();

  // meta title
  document.title = "User List | Skote - Vite React Admin & Dashboard Template";
  const createUser = async (data) => {
    console.log(data, "data");
    const response = await axios.post(
      `${import.meta.env.VITE__APP_API}/job/create-job`,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${userData.jwtToken}`,
        },
      }
    );
    console.log(response, "res");

    if (response) {
      toast.success("Job created Successfully");

      fetchData();
    }
  };
  const editJobHandler = async (data) => {
    console.log(data, "tjos os data");
    const response = await axios.put(
      `${import.meta.env.VITE__APP_API}/job/placements/${data._id}`,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${userData.jwtToken}`,
        },
      }
    );
    console.log(response, "res");

    if (response) {
      toast.success("Job edited Successfully");

      fetchData();
    }
  };
  const deleteJobHandler = async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE__APP_API}/job/select-applicant`,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${userData.jwtToken}`,
        },
      }
    );

    console.log(response, "res");

    if (response) {
      toast.success("Job deleted Successfully");

      fetchData();
    }
  };
  const [contact, setContact] = useState();

  // validation
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      jobTitle: (contact && contact.jobTitle) || "",
      companyName: (contact && contact.companyName) || "",
      location: (contact && contact.location) || "",
      experience: (contact && contact.experience) || "",
      position: (contact && contact.position) || "",
      postedDate: (contact && contact.postedDate) || "",
      lastDate: (contact && contact.lastDate) || "",
      status: (contact && contact.status) || "Open",
    },
    validationSchema: Yup.object({
      jobTitle: Yup.string().required("Please Enter Job Title"),
      companyName: Yup.string().required("Please Enter Company Name"),
      location: Yup.string().required("Please Enter Location"),
      experience: Yup.string().required("Please Enter Experience"),
      position: Yup.string().required("Please Enter Position"),
      postedDate: Yup.string().required("Please Enter Posted Date"),
      lastDate: Yup.string().required("Please Enter Last Date"),
      status: Yup.string().required("Please Select Status"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateJob = { ...values, _id: contact._id };
        editJobHandler(updateJob);
      } else {
        const newJob = {
          ...values,
          id: Math.floor(Math.random() * (30 - 20)) + 20,
        };
        createUser(newJob);
      }
      validation.resetForm();
      toggle();
    },
  });

  const [users, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  let fetchData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE__APP_API}/job/applied-users/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${userData.jwtToken}`,
        },
      }
    );
    console.log(response, "res");

    if (response.data.data) {
      setUserList(response.data.data);
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
  const handleJobClick = (job) => {
    setContact({
      _id: job._id,
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      location: job.location,
      experience: job.experience,
      position: job.position,
      postedDate: job.postedDate,
      lastDate: job.lastDate,
      status: job.status,
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
    console.log(contact);
    if (contact && contact._id) {
      deleteJobHandler(contact);
    }
    setContact("");

    setDeleteModal(false);
  };

  const handleUserClicks = () => {
    setIsEdit(false);
    toggle();
  };

  const handleDownload = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/job/download/${id}`);

      // Assuming the response is a Blob (binary data)
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(new Blob([blob]));

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

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
          <Breadcrumbs title="jobs" breadcrumbItem="Job Applicants" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Col sm="11">
              <div className="text-sm-end mt-auto">
                {" "}
                {/* mt-auto pushes this button to the bottom */}
                <Button
                  type="button"
                  color="primary"
                  className="btn mb-2 me-2"
                  onClick={() => {
                    Navigate("/job-management");
                  }}
                >
                  Go Back
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
                        <th>email</th>
                        <th>phone</th>
                        <th>message</th>
                        <th>resume</th>
                        <th>Select</th>
                      </tr>
                    </thead>

                    <tbody>
                      {users &&
                        users.map((job) => (
                          <tr key={job._id}>
                            <td>{job.email}</td>
                            <td>{job.phone}</td>
                            <td>{job.message}</td>
                            <td>
                              {" "}
                              <button
                                onClick={() => {
                                  handleDownload(job._id);
                                }}
                                className="btn btn-info"
                              >
                                download Resume
                              </button>{" "}
                            </td>
                            <td>
                              {" "}
                              {job.selected ? (
                                <span className="badge bg-success">
                                  Selected
                                </span>
                              ) : (
                                <button
                                  onClick={() => {
                                    onClickDelete(job);
                                  }}
                                  className="btn btn-success"
                                >
                                  Select Applicant
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>

                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>
                      {isEdit ? "Edit Job" : "Add Job"}
                    </ModalHeader>
                    <ModalBody>
                      <Form onSubmit={validation.handleSubmit}>
                        <Row>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">Job Title</Label>
                              <Input
                                name="jobTitle"
                                type="text"
                                placeholder="Enter Job Title"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.jobTitle}
                                invalid={
                                  validation.touched.jobTitle &&
                                  !!validation.errors.jobTitle
                                }
                              />
                              <FormFeedback>
                                {validation.errors.jobTitle}
                              </FormFeedback>
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Company Name</Label>
                              <Input
                                name="companyName"
                                type="text"
                                placeholder="Enter Company Name"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.companyName}
                                invalid={
                                  validation.touched.companyName &&
                                  !!validation.errors.companyName
                                }
                              />
                              <FormFeedback>
                                {validation.errors.companyName}
                              </FormFeedback>
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Location</Label>
                              <Input
                                name="location"
                                type="text"
                                placeholder="Enter Location"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.location}
                                invalid={
                                  validation.touched.location &&
                                  !!validation.errors.location
                                }
                              />
                              <FormFeedback>
                                {validation.errors.location}
                              </FormFeedback>
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">experience</Label>
                              <Input
                                type="select"
                                name="experience"
                                className="form-select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.experience || ""}
                                invalid={
                                  validation.touched.experience &&
                                  validation.errors.experience
                                    ? true
                                    : false
                                }
                              >
                                <option value="">Select experience</option>
                                <option value="Fresher">Fresher</option>
                                <option value="1 years">1 year</option>
                                <option value="2 year">2 year</option>
                              </Input>
                              {validation.touched.experience &&
                              validation.errors.experience ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.experience}
                                </FormFeedback>
                              ) : null}
                            </div>

                            <div className="mb-3">
                              <Label className="form-label">Position</Label>
                              <Input
                                name="position"
                                type="text"
                                placeholder="Enter Position"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.position}
                                invalid={
                                  validation.touched.position &&
                                  !!validation.errors.position
                                }
                              />
                              <FormFeedback>
                                {validation.errors.position}
                              </FormFeedback>
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Posted Date</Label>
                              <Input
                                name="postedDate"
                                type="date"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.postedDate}
                                invalid={
                                  validation.touched.postedDate &&
                                  !!validation.errors.postedDate
                                }
                              />
                              <FormFeedback>
                                {validation.errors.postedDate}
                              </FormFeedback>
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Last Date</Label>
                              <Input
                                name="lastDate"
                                type="date"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.lastDate}
                                invalid={
                                  validation.touched.lastDate &&
                                  !!validation.errors.lastDate
                                }
                              />
                              <FormFeedback>
                                {validation.errors.lastDate}
                              </FormFeedback>
                            </div>
                            <div className="mb-3">
                              <Label className="form-label">Status</Label>
                              <Input
                                type="select"
                                name="status"
                                className="form-select"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.status}
                                invalid={
                                  validation.touched.status &&
                                  !!validation.errors.status
                                }
                              >
                                <option value="">Select Status</option>
                                <option value="Open">Open</option>
                                <option value="Closed">Closed</option>
                              </Input>
                              <FormFeedback>
                                {validation.errors.status}
                              </FormFeedback>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button type="submit" className="btn btn-success">
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

export default ViewApplicants;
