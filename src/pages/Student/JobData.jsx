import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Form,
  Label,
  Input,
  Pagination,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const JobData = ({ searchTerm }) => {
  const [modal, setModal] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [jobData, setJobData] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    resume: null,
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const userData = useSelector((store) => store.userData.userData);

  let fetchData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE__APP_API}/job/all-job?search=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${userData.jwtToken}`,
        },
      }
    );

    if (response.data) {
      setJobList(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      resume: file,
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    }
    if (!formData.resume) {
      errors.resume = "Resume is required";
    }

    // Add more validation checks if needed

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phoneNumber);
      formDataToSend.append("file", formData.resume);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("jobId", jobData._id);

      try {
        const response = await axios.put(
          `${import.meta.env.VITE__APP_API}/job/apply/${jobData._id}`,
          formDataToSend,
          {
            headers: {
              Authorization: `Bearer ${userData.jwtToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Application submitted successfully");
        setModal(false);

        console.log("Application submitted successfully:", response.data);
        fetchData();
      } catch (error) {
        console.error("Error submitting application:", error);
      }
    }
  };

  const selectJob = (details) => {
    setModal(true);
    setJobData(details);
  };
  return (
    <React.Fragment>
      <Row>
        {(jobList || []).map((item, key) => (
          <Col xl={3} md={6} key={key}>
            <Card>
              <CardBody>
                <div className="favorite-icon">
                  <Link to="#">
                    <i className="uil uil-heart-alt fs-18"></i>
                  </Link>
                </div>
                <h5 className="fs-17 mb-2">
                  <Link to="/job-details" className="text-dark">
                    {item?.jobTitle}
                  </Link>{" "}
                  <small className="text-muted fw-normal">
                    {item?.experience}
                  </small>
                </h5>
                <ul className="list-inline mb-0">
                  <li className="list-inline-item">
                    <p className="text-muted fs-14 mb-1">{item?.companyName}</p>
                  </li>{" "}
                  <li className="list-inline-item">
                    <p className="text-muted fs-14 mb-0">
                      <i className="mdi mdi-map-marker"></i> {item?.location}
                    </p>
                  </li>
                  <li className="list-inline-item">
                    <p className="text-muted fs-14 mb-0">
                      <i className="uil uil-wallet"></i> {item?.lastDate}
                    </p>
                  </li>
                </ul>
                <div className="mt-3 hstack gap-2">
                  <span className="badge rounded-1 badge-soft-success">
                    {item?.status}{" "}
                  </span>
                </div>
                <div className="mt-4 hstack gap-2">
                  <Link
                    to="#applyJobs"
                    onClick={() => selectJob(item)}
                    className="btn btn-soft-primary w-100"
                  >
                    Apply Now
                  </Link>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal */}
      <Modal
        isOpen={modal}
        toggle={() => {
          setModal();
        }}
        id="applyJobs"
      >
        <div className="modal-content">
          <ModalHeader
            toggle={() => setModal()}
            id="applyJobsLabel"
            className="modal-header"
          >
            Apply For This Job
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit}>
              <Row>
                {/* Full Name */}
                <Col lg={12}>
                  <div className="mb-3">
                    <Label htmlFor="fullnameInput" className="form-label">
                      Full Name
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="fullnameInput"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                    />
                    {formErrors.fullName && (
                      <div className="text-danger">{formErrors.fullName}</div>
                    )}
                  </div>
                </Col>
                {/* Email */}
                <Col lg={6}>
                  <div className="mb-3">
                    <Label htmlFor="emailInput" className="form-label">
                      Email
                    </Label>
                    <Input
                      type="email"
                      className="form-control"
                      id="emailInput"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                    {formErrors.email && (
                      <div className="text-danger">{formErrors.email}</div>
                    )}
                  </div>
                </Col>
                {/* Phone Number */}
                <Col lg={6}>
                  <div className="mb-3">
                    <Label htmlFor="phoneNumberInput" className="form-label">
                      Phone Number
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="phoneNumberInput"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="Enter your number"
                    />
                    {formErrors.phoneNumber && (
                      <div className="text-danger">
                        {formErrors.phoneNumber}
                      </div>
                    )}
                  </div>
                </Col>
                {/* Upload Resume */}
                <Col lg={12}>
                  <div className="mb-3">
                    <Label htmlFor="uploadResume" className="form-label">
                      Upload Resume
                    </Label>
                    <Input
                      type="file"
                      className="form-control"
                      id="uploadResume"
                      name="resume"
                      onChange={handleFileChange}
                      placeholder="Upload resume"
                    />
                    {formErrors.resume && (
                      <div className="text-danger">{formErrors.resume}</div>
                    )}
                  </div>
                </Col>

                {/* Message */}
                <Col lg={12}>
                  <div className="mb-4">
                    <Label htmlFor="messageInput" className="form-label">
                      Message
                    </Label>
                    <textarea
                      className="form-control"
                      id="messageInput"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                </Col>
                {/* Submit Button */}
                <Col lg={12}>
                  <div className="text-end">
                    <button type="submit" className="btn btn-success me-1">
                      Send Application{" "}
                      <i className="bx bx-send align-middle"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default JobData;
