import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/navbar/navbar";
import Homepage from "./components/homepage/homepage";
import PostJob from "./components/postjob/postjob";
import Listings from "./components/listings/listings";
import SectionTwo from "./components/sections/sectionTwo";
import SectionThree from "./components/sections/sectionThree";
import Footer from "./components/footer/footer";
import Apply from "./components/apply/apply";
import JobModal from "./components/modal/jobModal";
import axios from "axios";
import { Link, useHistory, Redirect } from "react-router-dom";

function App() {
  const [jobs, setJobs] = useState([]);
  const history = useHistory();
  const [content, setContent] = useState([]);
  const [jobApps, setJobApps] = useState([]);


  const getJobs = async () => {

    try {
      const response = await fetch("http://localhost:5000/recruiter/jobs");
      const jsonData = await response.json();

      setJobs(jsonData);

      console.log("jobs", jsonData);

    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSearchValue = async (e) => {
    if (e.target.value !== "") {
      let filteredData = jobs.filter(
        (job) =>
          job.title?.toLowerCase().includes(e.target.value.toLowerCase()) ||
          job.city?.toLowerCase().includes(e.target.value.toLowerCase())
      );

      setJobs(filteredData);

      console.log("filtered jobs", filteredData);
    } else if (e.target.value === "") {
      getJobs();
    } else {
      getJobs();
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const reFetch = () => {
    getJobs();
  };

  const switchFunction = (type) => {
    switch (type) {
      case "healthcare":
        setJobs((prevJobs) =>
          prevJobs.filter((item) => item.title.indexOf("types"))
        );

        break;
      case "warehouse":
        setJobs((prevJobs) =>
          prevJobs.filter((item) => item.title.includes("Warehouse"))
        );

        break;
      case "retail":
        setJobs((prevJobs) =>
          prevJobs.filter((item) => item.title.includes("Retail"))
        );

        break;
      case "software":
        setJobs((prevJobs) =>
          prevJobs.filter(
            (item) =>
              item.title.includes("Software") ||
              item.title.includes("Developer")
          )
        );

        break;

      default:
        break;
    }
  };

  return (
    <Router>
      <div className="app">
        {/* HOME ROUTE */}
        <Navbar setJobs={setJobs} reFetch={reFetch} />
        <Route
          exact
          path="/"
          render={() => (
            <>
              <Homepage
                handleSearchValue={handleSearchValue}
                getJobs={getJobs}
                setJobs={setJobs}
                switchFunction={switchFunction}
              />
              <SectionTwo />
              <SectionThree />
            </>
          )}
        ></Route>

        {/* POST JOB ROUTE */}
        <Route
          exact
          path="/postjob"
          render={() => (
            <>
              <PostJob />
            </>
          )}
        ></Route>

        {/* JOB LISTINGS ROUTE */}
        <Route
          exact
          path="/listings"
          render={() => (
            <>
              <Listings
                getJobs={getJobs}
                setJobs={setJobs}
                jobs={jobs}
                setContent={setContent}
                content={content}
                setJobApps={setJobApps}
              />
              {/* <JobModal setJobsApps={setJobsApps} jobApps={jobApps} /> */}
            </>
          )}
        ></Route>

        {/* APPLY ROUTE */}
        <Route
          exact
          path="/apply"
          render={() => <Apply setJobApps={setJobApps} jobApps={jobApps} />}
        ></Route>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
