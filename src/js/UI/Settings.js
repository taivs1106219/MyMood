import React from "react";
import * as cn from "classnames";

import MenuButton from "./MenuButton";

const bg_colors = [
  "#ffffff",
  "#ffcccc",
  "#ffffcc",
  "#ccffcc",
  "#ccffff",
  "#ccccff",
  "#ffccff",
];

const front_colors = [
  "#ffffff",
  "#ff5050",
  "#ffff00",
  "#33cc33",
  "#33cccc",
  "#3366ff",
  "#ff00ff",
];

function Settings() {
  return (
    <>
      <div className="d-flex">
        <MenuButton></MenuButton>
        <h2>設定</h2>
      </div>
      <div>
        <div className="container">
          <div class="input-group flex-nowrap mb-3">
            <span class="input-group-text" id="addon-wrapping">
              暱稱
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="addon-wrapping"
            ></input>
          </div>
          <div className="w-100">
            <div className="input-group d-flex mb-3" role="group">
              <span className="input-group-text">背景顏色</span>
              {bg_colors.map((e) => {
                return (
                  <input
                    className="btn btn-outline-secondary flex-fill"
                    type="button"
                    style={{ backgroundColor: e }}
                    key={e}
                    value={" "}
                  ></input>
                );
              })}
            </div>
            <div className="input-group d-flex" role="group">
              <span className="input-group-text">強調色</span>
              {front_colors.map((e) => {
                return (
                  <input
                    className={
                      e == "#ffffff"
                        ? "btn btn-outline-secondary"
                        : "btn btn-outline-secondary flex-fill"
                    }
                    type="button"
                    style={{ backgroundColor: e }}
                    key={e}
                    value={e == "#ffffff" ? "恢復預設" : " "}
                  ></input>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
