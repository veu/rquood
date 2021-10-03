import React from "react";
import { TITLE_URL } from "../config";
import BackLink from "./BackLink";

function About() {
  return (
    <>
      <div className="menu">
        <div className="menu__block">
          <div className="message">Quood Version 2.0.0</div>
          <div className="message">By Rebecca König</div>
        </div>
        <div className="menu__block">
          <div className="message">
            <a href="https://github.com/veu/rquood">Source Code</a>
          </div>
        </div>
      </div>
      <div className="main-menu">
        <div className="main-menu__action">
          <BackLink to={TITLE_URL} />
        </div>
        <div className="main-menu__action main-menu__action_inactive" />
      </div>
    </>
  );
}

export default About;
