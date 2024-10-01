import React from "react";
import MoodEditor from "./MoodEditor";

function MoodEditorPage({ date, userdata, dataPath,setCurrentPage,missions }) {
  function handleClick() { 
    setCurrentPage(1)
   }
  return (
    <div className="container">
      <MoodEditor
        date={date}
        userdata={userdata}
        dataPath={dataPath}
        missions={missions}
      ></MoodEditor>
      <button className="btn btn-secondary" onClick={handleClick}>返回</button>
    </div>
  );
}

export default MoodEditorPage;
