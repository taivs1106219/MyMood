import React, { useState, useEffect } from "react";
import MenuButton from "./MenuButton";
import zanghu from "../../../res/images/zanghu.jpg";
import cn from "classnames";
import MoodEditor from "./MoodEditor";

const today = new Date();

function Homepage({ page, userdata, dataPath }) {
  console.log(dataPath)
  return (
    <>
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
              <h1 className="display-1">折綫圖</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  function handleMCalendarClick() {
    page.setCurrentPage(1);
  }
}

export default Homepage;
