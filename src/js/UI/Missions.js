import React from "react";
import MenuButton from "./MenuButton";
import cn from "classnames";
import feed from "../../../res/images/feed.png";

const li_classes = ["list-group-item", "row"];

const p_classes = ["d-inline-block", "mb-0"];

const span_classes = ["badge", "rounded-pill"];

function Missions({ missions, setCurrentPage, userdata }) {
  const today = new Date();
  const todayNum = Number(
    `${today.getFullYear()}${
      today.getMonth() + 1 > 9
        ? today.getMonth() + 1
        : "0" + (today.getMonth() + 1)
    }${today.getDate() + 1 > 9 ? today.getDate() : "0" + today.getDate()}`
  );

  function handleMoodEditClick() {
    setCurrentPage(0);
  }
  function handleTouchFishClick() {
    setCurrentPage(7);
  }
  return (
    <div id="main-content" className="autoscroll">
      <div className="d-flex flex w-100">
        <MenuButton></MenuButton>
        <h2 className="flex-fill">每日任務</h2>
        <p className="d-inline-block mb-0 me-2">
          <img style={{ height: "1rem" }} src={feed}></img>飼料：{userdata.SiLiao}
        </p>
      </div>
      <div className="container">
        <ul className="list-group">
          <li className={cn(...li_classes)}>
            <p className={cn(...p_classes, "col-8", "ps-0")}>每日開啟APP</p>
            <p className={cn(...p_classes, "col-2", "mb-0")}>
              <img src={feed} style={{ height: "1rem" }}></img>+7&nbsp;
            </p>
            <StatusBadge completed={missions[todayNum].loggedIn}></StatusBadge>
          </li>
          <li
            className={cn(...li_classes, "list-group-item-action", "w-auto")}
            style={{ width: "auto" }}
            onClick={handleMoodEditClick}
          >
            <p className={cn(...p_classes, "col-8", "ps-0")}>填寫心情筆記</p>
            <p className={cn(...p_classes, "col-2", "mb-0")}>
              <img src={feed} style={{ height: "1rem" }}></img>+14
            </p>
            <StatusBadge
              completed={missions[todayNum].moodEdited}
            ></StatusBadge>
          </li>
          <li
            className={cn(...li_classes, "list-group-item-action", "w-auto")}
            style={{ width: "auto" }}
            onClick={handleTouchFishClick}
          >
            <p className={cn(...p_classes, "col-8", "ps-0")}>摸魚150次</p>
            <p className={cn(...p_classes, "col-2", "mb-0")}>
              <img src={feed} style={{ height: "1rem" }}></img>+6
            </p>
            <StatusBadge
              completed={missions[todayNum].fishTouched}
            ></StatusBadge>
          </li>
        </ul>
      </div>
    </div>
  );
}

function StatusBadge({ completed }) {
  console.log(completed);
  return (
    <span
      className={cn(
        ...span_classes,
        `text-bg-${completed ? "success" : "warning"}`,
        "col-2"
      )}
    >
      {completed ? "已完成" : "進行中"}
    </span>
  );
}

export default Missions;
