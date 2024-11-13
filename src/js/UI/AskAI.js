import React, { useState } from "react";
import MenuButton from "./MenuButton";
import getDateNum from "../getDateNum";

function AskAI({ userdata, examinationData }) {
  const [suggestion, setSuggestion] = useState("");
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const currentDate = getDateNum(new Date());
  const answers = examinationData[currentDate] ? examinationData[currentDate].answers : "無數據";

  const handleAnalyze = () => {
    if (hasAnalyzed) {
      setSuggestion("今天已經分析過了，請明天再試。");
      return;
    }

    if (answers === "無數據") {
      setSuggestion("無法獲取當前日期的數據。");
      return;
    }

    const raw = JSON.stringify({
      "model": "gpt-4",
      "messages": [
        {
          "role": "user",
          "content": `我今天的心情為 ${answers}，滿分為 24，分數越高心情越差，請幫我依照當前的心情，給我一些建議`
        }
      ],
      "stream": false
    });

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer sk-DWskRGTLRJpv7RXiFVm7XCSHTI8HpT7Ira8qpsSKHKFXCAVC");
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://chatapi.littlewheat.com/v1/chat/completions", requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(result => {
        console.log('API回應:', result);  // 調試
        const aiResponse = result.choices[0].message.content;
        setSuggestion(aiResponse);
        setHasAnalyzed(true);
      })
      .catch(error => {
        console.error('錯誤:', error);
        setSuggestion("抱歉，無法獲取建議。");
      });
  };

  return (
    <div >
      <div className="d-flex">
        <MenuButton />
        <h2>AI的建議</h2>
      </div >
      <button button type="button" class="btn btn-primary" onClick={handleAnalyze}>請AI分析</button>
      <div>
        <h3>{suggestion}</h3>
      </div>
    </div>
  );
}

export default AskAI;


