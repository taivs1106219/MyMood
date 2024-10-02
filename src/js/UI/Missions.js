import React from "react";
import MenuButton from "./MenuButton";
import cn from "classnames";
import feed from "../../../res/images/feed.png";

const li_classes = ["list-group-item", "row"];

const p_classes = ["d-inline-block", "mb-0"];

const span_classes = ["badge", "rounded-pill"];

function Missions({ missions }) {
  const today = new Date();
  const todayNum = Number(
    `${today.getFullYear()}${
      today.getMonth() + 1 > 9
        ? today.getMonth() + 1
        : "0" + (today.getMonth() + 1)
    }${today.getDate() + 1 > 9 ? today.getDate() : "0" + today.getDate()}`
  );
  return (
    <div id="main-content" className="autoscroll">
      <div className="d-flex">
        <MenuButton></MenuButton>
        <h2>每日任務</h2>
      </div>
      <div className="container">
        <ul className="list-group">
          <li className={cn(...li_classes)}>
            <p className={cn(...p_classes, "col-8")}>每日開啟APP</p>
            <p className={cn(...p_classes, "col-2", "mb-0")}>
              <img src={feed} style={{ height: "1rem" }}></img>+5&nbsp;
            </p>
            <StatusBadge completed={missions[todayNum].loggedIn}></StatusBadge>
          </li>
          <li className={cn(...li_classes)}>
            <p className={cn(...p_classes, "col-8")}>填寫心情筆記</p>
            <p className={cn(...p_classes, "col-2", "mb-0")}>
              <img src={feed} style={{ height: "1rem" }}></img>+10
            </p>
            <StatusBadge
              completed={missions[todayNum].moodEdited}
            ></StatusBadge>
          </li>
          <li className={cn(...li_classes)}>
            <p className={cn(...p_classes, "col-8")}>摸魚500次</p>
            <p className={cn(...p_classes, "col-2", "mb-0")}>
              <img src={feed} style={{ height: "1rem" }}></img>+5
            </p>
            <StatusBadge completed={false}></StatusBadge>
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
