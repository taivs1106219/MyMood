import React from "react";
import icons from "../../../res/icons/icons";
import feed from "../../../res/images/feed.png";

function MissionCompletedAlert({ missionName, feedsGet, missionId, missions,dataPath }) {
  const today = new Date();
  const todayNum = Number(
    `${today.getFullYear()}${
      today.getMonth() + 1 > 9
        ? today.getMonth() + 1
        : "0" + (today.getMonth() + 1)
    }${today.getDate() + 1 > 9 ? today.getDate() : "0" + today.getDate()}`
  );
  switch (missionId) {
    case 2:
      missions[todayNum].ftCompletedShown = true;
      break;

    default:
      break;
  }

  api.send("write-file", [
    dataPath + "/missions.json",
    JSON.stringify(missions, null, 2),
  ]);

  return (
    <div
      className="alert alert-success alert-dismissable fade show d-flex justify-content-between"
      role="alert"
    >
      <div className="d-inline-block">
        <icons.Check_circle_fill className="me-2"></icons.Check_circle_fill>
        {missionName}完成，<img style={{ height: "1rem" }} src={feed}></img>
        飼料+{feedsGet}
      </div>

      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}

export default MissionCompletedAlert;
