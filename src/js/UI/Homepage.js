import React, { useState, useEffect } from "react";
import MenuButton from "./MenuButton";
import zanghu from "../../../res/images/zanghu.jpg";
import cn from "classnames";
import MoodEditor from "./MoodEditor";
import { data } from "autoprefixer";

function Homepage({ page, userdata, dataPath }) {
  const today = new Date();

  const chartData = {
    type: "line",
    data: {
      labels: ["0","0","0","0","0"],
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
      title: {
        display: true,
        text: "近五日心情指數",
      },
    },
  };
  const firstDay = new Date(today);
  firstDay.setDate(firstDay.getDate() - 5);
  for (let i = 0; i < 5; i++) {
    const tmpDay = new Date(firstDay);
    tmpDay.setDate(tmpDay.getDate() + i);
    chartData.data.labels[i] = tmpDay.getDate();
  }
  console.log(firstDay);
  console.log(
    "https://quickchart.io/chart?c=" + encodeURI(JSON.stringify(chartData))
  );
  return (
    <div className="autoscroll" id="main-content">
      <div className="d-flex">
        <MenuButton></MenuButton>
        <h2>首頁</h2>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6">
            <img
              src={zanghu}
              className="p-2 rounded-circle"
              style={{ width: "100%" }}
            ></img>
          </div>
        </div>
        <div className="row mb-3">
          <MoodEditor
            date={today}
            userdata={userdata}
            dataPath={dataPath}
          ></MoodEditor>
        </div>
        <div className={cn("row", "mb-3", "justify-content-center")}>
          <div className="col-4">
            <button
              className="btn btn-lg btn-info"
              onClick={handleMCalendarClick}
            >
              查看心情日記
            </button>
          </div>
        </div>
        <div className="row">
          <div className="card">
            <div className="card-body">
              {/* <h1 className="display-1">折綫圖</h1> */}
              <img
                src={
                  "https://quickchart.io/chart?c=" +
                  encodeURI(JSON.stringify(chartData))
                }
                className="w-100"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  function handleMCalendarClick() {
    page.setCurrentPage(1);
  }
}

export default Homepage;
