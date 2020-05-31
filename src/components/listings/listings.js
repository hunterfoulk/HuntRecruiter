import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Listings({ getJobs, setJobs, jobs }) {
  useEffect(() => {
    return () => {
      getJobs();
    };
  }, []);

  return (
    <div className="listings-main">
      <div>
        {jobs.map((job) => (
          <div key={job.job_id}>
            <p>{job.title}</p>
            <p>{job.city}</p>
            <p>{job.company}</p>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
