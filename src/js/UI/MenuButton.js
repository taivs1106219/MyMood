import React, { useEffect, useState } from "react";
import icons from "../../../res/icons/icons";
import cn from "classnames";

function MenuButton() {
  return (
    <button
      className={cn("btn", "btn-lg", "bg")}
      style={{ border: "0", width: "3rem" }}
      data-bs-toggle="offcanvas"
      data-bs-target="#sidebar"
    >
      <icons.List></icons.List>
    </button>
  );
}

export default MenuButton;
