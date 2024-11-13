import React from "react";
import summary from "./summary";

function SummaryCard({ score }) {
  let pressureLevel = "";

  let s_text = "";

  if (score < 8) {
    pressureLevel = "低";
    s_text = summary.low;
  } else if (score < 16) {
    pressureLevel = "中";
    s_text = summary.mid;
  } else {
    pressureLevel = "高";
    s_text = summary.high;
  }
  return (
    <>
      <div className="card">
        <div className="card-header">精神壓力水平：{pressureLevel}</div>
        <div className="card-body">{s_text}</div>
      </div>
    </>
  );
}

export default SummaryCard;
