import React, { useState } from "react";
import icons from "../../../../res/icons/icons";
import { Button } from "react-bootstrap";

function P201({ contentControl }) {
  const [destination, setDestination] = useState("");
  async function handleSelectFolder(e) {
    setDestination(await api.invoke("open-file"));
  }

  function handleClick() {
    api.send("import-config", destination);
    contentControl.set(103);
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="w-100">
        <p className="h3">匯入 MyMood 設定檔</p>
      </div>
      <div className="w-100 d-flex flex-column mb-3">
        <div>
          <button
            className="btn btn-primary rounded-pill mb-2"
            onClick={handleSelectFolder}
          >
            <icons.Files></icons.Files>選擇檔案
          </button>
          <span>{destination}</span>
        </div>
      </div>
      <div className="d-flex justify-content-between w-100">
        <Button variant="secondary" onClick={() => contentControl.set(101)}>
          上一步
        </Button>
        <Button variant="primary" onClick={handleClick}>
          下一步
        </Button>
      </div>
    </div>
  );
}

export default P201;
