import React from "react";

function Select({ question }) {
  return (
    <>
      <h5>{question}</h5>
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
    </>
  );
}

export default Select;
