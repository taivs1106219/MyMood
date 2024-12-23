import React, { useEffect, useState } from "react";
import MenuButton from "./MenuButton";
import zanghu from "../../../res/images/zanghu.png";
import PetSpeak from "../PetSpeak";
// import PetSpeak from "../PetSpeak";
import feed from "../../../res/images/feed.png";

function MyPet({ petData, dataPath, config, userdata }) {
  const [stateForUpdating, setStateForUpdating] = useState(0);
  const [feeds, setFeeds] = useState(userdata.SiLiao);
  console.log(config.nickname)
  const [msgShown, setMsgShown] = useState(PetSpeak.welcome(config.nickname));
  let foodVal = 100;
  if (petData.lastFed != undefined) {
    foodVal = Math.floor(
      (1 - (Date.now() - petData.lastFed) / (1000 * 60 * 60 * 12)) * 100
    );
    // 飽食度每12小時歸零
  } else {
    petData.lastFed = Date.now();
    api.send("write-file", [
      dataPath + "/petData.json",
      JSON.stringify(petData, null, 2),
    ]);
  }
  console.log(foodVal)
  if (foodVal < 0) {
    foodVal = 0;
  }

  function handlePetClick() {
    setMsgShown(PetSpeak.touch());
  }

  function handleWaterClick() {
    setMsgShown(PetSpeak.water())
  }

  function handleFeedClick() {
    // 20飼料=24小時，1飼料=1.2小時
    // petData.lastFed =
    //   1.2 * 60 * 60 * 1000 + petData.lastFed > Date.now()
    //     ? Date.now()
    //     : 1.2 * 60 * 60 * 1000 + petData.lastFed;
    // console.log(foodVal<0)
    if(feeds>0){
      if (foodVal == 0) {
        petData.lastFed = Date.now() - 1000 * 60 * 60 * 12;
        petData.lastFed = 1.2 * 60 * 60 * 1000 + petData.lastFed;
      } else {
        petData.lastFed =
          1.2 * 60 * 60 * 1000 + petData.lastFed > Date.now()
            ? Date.now()
            : 1.2 * 60 * 60 * 1000 + petData.lastFed;
      }
      userdata.SiLiao -= 1;
      setFeeds(feeds - 1);

      api.send("write-file", [
        dataPath + "/petData.json",
        JSON.stringify(petData, null, 2),
      ]);
      api.send("write-file", [
        dataPath + "/userdata.json",
        JSON.stringify(userdata, null, 2),
      ]);
      setMsgShown(PetSpeak.feed());
      setStateForUpdating(stateForUpdating ^ 1);
    }
    
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
            <div className="col justify-content-center text-center"></div>
            <div className="col justify-content-center text-center">
              <p className="d-inline-block">
                <img style={{ height: "1rem" }} src={feed}></img>飼料：{feeds}
              </p>
            </div>
            <div className="col justify-content-center text-center"></div>
            <div className="col justify-content-center text-center">
              <button className="btn btn-info rounded-pill" onClick={handleWaterClick}>加水</button>
            </div>
            <div className="col justify-content-center text-center">
              <button className="btn btn-info rounded-pill" onClick={handleFeedClick}>
                餵食
              </button>
            </div>
            <div className="col justify-content-center text-center">
              <button className="btn btn-warning rounded-pill">施工中</button>
            </div>
          </div>
          <div className="">
            <div className="card">
              <div className="card-body">
                {msgShown}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MyPet;
