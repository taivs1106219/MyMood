import React,{useState} from "react";
import { Button } from "react-bootstrap";
import cn from "classnames";

function P102({ contentControl, config, dataPath }) {
  const bg_colors = [
    "#ffffff",
    "#ffcccc",
    "#ffffcc",
    "#ccffcc",
    "#ccffff",
    "#ccccff",
    "#ffccff",
  ];

  const [darkMode, setDarkMode] = useState(config.darkmode);
  function handleChange(e) {
    // setShowRestartAlert(true);
    setDarkMode(e.target.checked);
    config.darkmode = e.target.checked;
    api.send("write-file", [
      dataPath + "/config.json",
      JSON.stringify(config, null, 2),
    ]);
  }
  function handleClick() {
    api.send("write-file", [
      dataPath + "/config.json",
      JSON.stringify(config, null, 2),
    ]);
    // setShowRestartAlert(true);
    api.send("write-file", [dataPath + "/theme.css", bg_css(config.bg_color)]);
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="w-100">
        <p className="h3">個性化您的 MyMood</p>
      </div>
      <div className="w-75 d-flex flex-column mb-3">
        <div className="card mb-2">
          <div className="card-body">
            <h5 className="card-title">背景顏色</h5>
            <div className={cn("btn-group", "d-flex", "mb-3")} role="group">
              {bg_colors.map((e) => {
                return (
                  <a
                    className={cn("btn", "btn-outline-secondary", "flex-fill")}
                    type="button"
                    style={{ backgroundColor: e }}
                    key={e}
                    value={" "}
                    onClick={() => {
                      config.bg_color = e;
                      handleClick();
                    }}
                  ></a>
                );
              })}
            </div>
          </div>
        </div>
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
                  class="form-check-label flex-fill h5"
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
      </div>
      <div className="d-flex justify-content-between w-100">
        <Button variant="secondary" onClick={() => contentControl.set(101)}>
          上一步
        </Button>
        <Button variant="primary" onClick={() => contentControl.set(103)}>
          下一步
        </Button>
      </div>
    </div>
  );
}

export default P102;
