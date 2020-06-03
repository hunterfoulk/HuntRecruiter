import React, { useState } from "react";
import "./modal.scss";
import { MdClose } from "react-icons/md";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import Apply from "../apply/apply";

export default function JobModal({ content, setModal, setJobApps }) {
  const history = useHistory();

  return (
    <>
      <div key={content.job_id} className="modal-main">
        <div className="content-container">
          <div className="close-container">
            <MdClose onClick={() => setModal(false)} className="close-icon" />
          </div>
          <div className="header">
            <h3 className="title">{content.title}</h3>
            <h4 className="company">{content.company}</h4>

            <button
              onClick={() => {
                setJobApps(content);
                console.log(content.job_id);
                console.log("modal", content);
                history.push("/apply")
              }}
            >
              Apply Now
            </button>

            {/* {clicked ? <Apply jobApps={jobApps} /> : null} */}
          </div>
          <div className="description">
            <p>{content.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
