import React from "react";
import "./modal.scss";
import { MdClose } from "react-icons/md";

export default function JobModal({ content, setModal }) {
  return (
    <div className="modal-main">
      <div className="content-container">
        <div className="close-container">
          <MdClose onClick={() => setModal(false)} className="close-icon" />
        </div>
        <div className="header">
          <h3 className="title">{content.title}</h3>
          <h4 className="company">{content.company}</h4>
          <button>Apply Now</button>
        </div>
        {/* <div className="requirements-container">
          <h3>Requirements:</h3>
        </div> */}
        <div className="description">
          <p>{content.description}</p>
        </div>
      </div>
    </div>
  );
}
