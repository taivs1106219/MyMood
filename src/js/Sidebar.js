import React, { useState } from "react";
import bootstrap from "bootstrap";

const sidebarItems = ["首頁", "心情日曆","心情不好？來摸魚吧！", "設定"];

function Sidebar() {
  const [activeItem, setActiveItem] = useState(0);
  return (
    <>
      <div
        className="offcanvas offcanvas-start"
        tabIndex={-1}
        id="sidebar"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            MyMood
          </h5>
        </div>
        <div className="offcanvas-body">
          <ul className="list-group">
            {sidebarItems.map((element, index) => {
              console.log(element);
              const className =
                activeItem == index
                  ? "list-group-item active"
                  : "list-group-item";
              return (
                <li className={className} onClick={() => handleClick(index)}>
                  {element}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
  function handleClick(index) {
    setActiveItem(index);
  }
}

export default Sidebar;
