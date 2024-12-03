import React from "react";
import { Button } from "react-bootstrap";
import zanghu from "../../../../res/images/zanghu.png";
function P000({contentControl}) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <img className="w-75 mb-4" src={zanghu} draggable="false"></img>
      <p className="h3 text-center">
        您好，歡迎使用 MyMood
      </p>
      <div className="d-flex justify-content-end w-100">
        <Button variant="primary" onClick={()=>contentControl.set(1)}>下一步</Button>
      </div>
    </div>
  );
}

export default P000;
