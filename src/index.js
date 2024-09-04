import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import "../src/scss/style.scss";

import classNames from "classnames";

import bootstrap from "bootstrap";

import { Navbar } from "./js/Navbar";
import icons from "../res/icons/icons";
import Sidebar from "./js/Sidebar";
import Homepage from "./js/Homepage";

document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById("app"));

root.render(<App />);

function App() {
  const [currentPage, setCurrentPage] = useState();
  return (
    <>
      <div
        id="winCtrl-bar"
        className={classNames("d-flex", "flex-row-reverse")}
      >
        <Navbar></Navbar>
      </div>

      <button
        className="btn btn-light"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebar"
      >
        <icons.List></icons.List>
      </button>
      <div id="app-body" className="container">
        <Homepage></Homepage>
      </div>
      <Sidebar></Sidebar>
    </>
  );
}
