import React, { useContext, useState } from "react";
import fish_brown from "../../../res/images/fish_brown.png";
import fish_cyan from "../../../res/images/fish_cyan.png";
import fish_purple from "../../../res/images/fish_purple.png";
import cn from "classnames";
import MenuButton from "./MenuButton";
import MissionCompletedAlert from "./MissionCompleted";
import getDateNum from "../getDateNum";

function TouchFish({
  touchFish,
  missions,
  userdata,
  dataPath,
  touchFishMission,
  ThemeContext,
  config,
}) {
  // const [showMissionCompleted, setShowMissionCompleted] = useState(0);
  const [fish, setFish] = useState(config.fish ? config.fish : "brown");
  const darkmode = useContext(ThemeContext);
  console.log(touchFishMission);
  const todayNum = getDateNum(new Date());
  if (missions[todayNum].fishTouched == undefined) {
    Object.assign(missions[todayNum], {
      fishTouched: false,
      ftCompletedShown: false,
    });
    api.send("write-file", [
      dataPath + "/missions.json",
      JSON.stringify(missions, null, 2),
    ]);
  }
  if (touchFish.touchFish >= 150) {
    if (!missions[todayNum].fishTouched) {
      missions[todayNum].fishTouched = true;
      userdata.SiLiao += 6;

      api.send("write-file", [
        dataPath + "/userdata.json",
        JSON.stringify(userdata, null, 2),
      ]);
      api.send("write-file", [
        dataPath + "/missions.json",
        JSON.stringify(missions, null, 2),
      ]);
      touchFishMission.setTouchFishMission(1);
    }
  }
  function handleFishColor(color) {
    Object.assign(config, { fish: color });
    setFish(color)
    api.send("write-file", [
      dataPath + "/config.json",
      JSON.stringify(config, null, 2),
    ]);
  }

  let fish_img;
  switch(fish){
    case "brown":
      fish_img=fish_brown;
      break
    case "cyan":
      fish_img=fish_cyan;
      break;
    case "purple":
      fish_img=fish_purple;
      break;
  }
  return (
    <div>
      <div className={cn("d-flex", "pe-3", "user-select-none")}>
        <MenuButton></MenuButton>
        <p className="flex-fill h2">心情不好？來摸魚吧！</p>
      </div>
      {touchFishMission.touchFishMission && !missions.ftCompletedShown ? (
        <MissionCompletedAlert
          missionName="摸魚150下"
          feedsGet={6}
          missionId={2}
          missions={missions}
          dataPath={dataPath}
        ></MissionCompletedAlert>
      ) : null}
      <div className="px-3 mb-3">
        <button
          onClick={handleClick}
          className={cn(
            "w-100",
            "btn",
            "btn-" + darkmode ? "dark" : "light",
            "bg"
          )}
        >
          <img src={fish_img} draggable="false" className="w-100"></img>
        </button>
      </div>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-center mb-3">
          <button
            className={cn("btn", "btn-" + darkmode ? "dark" : "light")}
            style={{
              width: "3rem",
              height: "3rem",
              backgroundColor: "#ddcdc0",
            }}
            onClick={() => handleFishColor("brown")}
          ></button>
          <button
            className={cn("btn", "btn-" + darkmode ? "dark" : "light", "mx-3")}
            style={{
              width: "3rem",
              height: "3rem",
              backgroundColor: "#87bec1",
            }}
            onClick={() => handleFishColor("cyan")}
          ></button>
          <button
            className={cn("btn", "btn-" + darkmode ? "dark" : "light")}
            style={{
              width: "3rem",
              height: "3rem",
              backgroundColor: "#96aacf",
            }}
            onClick={() => handleFishColor("purple")}
          ></button>
        </div>
        <p
          className={cn("flex-fill", "text-end", "h2", "text-center")}
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          您已經摸魚 {touchFish.touchFish} 下
        </p>
      </div>
    </div>
  );
  function handleClick() {
    touchFish.setTouchFish(touchFish.touchFish + 1);
  }
}

export default TouchFish;
