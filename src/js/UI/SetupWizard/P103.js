import React from "react";
import { Button } from "react-bootstrap";
function P202({ contentControl, dataPath, config }) {
  Object.assign(config, { setupCompleted: true });
  api.send("write-file", [
    dataPath + "/config.json",
    JSON.stringify(config, null, 2),
  ]);

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="w-100">
        <p className="h5">設定完成！</p>
      </div>
      <div className="w-100 d-flex align-items-center flex-column">
        <p className="h6">重新啓動 APP 即可開始使用</p>
        <div>
          <Button
            className="btn-block rounded-pill"
            onClick={() => api.send("restart-app")}
          >
            立即重啓 APP
          </Button>
        </div>
      </div>
      <div className="d-flex justify-content-start w-100">
        <Button variant="secondary" onClick={() => contentControl.set(201)}>
          上一步
        </Button>
      </div>
    </div>
  );
}

export default P202;
