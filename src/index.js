import React from "react";
import { createRoot } from "react-dom/client";

import "../src/scss/style.scss"

document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById("app"));

root.render(<App />);

function App(){
  return(<>
  <div id="winCtrl-bar">

  </div>
  <button className="btn btn-primary">test</button>
  </>)
}