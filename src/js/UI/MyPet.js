import React, { useEffect, useState } from "react";
import MenuButton from "./MenuButton";
import zanghu from "../../../res/images/zanghu.png";
import PetSpeak from "../PetSpeak";

function MyPet({ petData, dataPath, config }) {
  const [stateForUpdating, setStateForUpdating] = useState(0);
  const [msgShown, setMsgShown] = useState(
    `${config.nickname == "" ? "" : config.nickname + "，"}你好呀~~`
  );
  let foodVal = 0;
  if (petData.lastFed != undefined) {
    foodVal = Math.floor(
      (1 - (Date.now() - petData.lastFed) / (1000 * 60 * 60 * 12)) * 100
    );
    // 飽食度每12小時歸零
  }

  function handlePetClick() {
    setMsgShown(PetSpeak.touch())
  }

  function handleFeedClick() {
    petData.lastFed = Date.now();
    api.send("write-file", [
      dataPath + "/petData.json",
      JSON.stringify(petData, null, 2),
    ]);
    setStateForUpdating(stateForUpdating ^ 1);
    setMsgShown(PetSpeak.eat())
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStateForUpdating(stateForUpdating ^ 1);
    }, 10000);

    return () => clearInterval(intervalId);
  });
  return (
    <>
      <div className="" id="main-content" style={{ overflowX: "hidden" }}>
        <MenuButton></MenuButton>

        <div className="container">
          <div
            className="w-100 row justify-content-center mb-3"
            onClick={(e) => handlePetClick(e)}
          >
            <div className="col col-9">
              <img className="w-100" src={zanghu}></img>
            </div>
          </div>
          <div className="d-flex w-100 justify-content-center mb-3">
            <div className="justify-content-center text-center">飽食度</div>
            <div className="flex-fill justify-content-center text-center">
              <div
                className="progress px-0"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow={`${foodVal}`}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="progress-bar" style={{ width: `${foodVal}%` }}>
                  {foodVal}%
                </div>
              </div>
            </div>
          </div>
          <div className="row row-cols-3 w-100 mb-3">
            <div className="col justify-content-center text-center">
              <button className="btn btn-info">加水</button>
            </div>
            <div className="col justify-content-center text-center">
              <button className="btn btn-info" onClick={handleFeedClick}>
                餵食
              </button>
            </div>
            <div className="col justify-content-center text-center">
              <button className="btn btn-info">開發中</button>
            </div>
          </div>
          <div className="">
            <div className="card">
              <div className="card-body">{msgShown}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MyPet;
