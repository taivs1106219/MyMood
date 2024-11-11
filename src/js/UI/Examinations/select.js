import React, { useEffect, useState, useRef } from "react";
import getDateNum from "../../getDateNum";

function Select({
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
  const checkStatus = [...Array(5).keys()].map((x) =>
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
          id="n2"
          onClick={() => handleClick(0)}
          checked={checkStatus[0]}
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
          onClick={() => handleClick(1)}
          checked={checkStatus[1]}
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
          onClick={() => handleClick(2)}
          checked={checkStatus[2]}
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
          onClick={() => handleClick(3)}
          checked={checkStatus[3]}
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
          onClick={() => handleClick(4)}
          checked={checkStatus[4]}
        ></input>
        <label className="form-check-label" htmlFor="y2">
          非常贊同
        </label>
      </div>
    </>
  );
}

export default Select;
