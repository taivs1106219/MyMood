import React, { useEffect, useState } from "react";
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
import { data } from "autoprefixer";
import MoodEditor from "./js/UI/MoodEditor";

document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById("app"));

let userdata = {};
let config = {};
let dataPath = "";
function App() {
  const [editorDate,setEditorDate]=useState(0)
  const [currentPage, setCurrentPage] = useState(0);
  const [touchFish, setTouchFish] = useState(0);

  document.body.style.backgroundColor = config.bg_color;
  console.log(dataPath);
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
        return (
          <MoodCalendar
            userdata={userdata}
            currentPage={{ currentPage, setCurrentPage }}
            setEditorDate={setEditorDate}
          ></MoodCalendar>
        );
        break;
      case 6:
        return <TouchFish touchFish={touchFish}></TouchFish>;
        break;
      case 7:
        return <Settings config={config} dataPath={dataPath}></Settings>;
        break;
      case 1000:
        return<MoodEditor date={editorDate} userdata={userdata} dataPath={dataPath}></MoodEditor>
      default:
        return (
          <Homepage
            page={{ currentPage, setCurrentPage }}
            userdata={userdata}
            dataPath={dataPath}
          ></Homepage>
        );
        break;
    }
  }
}

async function main() {
  dataPath = await api.invoke("get-datapath");
  config = JSON.parse(JSON.stringify(await api.invoke("get-config")));
  userdata = JSON.parse(JSON.stringify(await api.invoke("get-userdata")));

  root.render(<App />);
}

main();
