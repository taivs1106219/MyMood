import React from "react";
import { Button } from "react-bootstrap";
function P001({contentControl}) {
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="w-100">
        <p className="h3">是否首次使用MyMood？</p>
      </div>
      <div className="w-50 d-flex flex-column mb-3">
        <Button variant="primary" className="rounded-pill mb-2" onClick={()=>contentControl.set(101)}>
          是，我是新用戶
        </Button>
        <Button variant="secondary" className="rounded-pill" onClick={()=>contentControl.set(201)}>
          否，我已在使用
        </Button>
      </div>
      <div className="d-flex justify-content-start w-100">
        <Button variant="secondary" onClick={() => contentControl.set(0)}>
          上一步
        </Button>
      </div>
    </div>
  );
}

export default P001;
