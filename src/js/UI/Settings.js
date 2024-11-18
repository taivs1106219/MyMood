import React, { useState, useEffect } from "react";
import cn from "classnames";

import MenuButton from "./MenuButton";
import bg_css from "../../scss/themes/background";
import BackupModal from "./Backup/BackupModal";

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
  if (config.openai_key == undefined) {
    Object.assign(config, { openai_key: "" });
    api.send("write-file", [
      dataPath + "/config.json",
      JSON.stringify(config, null, 2),
    ]);
  }

  const [username, setUsername] = useState(config.nickname);
  const [showRestartAlert, setShowRestartAlert] = useState(false);
  const [darkMode, setDarkMode] = useState(config.darkmode);
  const [OAIKey, setOAIKey] = useState(config.openai_key);

  function handleClick() {
    api.send("write-file", [
      dataPath + "/config.json",
      JSON.stringify(config, null, 2),
    ]);
    setShowRestartAlert(true);
    api.send("write-file", [dataPath + "/theme.css", bg_css(config.bg_color)]);
  }
  function handleRestartRequest() {
    console.log("restarting");
    api.send("restart-app");
  }
  function handleChange(e) {
    setShowRestartAlert(true);
    setDarkMode(e.target.checked);
    config.darkmode = e.target.checked;
    api.send("write-file", [
      dataPath + "/config.json",
      JSON.stringify(config, null, 2),
    ]);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      config.nickname = username;
      api.send("write-file", [
        dataPath + "/config.json",
        JSON.stringify(config, null, 2),
      ]);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [username]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      config.openai_key = OAIKey;
      api.send("write-file", [
        dataPath + "/config.json",
        JSON.stringify(config, null, 2),
      ]);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [OAIKey]);

  return (
    <>
      <div className="d-flex">
        <MenuButton></MenuButton>
        <h2>設定</h2>
      </div>
      <div>
        <div className="container">
          {showRestartAlert ? (
            <div className="alert alert-info alert-dismissible" role="alert">
              <a onClick={handleRestartRequest} className="alert-link">
                重新啟動&nbsp;APP
              </a>
              &nbsp;以套用變更
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          ) : null}
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <div className="w-100">
            <div className="card mb-3">
              <div className="card-body py-2 px-2 row">
                <div className="col-12">
                  <div class="form-check form-switch d-flex flex-row-reverse justify-content-between ps-1">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckReverse"
                      onChange={(e) => handleChange(e)}
                      checked={darkMode}
                    ></input>
                    <label
                      class="form-check-label flex-fill"
                      htmlFor="flexSwitchCheckReverse"
                    >
                      深色模式
                    </label>
                  </div>
                </div>
                <div className="col-12 ">
                  <p className="text-warning ps-1 mb-0">
                    <ins>此設定開啟時，其他主題將不會生效</ins>
                  </p>
                </div>
              </div>
            </div>

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
            <div className="input-group d-flex mb-3" role="group">
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
            <div className="card mb-3">
              <div className="card-body">
                <p className="mb-2">
                  OpenAI API Key<br></br>
                  <ins>僅用於 AI 建議</ins>
                </p>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="填入 OpenAI 的 API Key"
                    aria-label=""
                    aria-describedby="basic-addon1"
                    value={OAIKey}
                    onChange={(e) => setOAIKey(e.target.value)}
                  ></input>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column">
                  <p className="h3">匯出/匯入資料</p>
                  <div className="w-100 d-flex">
                    <button
                      className={cn(
                        "flex-grow-1",
                        "btn",
                        "btn-primary",
                        "me-1"
                      )}
                      data-bs-toggle="modal"
                      data-bs-target="#backup-modal"
                    >
                      匯出
                    </button>
                    <button
                      className={cn(
                        "flex-grow-1",
                        "btn",
                        "btn-secondary",
                        "ms-1"
                      )}
                    >
                      匯入
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackupModal.BackupModal
      ></BackupModal.BackupModal>
      <BackupModal.BackupSuccessModal></BackupModal.BackupSuccessModal>
    </>
  );
}

export default Settings;
