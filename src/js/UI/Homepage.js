import React from "react";
import MenuButton from "./MenuButton";
import zanghu from "../../../res/images/zanghu.jpg";
function Homepage({ page }) {
  return (
    <>
      <div className="d-flex">
        <MenuButton></MenuButton>
        <h2>首頁</h2>
      </div>
      <div className="mx-3 d-flex flex-column align-items-center justify-content-center">
        <img
          src={zanghu}
          className="p-2 rounded-circle"
          style={{ width: "45%" }}
        ></img>

        <div className="card w-75">
          <div className="card-body">
            <div className="mb-2">
              <label htmlFor="customRange1" className="form-label">
                我的精神狀態——堪比大便
              </label>
              <input
                type="range"
                className="form-range"
                min={1}
                max={5}
                id="customRange1"
              ></input>
              {/* 1: 我要跳下去 
              2: 我想跳下去
              3: 感覺很普通
              4: 有點嗨
              5: 感覺人生達到了高潮
          */}
            </div>
            <label>我的心情筆記</label>
            <input type="text"></input>
          </div>
        </div>
        <button className="btn btn-lg btn-info" onClick={handleMCalendarClick}>
          查看心情日記
        </button>
        <div className="card w-75">
          <div className="card-body">
            <h1 className="display-1">折綫圖</h1>
          </div>
        </div>
      </div>
    </>
  );
  function handleMCalendarClick() {
    page.setCurrentPage(1);
  }
}

export default Homepage;
