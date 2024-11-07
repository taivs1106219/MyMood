import React from "react";

function Yn({ question }) {
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
        <label className="form-check-label" htmlFor="y">
          是
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="n2"
        ></input>
        <label className="form-check-label" htmlFor="n">
          否
        </label>
      </div>
    </>
  );
}

export default Yn;
