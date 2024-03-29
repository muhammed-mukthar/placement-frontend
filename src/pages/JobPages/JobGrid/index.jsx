import React from "react";
import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";
import JobFilter from "./JobFilter";
import JobData from "./JobData";

const JobGrid = () => {
  document.title = "Jobs Grid | Placement Mangement";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Jobs" breadcrumbItem="Jobs Grid" />

          <JobFilter />
          <JobData />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default JobGrid;
