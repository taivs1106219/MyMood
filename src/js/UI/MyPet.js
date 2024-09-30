import React from "react";
import MenuButton from "./MenuButton";
import zanghu from "../../../res/images/zanghu.png";

function MyPet({ petData, dataPath }) {
  function handlePetClick() {
    console.log("pet clicked");
  }
  function handleFeedClick() {
    console.log(dataPath);
    petData.lastFed = Date.now();
    api.send("write-file", [
      dataPath + "/petData.json",
      JSON.stringify(petData, null, 2),
    ]);
  }
  return (
    <>
      <div className="" id="main-content" style={{ overflowX: "hidden" }}>
        <MenuButton></MenuButton>

        <div className="container">
          <div className="row w-100 justify-content-center mb-3">
            <div className="col col-9 justify-content-center text-center">
              飽食度
            </div>
            <div className="col col-9 justify-content-center text-center">
              <div
                className="progress px-0"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div className="progress-bar" style={{ width: "100%" }}></div>
              </div>
            </div>
          </div>
          <div
            className="w-100 row justify-content-center"
            onClick={(e) => handlePetClick(e)}
          >
            <img className="w-100" src={zanghu}></img>
          </div>
          <div className="row row-cols-3 w-100">
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
        </div>
      </div>
    </>
  );
}
export default MyPet;
