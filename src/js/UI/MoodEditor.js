import React, { useState, useEffect } from "react";
import MissionCompletedAlert from "./MissionCompleted";
import getDateNum from "../getDateNum";

function MoodEditor({ date, userdata, dataPath, missions }) {
  const [showMissionCompleted, setShowMissionCompleted] = useState(0);

  const dateCurrentEditing = Number(
    `${date.getFullYear()}${
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)
    }${date.getDate() + 1 > 9 ? date.getDate() : "0" + date.getDate()}`
  );

  const todayNum = getDateNum(new Date());
  console.log(userdata);

  const [dataModded, setDataModded] = useState(false);

  const [moodVal, setMoodVal] = useState(
    Object.hasOwn(userdata, dateCurrentEditing.toString())
      ? userdata[dateCurrentEditing].moodVal
      : 3
  );

  const [notes, setNotes] = useState(
    Object.hasOwn(userdata, dateCurrentEditing.toString())
      ? userdata[dateCurrentEditing].notes
      : ""
  );

  if (dataModded) {
    Object.assign(userdata, {
      [dateCurrentEditing]: {
        moodVal: Number(moodVal),
        notes: notes,
        loggedIn: true,
      },
    });
    // userdata[dateToday].moodVal = Number(moodVal);
    // userdata[dateToday].notes = notes;

    api.send("write-file", [
      dataPath + "/userdata.json",
      JSON.stringify(userdata, null, 2),
    ]);
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(notes);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [notes]);

  function handleMoodValChange(e) {
    setDataModded(true);
    setMoodVal(e.target.value);
  }

  function handleNoteChange(e) {
    if (todayNum == dateCurrentEditing) {
      if (!missions[todayNum].moodEdited) {
        missions[todayNum].moodEdited = true;
        userdata.SiLiao += 14;

        api.send("write-file", [
          dataPath + "/userdata.json",
          JSON.stringify(userdata, null, 2),
        ]);
        api.send("write-file", [
          dataPath + "/missions.json",
          JSON.stringify(missions, null, 2),
        ]);
        setShowMissionCompleted(1);
      }
    }
    setNotes(e.target.value);
    setDataModded(true);
  }
  return (
    <div className="card">
      {showMissionCompleted ? (
        <MissionCompletedAlert
          missionName="填寫心情筆記"
          feedsGet="14"
        ></MissionCompletedAlert>
      ) : null}
      <div className="card-body">
        <div className="mb-2">
          <label htmlFor="customRange1" className="form-label">
            我的心情指數：
            {Object.hasOwn(userdata, dateCurrentEditing.toString())
              ? userdata[dateCurrentEditing].moodVal
              : 3}
          </label>
          <input
            type="range"
            className="form-range"
            min={1}
            max={5}
            value={
              Object.hasOwn(userdata, dateCurrentEditing.toString())
                ? userdata[dateCurrentEditing].moodVal
                : 3
            }
            id="customRange1"
            onChange={(e) => handleMoodValChange(e)}
          ></input>
        </div>
        <div className="mb-2">
          <label htmlFor="MoodNote">我的心情筆記</label>
          <div className="input-group mb-3">
            <textarea
              type="text"
              id="MoodNote"
              className="form-control"
              placeholder="心情筆記"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={
                Object.hasOwn(userdata, dateCurrentEditing.toString())
                  ? userdata[dateCurrentEditing].notes
                  : ""
              }
              onChange={(e) => handleNoteChange(e)}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoodEditor;
