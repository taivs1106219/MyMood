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
import MoodEditorPage from "./js/UI/MoodEditorPage";
import MyPet from "./js/UI/MyPet";

document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById("app"));

let userdata = {};
let config = {};
let petData = {};
let dataPath = "";
function App() {
  const [editorDate, setEditorDate] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [touchFish, setTouchFish] = useState(0);

  return (
    <>
      <div id="winCtrl-bar" className={cn("d-flex", "flex-row-reverse")}>
        <Navbar config={config}></Navbar>
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
      case 3:
        return <MyPet petData={petData} dataPath={dataPath}></MyPet>;
      case 7:
        return <TouchFish touchFish={touchFish}></TouchFish>;
      case 8:
        return <Settings config={config} dataPath={dataPath}></Settings>;
      case 1000:
        return (
          <MoodEditorPage
            setCurrentPage={setCurrentPage}
            date={editorDate}
            userdata={data}
            dataPath={dataPath}
          ></MoodEditorPage>
        );
      default:
        return (
          <Homepage
            page={{ currentPage, setCurrentPage }}
            userdata={userdata}
            dataPath={dataPath}
            config={config}
          ></Homepage>
        );
    }
  }
}

async function main() {
  dataPath = await api.invoke("get-datapath");
  config = JSON.parse(JSON.stringify(await api.invoke("get-config")));
  userdata = JSON.parse(JSON.stringify(await api.invoke("get-userdata")));
  petData = JSON.parse(JSON.stringify(await api.invoke("get-petdata")));
  if (config.darkmode == true) {
    document.body.setAttribute("data-bs-theme", "dark");
  } else {
    document.head.innerHTML += `<link rel="stylesheet" type="text/css" href="${
      dataPath + "/theme.css"
    }"></link>`;
  }
  root.render(<App />);
}

main();
