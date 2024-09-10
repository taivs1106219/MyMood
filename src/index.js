import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import "../src/scss/style.scss";

import * as cn from "classnames";

import bootstrap from "bootstrap";

import { Navbar } from "./js/Navbar";
import icons from "../res/icons/icons";
import Sidebar from "./js/Sidebar";
import Homepage from "./js/UI/Homepage";
import MoodCalendar from "./js/UI/MoodCalendar";
import TouchFish from "./js/UI/TouchFish";
import Settings from "./js/UI/Settings";

document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById("app"));

root.render(<App />);

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchFish, setTouchFish] = useState(0);
  return (
    <>
      <div id="winCtrl-bar" className={cn("d-flex", "flex-row-reverse")}>
        <Navbar></Navbar>
      </div>

      <PageContent
        pagenum={currentPage}
        touchFish={{ touchFish, setTouchFish }}
      ></PageContent>

      <Sidebar
        page={{
          getCurrentPage: currentPage,
          setCurrentPage: setCurrentPage,
        }}
      ></Sidebar>
    </>
  );
  function PageContent({ pagenum, touchFish }) {
    switch (pagenum) {
      case 1:
        return <MoodCalendar></MoodCalendar>;
        break;
      case 6:
        return <TouchFish touchFish={touchFish}></TouchFish>;
        break;
      case 7:
        return <Settings></Settings>;
        break;
      default:
        return <Homepage page={{ currentPage, setCurrentPage }}></Homepage>;
        break;
    }
  }
}
