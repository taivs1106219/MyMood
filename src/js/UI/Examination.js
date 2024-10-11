import React from "react";
import MenuButton from "./MenuButton";

function Examination() {
  return (
    <div>
      <div className="d-flex">
        <MenuButton></MenuButton>
        <h2>心理測驗</h2>
      </div>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h5>我變得沒有辦法集中注意力</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="n2"
              ></input>
              <label className="form-check-label" htmlFor="n2">
                非常不贊同
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="n1"
              ></input>
              <label className="form-check-label" htmlFor="n1">
                不贊同
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="y0"
                checked
              ></input>
              <label className="form-check-label" htmlFor="y0">
                無感
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="y1"
              ></input>
              <label className="form-check-label" htmlFor="y1">
                贊同
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="y2"
              ></input>
              <label className="form-check-label" htmlFor="y2">
                非常贊同
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Examination;
