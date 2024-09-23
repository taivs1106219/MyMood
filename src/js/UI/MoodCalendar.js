import React, { useState, useRef, useLayoutEffect } from "react";
import MenuButton from "./MenuButton";
import cn from "classnames";

function MoodCalendar({ userdata, currentPage, setEditorDate }) {
  const [date, setDate] = useState(new Date());
  const tmpDay = new Date(date);
  console.log(date);
  tmpDay.setDate(date.getDate() - date.getDay() - 1);
  return (
    <>
      <div className="" id="main-content">
        <div className="d-flex">
          <MenuButton></MenuButton>
          <h2>心情日曆</h2>
        </div>
        <div className="container" style={{ overflowX: "none" }}>
          <div className="row mb-3 justify-content-center">
            <div className="col-8">
              <div className="input-group input-group-lg w-100">
                <span className="input-group-text">選擇日期</span>
                <InputDate value={date} onChange={setDate}></InputDate>
              </div>
            </div>
          </div>

          <div className="autoscroll" style={{ overflowX: "hidden" }}>
            {[...Array(7).keys()].map((e, i) => {
              tmpDay.setDate(tmpDay.getDate() + 1);
              return (
                <div className="row">
                  <div className="col-12">
                    <MoodNote
                      setEditorDate={setEditorDate}
                      date={new Date(tmpDay)}
                      userdata={userdata}
                      currentPage={currentPage}
                    ></MoodNote>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
function MoodNote({ date, userdata, currentPage, setEditorDate }) {
  const dateToday = Number(
    `${date.getFullYear()}${
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)
    }${date.getDate()}`
  );

  const todayFilled = Object.hasOwn(userdata, dateToday.toString());

  function handleClick() {
    currentPage.setCurrentPage(1000);
    setEditorDate(date);
  }

  return (
    <div className="card mb-3">
      <div className="card-header">
        {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()} 星期
        {getDay2Chinese(date.getDay())}
      </div>
      <div className="card-body">
        <h6 className={cn("card-subtitle", "mb-2", "text-body-secondary")}>
          本日心情指數：{todayFilled ? userdata[dateToday].moodVal : "無資料"}
        </h6>
        <p className="card-text">
          {todayFilled ? userdata[dateToday].notes : "（無資料）"}
        </p>
        <div className="text-end w-100">
          <a className="card-link" onClick={handleClick}>
            編輯
          </a>
        </div>
      </div>
    </div>
  );
}
function getDay2Chinese(day) {
  const days = ["日", "一", "二", "三", "四", "五", "六"];
  return days[day];
}

const InputDate = ({
  value,
  onChange,
  timezoneOffset = new Date().getTimezoneOffset() * 60000,
  ...rest
}) => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    ref.current.valueAsDate = value;
  }, [value]);
  return (
    <input
      className="form-control"
      ref={ref}
      type="date"
      style={{ fontVariantNumeric: "tabular-nums" }}
      onChange={(e) => onChange(new Date(e.currentTarget.valueAsNumber))}
    />
  );
};

export default MoodCalendar;
