import React from "react";
function HistoryCard({ dateString, resultText }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h4 className="card-title">{dateString}</h4>
        <p>{resultText}</p>
      </div>
    </div>
  );
}
export default HistoryCard;
