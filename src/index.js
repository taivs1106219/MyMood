import React from "react";
import { createRoot } from "react-dom/client";

import "../src/scss/style.scss"

import classNames from "classnames";

import { Navbar } from "./js/Navbar";

document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById("app"));

root.render(<App />);

function App(){
  return (
    <>
      <div
        id="winCtrl-bar"
        className={classNames("d-flex", "flex-row-reverse")}
      >
        <Navbar></Navbar>
      </div>
      <button className="btn btn-primary">test</button>
    </>
  );
}