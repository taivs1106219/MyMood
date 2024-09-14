import React, { useState, useEffect } from "react";

function MoodEditor({ date, userdata, dataPath }) {
  const [moodVal, setMoodVal] = useState(3);
  const [notes, setNotes] = useState("");
  const dateToday = Number(
    `${date.getFullYear()}${
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)
    }${date.getDate()}`
  );

  // Object.assign(
  //   {
  //     [dateToday]: {
  //       moodVal: null,
  //       notes: null,
  //     },
  //   },
  //   userdata
  // );

  userdata[dateToday] = {};

  userdata[dateToday].moodVal = moodVal;
  userdata[dateToday].notes = notes;

  console.log(userdata);

  api.send("write-file", [
    dataPath + "/userdata.json",
    JSON.stringify(userdata, null, 2),
  ]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(notes);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [notes]);
  function handleMoodValChange(e) {
    setMoodVal(e.target.value);
  }
  return (
    <div className="card">
      <div className="card-body">
        <div className="mb-2">
          <label htmlFor="customRange1" className="form-label">
            我的心情指數：{moodVal}
          </label>
          <input
            type="range"
            className="form-range"
            min={1}
            max={5}
            defaultValue={3}
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
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoodEditor;
