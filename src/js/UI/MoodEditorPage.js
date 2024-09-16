import React from "react";
import MoodEditor from "./MoodEditor";

function MoodEditorPage({ date, userdata, dataPath,setCurrentPage }) {
  function handleClick() { 
    setCurrentPage(1)
   }
  return (
    <div className="container">
      <MoodEditor
        date={date}
        userdata={userdata}
        dataPath={dataPath}
      ></MoodEditor>
      <button className="btn btn-secondary" onClick={handleClick}>返回</button>
    </div>
  );
}

export default MoodEditorPage;
