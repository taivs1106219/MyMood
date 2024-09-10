import React from "react";
import * as cn from "classnames";

import MenuButton from "./MenuButton";

function Settings() {
  return (
    <>
      <div className="d-flex">
        <MenuButton></MenuButton>
        <h2>設定</h2>
      </div>
      <div>
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">
            昵稱
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="addon-wrapping"
          ></input>
        </div>
      </div>
    </>
  );
}

export default Settings;
