import React, { useState, useContext } from "react";
import MenuButton from "./MenuButton";
import getDateNum from "../getDateNum";
import quesions from "../../../res/json/questions.json";
import QuestionCard from "./Examinations/question";
import icons from "../../../res/icons/icons";
import cn from "classnames";
import summary from "./Examinations/summary";
import SummaryCard from "./Examinations/SummaryCard";
import zanghu_button_v2 from "../../../res/images/buttons_v2/zanghu_button.png";
import { Toast,ToastContainer } from "react-bootstrap";


function Examination({
  examinationData,
  dataPath,
  ThemeContext,
  setCurrentPage,
}) {
  const darkmode = useContext(ThemeContext);

  const dateNum = getDateNum(new Date());
  const [currentQuestion, setCurrentQuestion] = useState([0, 0]);
  const [currentQuestionOrder, setCurrentQuestionOrder] = useState(1);
  const [answerStatus, setAnswerStatus] = useState([2, 2, 4, 4, 4, 4]);
  const [showToast, setShowToast] = useState(false);

  if (!(dateNum in examinationData)) {
    Object.assign(examinationData, {
      [dateNum]: {
        quesions: { p1: [], p2: [], p3: [] },
        answers: [],
      },
    });

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
    // console.log(examinationData);
  }

  function toggleToast() {
    setShowToast(!showToast);
  }

  const [submitted, setSubmitted] = useState(
    !!examinationData[dateNum].answers.length
  );

  let score = 0;

  if (submitted) {
    examinationData[dateNum].answers.forEach((element) => {
      score += element;
    });
  }

  console.log(answerStatus);

  // console.log(dateNum);

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

    renderQuestion(newQuestionOrder);
  }

  function handleSubmitClick() {
    if (!submitted) {
      examinationData[dateNum].answers = answerStatus;
    }
    console.log(examinationData);
    api.send("write-file", [
      dataPath + "/examinationData.json",
      JSON.stringify(examinationData, null, 2),
    ]);
    setSubmitted(true);
  }

  function renderQuestion(newQuestionOrder) {
    let currentQuestionField1 = 0;
    let currentQuestionField2 = 0;
    // console.log(newQuestionOrder);
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
    setCurrentQuestionOrder(newQuestionOrder);
    setCurrentQuestion([currentQuestionField1, currentQuestionField2]);
  }

  return (
    <div>
      <div className="d-flex">
        <MenuButton></MenuButton>
        <h2>心理測驗</h2>
      </div>
      <div className="container">
        <div className={cn("card", "mb-3", submitted ? "d-none" : "")}>
          <div className="card-body">
            <QuestionCard
              type={currentQuestion[0]}
              question={questionText}
              examinationData={examinationData}
              currentQuestionOrder={currentQuestionOrder}
              answerStatus={answerStatus}
              setAnswerStatus={setAnswerStatus}
              dataPath={dataPath}
            ></QuestionCard>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center">
              <button
                className={cn(
                  "btn",
                  "btn-sm",
                  "btn-outline-" + darkmode ? "light" : "dark"
                )}
                onClick={() => handleClick(-1)}
              >
                <icons.Chevron_left></icons.Chevron_left>
              </button>
              <p className="h3 mx-2">{currentQuestionOrder}/6</p>
              <button
                className={cn(
                  "btn",
                  "btn-sm",
                  "btn-outline-" + darkmode ? "light" : "dark"
                )}
                onClick={() => handleClick(1)}
              >
                <icons.Chevron_right></icons.Chevron_right>
              </button>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "w-100",
            "d-flex",
            "flex-column",
            submitted ? "d-none" : ""
          )}
        >
          <div className="d-flex w-100 justify-content-center">
            <button
              className={cn(
                "btn",
                "rounded-pill",
                "btn-primary",
                "mb-2",
                submitted ? "disabled" : ""
              )}
              onClick={handleSubmitClick}
            >
              提交
            </button>
          </div>
          <div className="d-flex w-100 justify-content-center">
            <p className="h6">
              <ins>當日提交後，不可再次提交</ins>
            </p>
          </div>
          {/* {submitted ? <ScoreCard score={score}></ScoreCard> : null} */}
        </div>
        <div className={cn("w-100", "d-flex", "flex-column")}>
          {submitted ? (
            <SummaryCard
              setCurrentPage={setCurrentPage}
              score={score}
              showToast={{
                get: () => {
                  return showToast;
                },
                set: setShowToast,
              }}
            ></SummaryCard>
          ) : null}
        </div>
      </div>
      <ToastContainer style={{zIndex:1}} className="p-3" position="middle-center">
        <Toast show={showToast} onClose={toggleToast}>
          <Toast.Header>
            {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
            <strong className="me-auto">簡訊傳送通知</strong>
            <small></small>
          </Toast.Header>
          <Toast.Body>已傳送簡訊</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

function ScoreCard({ score }) {
  let pressureLevel = "";

  if (score < 8) {
    pressureLevel = "LOW";
  } else if (score < 16) {
    pressureLevel = "MID";
  } else {
    pressureLevel = "HIGH";
  }

  return (
    <>
      {/* <div className="d-flex w-100 justify-content-center">
        <p>您的分數：{score}分</p>
      </div> */}
      <div className="d-flex w-100 justify-content-center">
        <p>精神壓力水平：{pressureLevel}</p>
      </div>
    </>
  );
}

export default Examination;
