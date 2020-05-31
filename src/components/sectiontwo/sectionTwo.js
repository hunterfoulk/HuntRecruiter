import React from "react";
import Interview from "../images/interview.svg";
import Stars from "../images/stars.png";
import "./section.scss";

export default function SectionTwo() {
  return (
    <div className="section-two-main">
      <div className="section-two-left">
        <div>
          <img src={Stars} />
          <h1>#1 Rated Job Search Website </h1>
          <span>
            Apply to jobs anytime, anywhere and get notified instantly when your
            application is reviewed.
          </span>
        </div>
      </div>
    </div>
  );
}
