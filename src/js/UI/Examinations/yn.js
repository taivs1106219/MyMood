import React, { useState, useEffect, useref, useRef } from "react";
import getDateNum from "../../getDateNum";

function Yn({
  question,
  examinationData,
  currentQuestionOrder,
  dataPath,
  answerStatus,
  setAnswerStatus,
}) {
  const dateNum = getDateNum(new Date());

  function handleClick(val) {
    const tempArray = [...answerStatus];
    tempArray[currentQuestionOrder - 1] = val;
    setAnswerStatus(tempArray);
  }

  const checkStatus = [4, 0].map((x) =>
    answerStatus[currentQuestionOrder - 1] == x ? "checked" : ""
  );

  return (
    <>
      <h5>{question}</h5>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="y"
          onClick={() => handleClick(4)}
          checked={checkStatus[0]}
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
          id="n"
          onClick={() => handleClick(0)}
          checked={checkStatus[1]}
        ></input>
        <label className="form-check-label" htmlFor="n">
          否
        </label>
      </div>
    </>
  );
}

export default Yn;
