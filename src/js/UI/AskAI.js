import React, { useContext, useEffect, useState } from "react";
import MenuButton from "./MenuButton";
import getDateNum from "../getDateNum";
// import OpenAI from "openai";
import cn from "classnames";
import icons from "../../../res/icons/icons";
import GptHistory from "./AskAI/GptHistory";
// import view_AiSuggestions from "../../../res/images/buttons_v2/view_AiSuggestions.png"
import view_GptHistory from "../../../res/images/buttons_v2/view_GptHistory.png";

function AskAI({
  userdata,
  examinationData,
  config,
  ThemeContext,
  gptResults,
  dataPath,
}) {
  const [suggestion, setSuggestion] = useState("");
  const dateNum = getDateNum(new Date());
  const darkmode = useContext(ThemeContext);
  let theme = "";
  if (darkmode) {
    theme = "dark";
  } else {
    theme = "light";
  }

  useEffect(() => {
    api.handle("gpt-result", (res) => {
      let tempArray = JSON.parse(JSON.stringify(gptResults.get()));
      tempArray[0][1] += res;
      console.log(tempArray[0][1])
      setSuggestion(tempArray[0][1]);
      
      gptResults.set(tempArray)
    });
    return () => api.removeIPCListener("gpt-result");
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      api.send("write-file", [
        dataPath + "/gptResults.json",
        JSON.stringify(gptResults.get(), null, 2),
      ]);
    }, 50);
    return () => clearTimeout(delayDebounceFn);
  }, [gptResults.get()]);

  const handleAnalyze = () => {
    const newDate = getDateNum(new Date()).toString();
    let newDateString = "";
    for (let i = 0; i < 4; i++) {
      newDateString += newDate[i];
    }
    console.log(newDateString);
    newDateString += "-";
    for (let i = 4; i < 6; i++) {
      newDateString += newDate[i];
    }
    newDateString += "-";
    for (let i = 6; i < 8; i++) {
      newDateString += newDate[i];
    }
    const tempArray = JSON.parse(JSON.stringify(gptResults.get()))
    tempArray.unshift([newDateString, ""]);
    gptResults.set(tempArray);
    setSuggestion("");
    if (config.openai_key == "") {
      setSuggestion("未填寫OpenAI API Key！請申請後在設定中填寫");
    } else {
      if (
        examinationData[dateNum] == undefined ||
        examinationData[dateNum].answers.length == 0
      ) {
        setSuggestion("請先作答再來看建議哦~");
      } else {
        let score = 0;
        for (let x of examinationData[dateNum].answers) {
          score += x;
        }
        api.send("ask-gpt", [config.openai_key, score]);
      }
    }
  };

  return (
    <>
      <div>
        <div className="d-flex">
          <MenuButton />
          <h2>AI的建議</h2>
        </div>
        <div className="container">
          <ins className="text-warning">
            “AI的建議”由ChatGPT產生，結果僅供參考。
          </ins>
          <div className={cn("card", "mb-3")}>
            <div className={cn("card-body", "bg-" + theme + "-subtle")}>
              <div className="d-flex flex-column">
                <p>{gptResults.get().length?gptResults.get()[0][1]:""}</p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center w-100">
            <button
              type="button"
              className="btn btn-primary me-1 rounded-pill"
              onClick={handleAnalyze}
            >
              查看AI的建議
            </button>
            <button
              className="btn btn-info ms-1 rounded-pill"
              data-bs-toggle="modal"
              data-bs-target="#modal-gpt-history"
            >
              查看歷史記錄<icons.Clock_history></icons.Clock_history>
            </button>
          </div>
        </div>
      </div>
      <GptHistory gptResults={gptResults}></GptHistory>
    </>
  );
}

export default AskAI;
