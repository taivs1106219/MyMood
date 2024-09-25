import React from "react";
import MenuButton from "./MenuButton";
import zanghu from "../../../res/images/zanghu.png";

function MyPet(e) {
  function handlePetClick() {
    console.log("pet clicked");
  }
  return (
    <>
      <div className="" id="main-content" style={{ overflowX: "hidden" }}>
        <MenuButton></MenuButton>

        <div className="container">
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
              <button className="btn btn-info">餵食</button>
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
