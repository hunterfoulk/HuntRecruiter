import React, { useState } from "react";
import "./apply.scss";
import { AiOutlinePaperClip } from "react-icons/ai";
import axios from "axios";
import { MdClose } from "react-icons/md";

export default function Apply({ jobApps }) {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState(null);
  const [phone, setPhone] = useState("");
  const [modal, setModal] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("resume", resume);
    console.log("resume log", resume);

    let headers = {
      "Content-Type": "multipart/form-data",
    };

    axios
      .post("http://localhost:5000/recruiter/email", formData, {
        headers: headers,
        withCredentials: true,
      })

      .then((res) => {
        console.log("response", res);
        console.log("email data sent! ");
      })
      .catch((error) => {
        console.log(error);
      });

    for (var key of formData.entries()) {
      console.log(key[0] + "data, " + key[1]);
    }
    setEmail("");
    setFullName("");
    setPhone("");
    setResume(null);
    setModal(true);
  };

  return (
    <div className="apply-main">
      {modal && (
        <div className="backdrop">
          <div className="apply-modal">
            <div className="modal-header">
              <MdClose
                onClick={() => setModal(false)}
                className="modal-close"
              />
            </div>
            <h1>Your application has been sent.</h1>
          </div>
        </div>
      )}
      <div className="header">
        <p className="title">{jobApps.title}</p>
        <p className="company">{jobApps.company}</p>
      </div>
      <div className="form-container">
        <div className="form-header">
          <p>Submit your application</p>
        </div>
        <form onSubmit={(e) => sendEmail(e)}>
          <span>Resume/CV</span>
          <label className="custom-file-upload">
            <AiOutlinePaperClip className="paperclip" />
            Attach Resume/CVC
            <input
              onChange={(e) => {
                setResume(e.target.files[0]);
                console.log(e.target.value);
              }}
              className="resume"
              name="resume"
              type="file"
              encType="multipart/form-data"
              accept="application/pdf"
            />
          </label>
          <span>Full Name</span>
          <input
            value={fullname}
            onChange={(e) => {
              setFullName(e.target.value);
              console.log(e.target.value);
            }}
          ></input>
          <span className="email">Email</span>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              console.log(e.target.value);
            }}
          ></input>
          <span className="phone-number">Phone number</span>
          <input
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              console.log(e.target.value);
            }}
          ></input>
          <button onClick={(e) => sendEmail(e)}>Apply Now</button>
        </form>
      </div>
    </div>
  );
}
