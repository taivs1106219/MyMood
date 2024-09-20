import React, { useState } from "react";
import fish_brown from "../../../res/images/fish_brown.png";
import cn from "classnames";
import MenuButton from "./MenuButton";

function TouchFish({ touchFish }) {
  return (
    <div>
      <div className={cn("d-flex", "pe-3", "user-select-none")}>
        <MenuButton></MenuButton>
        <p className="flex-fill h2">心情不好？來摸魚吧！</p>
        <p
          className={cn("flex-fill", "text-end", "h2")}
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          您已經摸魚 {touchFish.touchFish} 下
        </p>
      </div>
      <div className="px-3">
        <button
          onClick={handleClick}
          className={cn("w-100", "btn", "btn-light","bg")}
        >
          <img src={fish_brown} draggable="false" className="w-100"></img>
        </button>
      </div>
    </div>
  );
  function handleClick() {
    touchFish.setTouchFish(touchFish.touchFish + 1);
  }
}

export default TouchFish;
