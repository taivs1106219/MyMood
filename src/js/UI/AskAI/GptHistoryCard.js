import React from "react";
import icons from "../../../../res/icons/icons";

function HistoryCard({
  dateString,
  resultText,
  index,
  gptResults,
}) {
  function handleClick() {
    const newArray = JSON.parse(JSON.stringify(gptResults.get()));
    newArray.splice(index, 1);
    console.log(newArray);
    gptResults.set(newArray);
    api.send("write-file", [
      dataPath + "/gptResults.json",
      JSON.stringify(gptResults.get(), null, 2),
    ]);
  }
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <p className="flex-grow-1 card-title h4">{dateString}</p>
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
