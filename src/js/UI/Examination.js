import React, { useState } from "react";
import MenuButton from "./MenuButton";
import getDateNum from "../getDateNum";
import quesions from "../../../res/json/questions.json";
import QuestionCard from "./Examinations/question";
import icons from "../../../res/icons/icons";

function Examination({ examinationData, dataPath }) {
  const [currentQuestion, setCurrentQuestion] = useState([0, 0]);
  const [currentQuestionOrder, setCurrentQuestionOrder] = useState(1);

  const dateNum = getDateNum(new Date());
  if (!(dateNum in examinationData)) {
    Object.assign(examinationData, {
      [dateNum]: { quesions: { p1: [], p2: [], p3: [] } },
    });
    // for (let i = 0; i < 2; i++) {
    //   examinationData[dateNum].quesions.p1.push(
    //     Math.floor(Math.random() * quesions.depress.select.length)
    //   );
    // }

    while (examinationData[dateNum].quesions.p1.length < 2) {
      const qNum = Math.floor(Math.random() * quesions.depress.select.length);
      if (!examinationData[dateNum].quesions.p1.includes(qNum)) {
        examinationData[dateNum].quesions.p1.push(qNum);
      }
    }
    
    while (examinationData[dateNum].quesions.p2.length < 2) {
      const qNum = Math.floor(Math.random() * quesions.depress.select.length);
      if (!examinationData[dateNum].quesions.p2.includes(qNum)) {
        examinationData[dateNum].quesions.p2.push(qNum);
      }
    }
    
    while (examinationData[dateNum].quesions.p3.length < 2) {
      const qNum = Math.floor(Math.random() * quesions.depress.select.length);
      if (!examinationData[dateNum].quesions.p3.includes(qNum)) {
        examinationData[dateNum].quesions.p3.push(qNum);
      }
    }
    api.send("write-file", [
      dataPath + "/examinationData.json",
      JSON.stringify(examinationData, null, 2),
    ]);
    console.log(examinationData);
  }
  console.log(dateNum);

  function order2text(order, questionList) {
    return questionList[order];
  }
  let questionText = "";
  const p1 = examinationData[dateNum].quesions.p1;
  const p2 = examinationData[dateNum].quesions.p2;
  const p3 = examinationData[dateNum].quesions.p3;
  switch (currentQuestion[0]) {
    case 0:
      questionText = order2text(
        p1[currentQuestion[1]],
        quesions.depress.select
      );
      break;
    case 1:
      questionText = order2text(p2[currentQuestion[1]], quesions.depress.yn);
      break;
    case 2:
      questionText = order2text(p3[currentQuestion[1]], quesions.pressure.yn);
  }

  function handleClick(d) {
    let newQuestionOrder;
    newQuestionOrder = currentQuestionOrder + d;
    if (currentQuestionOrder + d > 6) {
      newQuestionOrder = 6;
    }
    if (currentQuestionOrder + d < 1) {
      newQuestionOrder = 1;
    }
    setCurrentQuestionOrder(newQuestionOrder);
    renderQuestion(newQuestionOrder);
  }

  function renderQuestion(newQuestionOrder) {
    let currentQuestionField1 = 0;
    let currentQuestionField2 = 0;
    console.log(newQuestionOrder);
    switch (newQuestionOrder) {
      case 1:
      case 2:
        currentQuestionField1 = 0;
        break;
      case 3:
      case 4:
        currentQuestionField1 = 1;
        break;
      case 5:
      case 6:
        currentQuestionField1 = 2;
        break;
    }

    currentQuestionField2 = newQuestionOrder % 2 ^ 1;

    setCurrentQuestion([currentQuestionField1, currentQuestionField2]);
    console.log(newQuestionOrder, [
      currentQuestionField1,
      currentQuestionField2,
    ]);
  }

  return (
    <div>
      <div className="d-flex">
        <MenuButton></MenuButton>
        <h2>心理測驗</h2>
      </div>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <QuestionCard
              type={currentQuestion[0]}
              question={questionText}
            ></QuestionCard>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-outline-light btn-sm"
                onClick={() => handleClick(-1)}
              >
                <icons.Chevron_left></icons.Chevron_left>
              </button>
              <p className="h3 mx-2">{currentQuestionOrder}/6</p>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={() => handleClick(1)}
              >
                <icons.Chevron_right></icons.Chevron_right>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Examination;
