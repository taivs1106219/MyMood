import React from "react";
import icons from "../../../res/icons/icons";
import feed from "../../../res/images/feed.png";

function MissionCompletedAlert({ missionName, feedsGet }) {
  
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
