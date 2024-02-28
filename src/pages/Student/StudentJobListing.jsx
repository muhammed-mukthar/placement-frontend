import React, { useState } from "react";
import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import JobFilter from "./JobFilter";
import JobData from "./JobData";

const StudentJobListing = () => {
  document.title = "Jobs Grid | Placement Mangement";
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Jobs" breadcrumbItem="Jobs Listing" />

          <JobFilter setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
          <JobData searchTerm={searchTerm} />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default StudentJobListing;
