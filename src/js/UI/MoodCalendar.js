import React, { useState, useRef, useLayoutEffect } from "react";
import MenuButton from "./MenuButton";
import * as cn from "classnames";

function MoodCalendar() {
  const [date, setDate] = useState(new Date());
  const tmpDay = new Date(date);
  console.log(date);
  tmpDay.setDate(date.getDate() - date.getDay());
  return (
    <>
      <div className="flex-column" id="main-content">
        <div className="d-flex">
          <MenuButton></MenuButton>
          <h2>心情日曆</h2>
        </div>
        <div className="container">
          <div className="row mb-3 justify-content-center">
            <div className="col-8">
              <div className="input-group input-group-lg w-100">
                <span className="input-group-text">選擇日期</span>
                <InputDate value={date} onChange={setDate}></InputDate>
              </div>
            </div>
          </div>

          <div className="autoscroll">
            {[...Array(7).keys()].map((e, i) => {
              tmpDay.setDate(tmpDay.getDate() + 1);
              return (
                <div className="row">
                  <MoodNote date={new Date(tmpDay)}></MoodNote>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
  function MoodNote({ date }) {
    // console.log(date);
    return (
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">
            {date.getFullYear()}-{date.getMonth() + 1}-{date.getDate()} 星期
            {getDay2Chinese(date.getDay())}
          </h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            今日心情：顛
          </h6>
          <p className="card-text">
            我对得起谁我谁都对不起！我活着就是一种错误！但你那冰冷的言语就是对的吗？你小嘴巴一开一合就嘚啵嘚啵两句，给我本来就脆弱的心理防线捅出了一个巨洞，你骂完我你是舒服了，你把所有的责任都推到了我身上！那一把游戏的失误是我一个人能决定得了的吗？
          </p>
          <a href="#" className="card-link">
            也許可以放更多東西
          </a>
          <a href="#" className="card-link">
            之後塞更多東西吧
          </a>
        </div>
      </div>
    );
  }
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
      style={{fontVariantNumeric:"tabular-nums"}}
      onChange={(e) => onChange(new Date(e.currentTarget.valueAsNumber))}
    />
  );
};

export default MoodCalendar;
