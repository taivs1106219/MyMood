import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import cn from "classnames";

function P101({ contentControl, config, dataPath }) {
  if (config.realname == undefined) {
    Object.assign(config, { realname: "" });
    api.send("write-file", [
      dataPath + "/config.json",
      JSON.stringify(config, null, 2),
    ]);
  }
  if (config.contact_email == undefined) {
    Object.assign(config, { contact_email: "" });
    api.send("write-file", [
      dataPath + "/config.json",
      JSON.stringify(config, null, 2),
    ]);
  }
  if (config.openai_key == undefined) {
    Object.assign(config, { openai_key: "" });
    api.send("write-file", [
      dataPath + "/config.json",
      JSON.stringify(config, null, 2),
    ]);
  }
  const [username, setUsername] = useState(config.nickname);
  const [realname, setRealname] = useState(config.realname);
  const [email, setEmail] = useState(config.contact_email);
  const [OAIKey, setOAIKey] = useState(config.openai_key);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      config.nickname = username;
      api.send("write-file", [
        dataPath + "/config.json",
        JSON.stringify(config, null, 2),
      ]);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [username]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      config.realname = realname;
      api.send("write-file", [
        dataPath + "/config.json",
        JSON.stringify(config, null, 2),
      ]);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [realname]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      config.contact_email = email;
      api.send("write-file", [
        dataPath + "/config.json",
        JSON.stringify(config, null, 2),
      ]);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [email]);

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="w-100">
        <p className="h3">首先，讓我們認識您</p>
      </div>
      <div className="w-75 d-flex flex-column">
        <div className={cn("input-group", "flex-nowrap", "mb-3")}>
          <span className="input-group-text" id="addon-wrapping">
            用戶暱稱
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className={cn("input-group", "flex-nowrap", "mb-3")}>
          <span className="input-group-text" id="addon-wrapping">
            用戶真實姓名
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="您的真實姓名"
            aria-label="您的真實姓名"
            aria-describedby="addon-wrapping"
            value={realname}
            onChange={(e) => setRealname(e.target.value)}
          ></input>
        </div>
        <div className={cn("input-group", "flex-nowrap", "mb-3")}>
          <span className="input-group-text" id="addon-wrapping">
            緊急聯絡電話號碼
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="請包含區碼（例：+886 0987654321）"
            aria-label="聯絡用電話號碼"
            aria-describedby="addon-wrapping"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="card mb-3">
          <div className="card-body">
            <p className="mb-2">
              欲使用“AI的建議”功能，請填寫OpenAI API Key<br></br>
              <ins>僅用於 AI 建議</ins>
            </p>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="填入 OpenAI 的 API Key"
                aria-label=""
                aria-describedby="basic-addon1"
                value={OAIKey}
                onChange={(e) => setOAIKey(e.target.value)}
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex w-100 justify-content-between">
        <Button variant="secondary" onClick={() => contentControl.set(1)}>
          上一步
        </Button>
        <Button variant="primary" onClick={() => contentControl.set(102)}>
          下一步
        </Button>
      </div>
    </div>
  );
}

export default P101;
