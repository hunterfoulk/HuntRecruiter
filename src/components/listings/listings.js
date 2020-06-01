import React, { useState, useEffect } from "react";
import axios from "axios";
import "./listings.scss";
import Location from "../images/locationimg.png";
import { FaRegBuilding } from "react-icons/fa";
import JobModal from "../modal/jobModal";

export default function Listings({ getJobs, setJobs, jobs }) {
  const [modal, setModal] = useState(false);
  const [content, setContent] = useState([]);

  useEffect(() => {
    return () => {
      getJobs();
    };
  }, []);
  console.log("jobs", jobs);
  return (
    <div className="listings-main">
      <div className="card-container">
        {jobs.map((job, i) => (
          <>
            <div className="card" key={job.job_id}>
              <p
                onClick={async () => {
                  setModal(true);
                  setContent(job);
                  console.log(job);
                }}
                className="title"
              >
                {job.title}
              </p>
              <div className="location">
                <p>{job.city}</p>
                <img src={Location} className="location-img" />
                <p className="company">{job.company}</p>
                <FaRegBuilding className="building" />
              </div>
              <div className="description">
                <p>{job.description}</p>
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="modal-container">
        {modal && <JobModal setModal={setModal} content={content} />}
      </div>
    </div>
  );
}
