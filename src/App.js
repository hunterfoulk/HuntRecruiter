import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/navbar/navbar";
import Homepage from "./components/homepage/homepage";
import PostJob from "./components/postjob/postjob";
import Listings from "./components/listings/listings";
import SectionTwo from "./components/sectiontwo/sectionTwo";
import axios from "axios";
import { Link, useHistory, Redirect } from "react-router-dom";
import { withRouter } from "react-router";

function App() {
  const [jobs, setJobs] = useState([]);
  const history = useHistory();

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

  const reRoute = () => {
    history.push("/listings");
  };

  const switchFunction = (type) => {
    switch (type) {
      case "healthcare":
        setJobs((prevJobs) =>
          prevJobs.filter((item) => item.title.includes("Healthcare"))
        );

        break;
      case "warehouse":
        console.log("warehouse");
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
          prevJobs.filter((item) => item.title.includes("Software"))
        );

        break;

      default:
        break;
    }
  };

  return (
    <Router>
      {/* HOME ROUTE */}
      <Route
        exact
        path="/"
        render={() => (
          <>
            <Navbar setJobs={setJobs} reFetch={reFetch} />
            <Homepage
              handleSearchValue={handleSearchValue}
              getJobs={getJobs}
              setJobs={setJobs}
              switchFunction={switchFunction}
            />
            <SectionTwo />
          </>
        )}
      ></Route>

      {/* POST JOB ROUTE */}
      <Route
        exact
        path="/postjob"
        render={() => (
          <>
            <Navbar />
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
            <Navbar />
            <Listings getJobs={getJobs} setJobs={setJobs} jobs={jobs} />
          </>
        )}
      ></Route>
    </Router>
  );
}

export default App;
