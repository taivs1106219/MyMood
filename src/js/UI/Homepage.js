import React, { useState, useEffect } from "react";
import MenuButton from "./MenuButton";
import zanghu from "../../../res/images/zanghu.png";
import cn from "classnames";
import MoodEditor from "./MoodEditor";
import MissionCompletedAlert from "./MissionCompleted";
import view_MoodNote from "../../../res/images/buttons_v2/view_MoodNote.png";
import MainModal from "./SetupWizard/MainModal";

function Homepage({ page, userdata, dataPath, config, missions }) {
  const [showMissionCompleted, setShowMissionCompleted] = useState(0);
  const [showSetupWizard, setShowSetupWizard] = useState(false);

  if (!config.setupCompleted && !showSetupWizard) {
    setShowSetupWizard(true);
  }

  const today = new Date();

  const chartData = {
    type: "line",
    data: {
      labels: ["0", "0", "0", "0", "0"],
      datasets: [
        {
          label: "心情指數",
          data: [50, 60, 70, 180, 190],
          fill: false,
          borderColor: "blue",
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "近五日心情指數",
        },
      },
      scales: {
        y: {
          min: 0,
          max: 5,
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  };
  if (config.darkmode) {
    chartData.options.scales.y.grid = { color: "rgb(255,255,255)" };
    chartData.options.scales.x = {
      grid: {
        color: "rgb(255,255,255)",
      },
    };
    chartData.data.datasets[0].borderColor = "rgb(13,202,240)";
  }
  const firstDay = new Date(today);
  firstDay.setDate(firstDay.getDate() - 5);
  for (let i = 0; i < 5; i++) {
    const tmpDate = new Date(firstDay);
    // 記錄第一天為暫存
    tmpDate.setDate(tmpDate.getDate() + i);
    // 加上偏移量
    const currentDate = tmpDate.getDate();
    // 當日日期
    const currentDateString = `${tmpDate.getFullYear()}${
      tmpDate.getMonth() + 1 > 9
        ? tmpDate.getMonth() + 1
        : "0" + (tmpDate.getMonth() + 1)
    }${tmpDate.getDate()}`;
    // 日期字串
    chartData.data.labels[i] = currentDate + " 日";
    // 設置日期
    chartData.data.datasets[0].data[i] =
      userdata[currentDateString] == undefined
        ? undefined
        : userdata[currentDateString].moodVal;
    // 設置心情制5
  }
  const dateNum = Number(
    `${today.getFullYear()}${
      today.getMonth() + 1 > 9
        ? today.getMonth() + 1
        : "0" + (today.getMonth() + 1)
    }${today.getDate() + 1 > 9 ? today.getDate() : "0" + today.getDate()}`
  );

  if (userdata.SiLiao == undefined) {
    Object.assign(userdata, { SiLiao: 0 });
  }
  if (missions[dateNum] == undefined) {
    Object.assign(missions, {
      [dateNum]: { loggedIn: true, moodEdited: false },
    });
    userdata.SiLiao += 7;
    setShowMissionCompleted(1);
  }

  console.log(userdata);

  api.send("write-file", [
    dataPath + "/userdata.json",
    JSON.stringify(userdata, null, 2),
  ]);

  api.send("write-file", [
    dataPath + "/missions.json",
    JSON.stringify(missions, null, 2),
  ]);

  return (
    <div className="autoscroll" id="main-content">
      <div className="d-flex">
        <MenuButton></MenuButton>
        <h2>首頁</h2>
      </div>
      {/* <button onClick={() => setShowSetupWizard(true)}>測試</button> */}
      <div className="container">
        {showMissionCompleted ? (
          <MissionCompletedAlert
            missionName="每日開啟APP"
            feedsGet="7"
          ></MissionCompletedAlert>
        ) : null}
        <div className="row justify-content-center">
          <div className="col-6">
            <img src={zanghu} className="p-2" style={{ width: "100%" }}></img>
          </div>
        </div>
        <div className="row mb-3">
          <MoodEditor
            date={today}
            userdata={userdata}
            dataPath={dataPath}
            missions={missions}
          ></MoodEditor>
        </div>
        <div className={cn("row", "mb-3", "justify-content-center")}>
          <div className="col-5">
            <button
              className="btn w-100 rounded-pill"
              onClick={handleMCalendarClick}
            >
              <img
                className="w-100"
                src={view_MoodNote}
                alt="查看心情日記"
              ></img>
            </button>
          </div>
        </div>
        <div className="row">
          <div className="card">
            <div className="card-body">
              {/* <h1 className="display-1">折綫圖</h1> */}
              <img
                src={
                  "https://quickchart.io/chart?v=4&c=" +
                  encodeURI(JSON.stringify(chartData))
                }
                alt="連網以查看折線圖"
                className="w-100"
              ></img>
            </div>
          </div>
        </div>
      </div>
      <MainModal
        showSetupWizard={{
          get: () => {
            return showSetupWizard;
          },
          set: setShowSetupWizard,
        }}
        config={config}
        dataPath={dataPath}
      ></MainModal>
    </div>
  );
  function handleMCalendarClick() {
    page.setCurrentPage(1);
  }
}

export default Homepage;
