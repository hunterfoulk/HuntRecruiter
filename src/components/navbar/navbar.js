import React from "react";
import "./navbar.scss";
import { AiOutlineGlobal } from "react-icons/ai";
import { Link, useHistory, Redirect } from "react-router-dom";

export default function navbar({ reFetch, setJobs, getJobs }) {
  return (
    <div className="navbar">
      <div className="nav-left">
        <Link className="home-button" to="/">
          <AiOutlineGlobal className="globe" />
          <span className="home-bottom">HuntRecruiter©</span>
        </Link>
      </div>
      <div className="nav-right">
        <div>
          <Link to="/postjob">
            <button>Post a Job</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
