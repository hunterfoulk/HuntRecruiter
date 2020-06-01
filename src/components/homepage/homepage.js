import React, { useState } from "react";
import "./homepage.scss";
import { MdSearch } from "react-icons/md";
import { Link, useHistory, Redirect } from "react-router-dom";
import Listings from "../listings/listings";

export default function Homepage({
  handleSearchValue,
  jobs,
  setJobs,
  getJobs,
  switchFunction,
}) {
  return (
    <div className="home-main">
      <div className="header">
        <h1>Find Jobs For You</h1>
        <span>Any industry. Any location. Any experience level.</span>
      </div>
      <div className="input-search">
        <form>
          <input
            onChange={handleSearchValue}
            className="input-one"
            placeholder="Job title or keyword"
          ></input>
          <input
            className="input-two"
            placeholder="City or State"
            onChange={handleSearchValue}
          ></input>
        </form>
        <Link to="/listings">
          <button>Find Jobs</button>
        </Link>
      </div>
      <div className="filters">
        <Link to="/listings">
          <button>
            <MdSearch className="search" />
            all jobs
          </button>
        </Link>
        <Link to="/listings">
          <button
            name="healthcare"
            onClick={(e) => switchFunction(e.target.name)}
          >
            <MdSearch className="search" />
            healthcare jobs
          </button>
        </Link>
        <Link to="/listings">
          <button
            name="software"
            onClick={(e) => switchFunction(e.target.name)}
          >
            <MdSearch className="search" />
            software jobs
          </button>
        </Link>
        <Link to="/listings">
          <button name="retail" onClick={(e) => switchFunction(e.target.name)}>
            <MdSearch className="search" />
            retail jobs
          </button>
        </Link>
        <Link to="/listings">
          <button
            name="warehouse"
            onClick={(e) => switchFunction(e.target.name)}
          >
            <MdSearch className="search" />
            warehouse jobs
          </button>
        </Link>
        <Link to="/listings">
          <button
            name="delivery"
            onClick={(e) => switchFunction(e.target.name)}
          >
            <MdSearch className="search" />
            delivery jobs
          </button>
        </Link>
      </div>
    </div>
  );
}
