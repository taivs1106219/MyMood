import React, { useEffect, useState,  createContext } from "react";
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
import MoodEditor from "./js/UI/MoodEditor";
import MoodEditorPage from "./js/UI/MoodEditorPage";
import MyPet from "./js/UI/MyPet";
import Missions from "./js/UI/Missions";
import Examination from "./js/UI/Examination";
import AskAI from "./js/UI/AskAI";

document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById("app"));
const ThemeContext = createContext(null);

let userdata = {};
let config = {};
let petData = {};
let dataPath = "";
let missions = {};
let examinationData = {};

function App() {
  const [editorDate, setEditorDate] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [touchFish, setTouchFish] = useState(0);
  const [touchFishMission, setTouchFishMission] = useState(0);
  const [darkmode, setDarkmode] = useState(config.darkmode);

  return (
    <ThemeContext.Provider darkmode={darkmode}>
      <div id="winCtrl-bar" className={cn("d-flex", "flex-row-reverse")}>
        <Navbar config={config}></Navbar>
      </div>

      <PageContent
        pagenum={currentPage}
        touchFish={{ touchFish, setTouchFish }}
        touchFishMission={{ touchFishMission, setTouchFishMission }}
      ></PageContent>

      <Sidebar
        page={{
          getCurrentPage: currentPage,
          setCurrentPage: setCurrentPage,
        }}
      ></Sidebar>
    </ThemeContext.Provider>
  );
  function PageContent({ pagenum, touchFish, touchFishMission }) {
    switch (pagenum) {
      case 1:
        return (
          <MoodCalendar
            userdata={userdata}
            currentPage={{ currentPage, setCurrentPage }}
            setEditorDate={setEditorDate}
          ></MoodCalendar>
        );
      case 2:
        return (
          <Examination
            examinationData={examinationData}
            dataPath={dataPath}
            ThemeContext={ThemeContext}
          ></Examination>
        );
      case 3:
        return (
          <MyPet
            petData={petData}
            dataPath={dataPath}
            config={config}
            userdata={userdata}
          ></MyPet>
        );
      case 4:
        return (
          <Missions
            missions={missions}
            setCurrentPage={setCurrentPage}
            userdata={userdata}
          ></Missions>
        );
      case 5:
        return (
          <AskAI
          ></AskAI>
        );
      case 7:
        return (
          <TouchFish
            touchFish={touchFish}
            missions={missions}
            userdata={userdata}
            dataPath={dataPath}
            touchFishMission={touchFishMission}
            ThemeContext={ThemeContext}
            config={config}
          ></TouchFish>
        );
      case 8:
        return <Settings config={config} dataPath={dataPath}></Settings>;
      case 1000:
        return (
          <MoodEditorPage
            setCurrentPage={setCurrentPage}
            date={editorDate}
            userdata={userdata}
            dataPath={dataPath}
            missions={missions}
          ></MoodEditorPage>
        );
      default:
        return (
          <Homepage
            page={{ currentPage, setCurrentPage }}
            userdata={userdata}
            dataPath={dataPath}
            config={config}
            missions={missions}
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
  missions = JSON.parse(JSON.stringify(await api.invoke("get-missions")));
  examinationData = JSON.parse(
    JSON.stringify(await api.invoke("get-examinationData"))
  );

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
