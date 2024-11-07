import React from "react";
import Select from "./select";
import Yn from "./yn";
function QuestionCard({ type, question }) {
  if (type) {
    return <Yn question={question}></Yn>;
  } else {
    return <Select question={question}></Select>;
  }
  // 選擇題
}

export default QuestionCard;
