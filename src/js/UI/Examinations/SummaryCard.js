import React from "react";
import summary from "./summary";

function SummaryCard({ score, setCurrentPage,showToast }) {
  let pressureLevel = "";

  let s_text = "";

  function handleClick() {
    setCurrentPage(5);
  }

  async function handleSendMailClick() {
    const config = await api.invoke("get-config");
    console.log(config)
    showToast.set(true)
    api.send("send-mail", [config.contact_email, config.realname, score]);
  }

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
      <div className="card mb-3">
        <div className="card-header">精神壓力水平：{pressureLevel}</div>
        <div className="card-body">{s_text}</div>
      </div>
      <div className="w-100 d-flex flex-column">
        <p className="w-100 text-center">我還能做什麽？</p>
        <p className="w-100 text-center">
          <a href="#" onClick={handleClick}>
            問問AI的建議
          </a>
          {score > 16 ? (
            <>
              <br></br>
              <a href="#" onClick={handleSendMailClick}>
                傳送簡訊給緊急聯絡人
              </a>
            </>
          ) : null}
        </p>
      </div>
    </>
  );
}

export default SummaryCard;
