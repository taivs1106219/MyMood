import React from "react";
import Select from "./select";
import Yn from "./yn";
function QuestionCard({
  type,
  question,
  examinationData,
  currentQuestionOrder,
  dataPath,
  answerStatus,setAnswerStatus
}) {
  if (type) {
    return (
      <Yn
        question={question}
        examinationData={examinationData}
        currentQuestionOrder={currentQuestionOrder}
        dataPath={dataPath}
        answerStatus={answerStatus}
        setAnswerStatus={setAnswerStatus}
      ></Yn>
    );
  } else {
    return (
      <Select
        question={question}
        examinationData={examinationData}
        currentQuestionOrder={currentQuestionOrder}
        dataPath={dataPath}
        answerStatus={answerStatus}
        setAnswerStatus={setAnswerStatus}
      ></Select>
    );
  }
  // 選擇題
}

export default QuestionCard;
