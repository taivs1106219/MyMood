import React, { useEffect, useState } from "react";
import MenuButton from "./MenuButton";
import getDateNum from "../getDateNum";
// import OpenAI from "openai";

function AskAI({ userdata, examinationData, config }) {
  const [suggestion, setSuggestion] = useState("");
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const currentDate = getDateNum(new Date());
  const dateNum = getDateNum(new Date());

  useEffect(() => {
    api.handle("gpt-result", (res) => {
      setSuggestion(suggestion + res);
    });
    return () => api.removeIPCListener("gpt-result");
  });
  const handleAnalyze = () => {
    setSuggestion("")
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
          console.log(x);
          score += x;
        }
        console.log(score);
        api.send("ask-gpt", [config.openai_key, score]);
      }
    }
  };

  return (
    <div>
      <div className="d-flex">
        <MenuButton />
        <h2>AI的建議</h2>
      </div>
      <div className="container">
        <div>
          <p>{suggestion}</p>
        </div>
        <div className="d-flex justify-content-center w-100">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAnalyze}
          >
            查看AI的建議
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default AskAI;
