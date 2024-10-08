import classNames from "classnames";
import React from "react";

import icons from "../../res/icons/icons";
import logo_black from "../../res/images/logo_black.png";
import logo_white from "../../res/images/logo_white.png";

export function Navbar(props) {
  const config = props.config
  function handleClick() {
    api.send("get-devices-v2", "adb");
    api.send("get-devices-v2", "fb");
  }
  return (
    <>
      <button
        id="close-btn"
        className="winCtrl-btn border-0 btn"
        onClick={() => api.send("close-window")}
      >
        <icons.X_lg></icons.X_lg>
      </button>
      <button
        id="max-btn"
        className="winCtrl-btn border-0 btn"
        onClick={() => api.send("maximize-window")}
      >
        <icons.App></icons.App>
      </button>
      <button
        id="min-btn"
        className="winCtrl-btn border-0 btn"
        onClick={() => api.send("minimize-window")}
      >
        <icons.Dash_lg></icons.Dash_lg>
      </button>
      <div
        className={classNames(
          "m-1",
          "flex-fill",
          "d-flex",
          "align-items-center"
        )}
      >
        <img
          src={config.darkmode ? logo_white : logo_black}
          alt="MyMood"
          className="h-100"
        ></img>
      </div>
    </>
  );
}
