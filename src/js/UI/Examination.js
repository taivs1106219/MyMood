import React, { useState } from "react";
import MenuButton from "./MenuButton";
import getDateNum from "../getDateNum";
import quesions from "../../../res/json/questions.json";
import QuestionCard from "./Examinations/question";
function Examination({ examinationData, dataPath }) {
  const [currentQuestion, setCurrentQuestion] = useState([0, 0]);

  const dateNum = getDateNum(new Date());
  if (!(dateNum in examinationData)) {
    Object.assign(examinationData, {
      [dateNum]: { quesions: { p1: [], p2: [], p3: [] } },
    });
    for (let i = 0; i < 2; i++) {
      examinationData[dateNum].quesions.p1.push(
        Math.floor(Math.random() * quesions.depress.select.length)
      );
    }
    for (let i = 0; i < 2; i++) {
      examinationData[dateNum].quesions.p2.push(
        Math.floor(Math.random() * quesions.depress.yn.length)
      );
    }
    for (let i = 0; i < 2; i++) {
      examinationData[dateNum].quesions.p3.push(
        Math.floor(Math.random() * quesions.pressure.yn.length)
      );
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
        </div>
      </div>
    </div>
  );
}

export default Examination;
