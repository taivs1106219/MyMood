import React, { useState, useEffect } from "react";
import cn from "classnames";

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

function Settings({ config, dataPath }) {
  const [username, setUsername] = useState("");
  function handleClick() {
    api.send("write-file", [
      dataPath + "/config.json",
      JSON.stringify(config, null, 2),
    ]);
  }
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(username);
      config.nickname = username;
      api.send("write-file", [
        dataPath + "/config.json",
        JSON.stringify(config, null, 2),
      ]);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [username]);
  return (
    <>
      <div className="d-flex">
        <MenuButton></MenuButton>
        <h2>設定</h2>
      </div>
      <div>
        <div className="container">
          <div className={cn("input-group", "flex-nowrap", "mb-3")}>
            <span className="input-group-text" id="addon-wrapping">
              輸入用戶名
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="w-100">
            <div className={cn("input-group", "d-flex", "mb-3")} role="group">
              <span className="input-group-text">背景顏色</span>
              {bg_colors.map((e) => {
                return (
                  <input
                    className={cn("btn", "btn-outline-secondary", "flex-fill")}
                    type="button"
                    style={{ backgroundColor: e }}
                    key={e}
                    value={" "}
                    onClick={() => {
                      config.bg_color = e;
                      handleClick();
                    }}
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
                    onClick={() => {
                      config.front_color = e;
                      handleClick();
                    }}
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
