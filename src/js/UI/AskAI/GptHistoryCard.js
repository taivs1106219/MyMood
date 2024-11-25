import React from "react";
import icons from "../../../../res/icons/icons";

function HistoryCard({ dateString, resultText, index, aiResult, setAiResult }) {
  function handleClick(){
    const newArray=[...aiResult]
    newArray.splice(index,1)
    console.log(newArray)
    setAiResult(newArray)
  }
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <p className="flex-grow-1 card-title h4">
              {dateString}
            </p>
            <a onClick={handleClick}>
              <icons.Trash_lg></icons.Trash_lg>
            </a>
          </div>
          <p>{resultText}</p>
        </div>
      </div>
    </div>
  );
}
export default HistoryCard;
