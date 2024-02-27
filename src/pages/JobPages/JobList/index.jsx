import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import "bootstrap/dist/css/bootstrap.min.css";
import TableContainer from "../../../components/Common/TableContainer";
import * as Yup from "yup";
import { useFormik } from "formik";

//import components
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import DeleteModal from "../../../components/Common/DeleteModal";

import {
  JobNo,
  JobTitle,
  CompanyName,
  Location,
  Experience,
  Position,
  Type,
  PostedDate,
  LastDate,
  Status,
} from "./JobListCol";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Col, Row, UncontrolledTooltip, Card, CardBody } from "reactstrap";
import { GetAllUsers } from "../../../API/Auth/all";

function JobList() {
  //meta title
  document.title = "Jobs List | Skote - Vite React Admin & Dashboard Template";

  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobsList, setJobsList] = useState([]);
  const [job, setJob] = useState(null);
  const fetchData = async () => {
    let users = await GetAllUsers();
    if (users.users) {
      setJobs(users.users);
    }
    console.log("i am in here", users);
  };

  useEffect(() => {
    console.log("i am here");
    fetchData();
  }, []);

  const dispatch = useDispatch();

  const toggle = () => {
    if (modal) {
      setModal(false);
      setJob(null);
    } else {
      setModal(true);
    }
  };

  const handleJobClick = (arg) => {
    const job = arg;
    setJob({
      id: job.id,
      jobId: job.jobId,
      jobTitle: job.jobTitle,
      companyName: job.companyName,
      location: job.location,
      experience: job.experience,
      position: job.position,
      type: job.type,
      status: job.status,
    });

    setIsEdit(true);

    toggle();
  };

  //delete Job
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (job) => {
    setJob(job);
    setDeleteModal(true);
  };

  const handleJobClicks = () => {
    setJobsList("");
    setIsEdit(false);
    toggle();
  };

  const columns = useMemo(
    () => [
      {
        Header: "name",
        accessor: "name",
        filterable: true,
        Cell: (cellProps) => {
          return <JobNo {...cellProps} />;
        },
      },
      {
        Header: "email",
        accessor: "email",
        filterable: true,
        Cell: (cellProps) => {
          return <JobTitle {...cellProps} />;
        },
      },
      {
        Header: "department",
        accessor: "department",
        filterable: true,
        Cell: (cellProps) => {
          return <CompanyName {...cellProps} />;
        },
      },
      {
        Header: "role",
        accessor: "role",
        filterable: true,
        Cell: (cellProps) => {
          return <Location {...cellProps} />;
        },
      },

      {
        Header: "Action",
        accessor: "action",
        disableFilters: true,
        Cell: (cellProps) => {
          return (
            <ul className="list-unstyled hstack gap-1 mb-0">
              <li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
                <Link to="/job-details" className="btn btn-sm btn-soft-primary">
                  <i className="mdi mdi-eye-outline" id="viewtooltip"></i>
                </Link>
              </li>
              <UncontrolledTooltip placement="top" target="viewtooltip">
                View
              </UncontrolledTooltip>

              <li>
                <Link
                  to="#"
                  className="btn btn-sm btn-soft-info"
                  onClick={() => {
                    const jobData = cellProps.row.original;
                    handleJobClick(jobData);
                  }}
                >
                  <i className="mdi mdi-pencil-outline" id="edittooltip" />
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                  </UncontrolledTooltip>
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="btn btn-sm btn-soft-danger"
                  onClick={() => {
                    const jobData = cellProps.row.original;
                    onClickDelete(jobData);
                  }}
                >
                  <i className="mdi mdi-delete-outline" id="deletetooltip" />
                  <UncontrolledTooltip placement="top" target="deletetooltip">
                    Delete
                  </UncontrolledTooltip>
                </Link>
              </li>
            </ul>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => {}}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Jobs" breadcrumbItem="Jobs Lists" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody className="border-bottom">
                  <div className="d-flex align-items-center">
                    <h5 className="mb-0 card-title flex-grow-1">
                      Pending User Lists
                    </h5>
                  </div>
                </CardBody>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={jobs}
                    isGlobalFilter={true}
                    isAddOptions={false}
                    handleJobClicks={handleJobClicks}
                    isJobListGlobalFilter={true}
                    customPageSize={10}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}

export default JobList;
