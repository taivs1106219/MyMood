import React, { useState, useEffect } from "react";

function MoodEditor({ date, userdata, dataPath }) {
  const dateToday = Number(
    `${date.getFullYear()}${
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)
    }${date.getDate() + 1 > 9 ? date.getDate() : "0" + date.getDate()}`
  );

  console.log(userdata);

  const [dataModded, setDataModded] = useState(false);

  const [moodVal, setMoodVal] = useState(
    Object.hasOwn(userdata, dateToday.toString())
      ? userdata[dateToday].moodVal
      : 3
  );

  const [notes, setNotes] = useState(
    Object.hasOwn(userdata, dateToday.toString())
      ? userdata[dateToday].notes
      : ""
  );

  if (dataModded) {
    Object.assign(userdata, {
      [dateToday]: { moodVal: Number(moodVal), notes: notes },
    });
    // userdata[dateToday].moodVal = Number(moodVal);
    // userdata[dateToday].notes = notes;

    console.log(userdata)

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
  return (
    <div className="card">
      <div className="card-body">
        <div className="mb-2">
          <label htmlFor="customRange1" className="form-label">
            我的心情指數：
            {Object.hasOwn(userdata, dateToday.toString())
              ? userdata[dateToday].moodVal
              : 3}
          </label>
          <input
            type="range"
            className="form-range"
            min={1}
            max={5}
            value={
              Object.hasOwn(userdata, dateToday.toString())
                ? userdata[dateToday].moodVal
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
                Object.hasOwn(userdata, dateToday.toString())
                  ? userdata[dateToday].notes
                  : ""
              }
              onChange={(e) => {
                setNotes(e.target.value);
                setDataModded(true);
              }}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoodEditor;
