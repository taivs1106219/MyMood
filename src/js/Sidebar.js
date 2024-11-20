import React, { useState } from "react";
import bootstrap from "bootstrap";

import cn from "classnames";

const sidebarItems = [
  "首頁",
  "心情日記",
  "答題",
  "我的寵物",
  "每日任務",
  "AI的建議",
  "今天整了些啥",
  "心情不好？來摸魚吧！",
  "設定與個人化",
];

function Sidebar(props) {
  const page = props.page;
  // const [activeItem, setActiveItem] = useState(0);
  const activeItem = page.getCurrentPage;
  const setActiveItem = () => page.setCurrentPage;
  return (
    <>
      <div
        className="offcanvas offcanvas-start bg"
        tabIndex={-1}
        id="sidebar"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            MyMood
          </h5>
        </div>
        <div className="offcanvas-body px-0">
          <ul className="list-group list-group-flush">
            {sidebarItems.map((element, index) => {
              // const className =
              //   activeItem == index
              //     ? "list-group-item list-group-item-action list-group-flush active"
              //     : "list-group-item list-group-item-action";
              return (
                <li
                  className={cn(
                    "list-group-item",
                    "list-group-item-action",
                    "bg",
                    activeItem == index ? "active" : null
                  )}
                  onClick={() => handleClick(index)}
                  key={index}
                >
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
    page.setCurrentPage(index);
  }
}

export default Sidebar;
