import React from "react";
import HistoryCard from "./GptHistoryCard";

function GptHistory({ aiResult, setAiResult }) {
  return (
    <div
      className="modal fade"
      id="modal-gpt-history"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              AI歷史建議
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            {!aiResult.length ? "暫無歷史建議" : null}
            {aiResult.map(([dateString, resultText], index) => {
              return (
                <HistoryCard
                  dateString={dateString}
                  resultText={resultText}
                  aiResult={aiResult}
                  setAiResult={setAiResult}
                  key={index}
                  index={index}
                ></HistoryCard>
              );
            })}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GptHistory;
