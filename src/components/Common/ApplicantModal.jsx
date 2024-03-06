import PropTypes from "prop-types";
import React from "react";
import { Modal, ModalBody } from "reactstrap";

const ApplicantModal = ({ show, onDeleteClick, onCloseClick }) => {
  return (
    <Modal size="sm" isOpen={show} toggle={onCloseClick} centered={true}>
      <div className="modal-content">
        <ModalBody className="px-4 py-5 text-center">
          <button
            type="button"
            onClick={onDeleteClick}
            className="btn-close position-absolute end-0 top-0 m-3"
          ></button>

          <p className="text-muted font-size-16 mb-4">
            Are you sure you want to Select This Applicant
          </p>

          <div className="hstack gap-2 justify-content-center mb-0">
            <button
              type="button"
              className="btn btn-success"
              onClick={onDeleteClick}
            >
              Select Applicant
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCloseClick}
            >
              Close
            </button>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
};

ApplicantModal.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any,
};

export default ApplicantModal;
