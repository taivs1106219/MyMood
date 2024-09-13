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
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-6">
            <img
              src={zanghu}
              className="p-2 rounded-circle"
              style={{ width: "100%" }}
            ></img>
          </div>
        </div>
        <div className="row mb-3">
          <div className="card">
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
              </div>
              <div className="mb-2">
                <label htmlFor="MoodNote">我的心情筆記</label>
                <div className="input-group mb-3">
                  <textarea
                    type="text"
                    id="MoodNote"
                    class="form-control"
                    placeholder="心情筆記"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3 justify-content-center">
          <div className="col-4">
            <button
              className="btn btn-lg btn-info mb-3 "
              onClick={handleMCalendarClick}
            >
              查看心情日記
            </button>
          </div>
        </div>
        <div className="row">
          <div className="card">
            <div className="card-body">
              <h1 className="display-1">折綫圖</h1>
            </div>
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
