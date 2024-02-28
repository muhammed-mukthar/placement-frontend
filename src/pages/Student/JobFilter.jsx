import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Collapse,
  Row,
  Form,
  Label,
  Input,
} from "reactstrap";

//Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const JobFilter = ({ setSearchTerm, searchTerm }) => {
  const [selectDate, setSelectDate] = useState();
  const dateChange = (date) => {
    setSelectDate(date);
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <React.Fragment>
      <Row>
        <Col lg={12}>
          <Card className="job-filter">
            <CardBody>
              <Form>
                <Row className="g-3">
                  <Col xxl={4} lg={4}>
                    <div className="position-relative">
                      <Input
                        type="text"
                        className="form-control"
                        id="searchJob"
                        placeholder="Search your job"
                        onChange={handleSearchChange} // Add this line
                      />
                    </div>
                  </Col>

                  <Col xxl={2} lg={6}>
                    <div className="position-relative h-100 hstack gap-3">
                      <button
                        type="button"
                        className="btn btn-primary h-100 w-100"
                      >
                        <i className="bx bx-search-alt align-middle"></i> Find
                        Jobs
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default JobFilter;
