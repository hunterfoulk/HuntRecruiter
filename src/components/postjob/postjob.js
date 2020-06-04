import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import "./postjob.scss";
import axios from "axios";

export default function PostJob() {
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [modal, setModal] = useState(false);

  const postNewJob = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:5000/recruiter/jobs", {
        company: company,
        title: title,
        description: description,
        city: city,
      })
      .then((res) => {
        console.log("response", res);
        console.log("job sent to database");
      })
      .catch((error) =>
        console.error("new job post was not succesfull:", error)
      );

    setCompany("");
    setTitle("");
    setDescription("");
    setCity("");
    setModal(true);
  };

  return (
    <div className="post-main">
      {modal && (
        <div className="backdrop">
          <div className="post-modal">
            <div className="modal-header">
              <MdClose
                onClick={() => setModal(false)}
                className="modal-close"
              />
            </div>
            <h1>Job Listing Succesfully Posted!</h1>
          </div>
        </div>
      )}

      <div className="post-container">
        <div className="header">
          <h1>Post a job </h1>
        </div>
        <form onSubmit={postNewJob}>
          <div className="input-holders">
            <span>Company</span>
            <input
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                console.log(e.target.value);
              }}
            />
          </div>
          <div className="input-holders">
            <span>Job Title</span>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                console.log(e.target.value);
              }}
            />
            <span>Job Description</span>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                console.log(e.target.value);
              }}
              rows="4"
              cols="50"
            ></textarea>
          </div>
          <div className="input-holders">
            <span>City</span>
            <input
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                console.log(e.target.value);
              }}
            />
          </div>
          <button onClick={postNewJob}>Post Job</button>
        </form>
      </div>
    </div>
  );
}
