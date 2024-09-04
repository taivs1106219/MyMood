import React from "react";
import MenuButton from "./MenuButton";
import * as cn from "classnames";

function MoodCalendar() {
  const today = new Date();

  const todayString =
    today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate();
  return (
    <>
      <div className="d-flex">
        <MenuButton></MenuButton>
        <h2>心情日曆</h2>
      </div>
      <div className="px-3">
        <div className={cn("d-grid", "gap-2", " col-4", "mx-auto")}>
          <div className="input-group input-group-lg">
            <span className="input-group-text">選擇日期</span>
            <input
              id="mood-calendar-date-select"
              className="form-control"
              style={{ fontVariantNumeric: "tabular-nums" }}
              value={todayString}
              type="date"
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}

export default MoodCalendar;
