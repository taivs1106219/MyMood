import React, { useState } from "react";
import fish from "../../../res/images/fish.png";
import * as cn from "classnames";
import MenuButton from "./MenuButton";

function TouchFish({touchFish}) {
  
  return (
    <div className="p-3">
      <div className="d-flex">
        <MenuButton></MenuButton>
        <p className="flex-fill h2">心情不好？來摸魚吧！</p>
        <p className={cn("flex-fill", "text-end", "h2")}>
          您已經摸魚 {touchFish.touchFish} 下
        </p>
      </div>
      <button onClick={handleClick} className={cn("w-100", "btn", "btn-light")}>
        <img src={fish} className="w-100"></img>
      </button>
    </div>
  );
  function handleClick() {
    touchFish.setTouchFish(touchFish.touchFish + 1);
  }
}



export default TouchFish;
