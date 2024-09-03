import React, { useState, useRef, useLayoutEffect } from "react";
import MenuButton from "./MenuButton";
import * as cn from "classnames";

function MoodCalendar() {
  const [date, setDate] = useState(new Date());
  const tmpDay = new Date(date);

  return (
    <>
      <div className="d-flex">
        <MenuButton></MenuButton>
        <h2>心情日曆</h2>
      </div>
      <div className="px-3">
        <div className={cn("d-grid", "gap-2", " col-4", "mx-auto", "mb-3")}>
          <div className="input-group input-group-lg">
            <span className="input-group-text">選擇日期</span>
            <InputDate value={date} onChange={setDate}></InputDate>
          </div>
        </div>
        {[...Array(date.getDay()).keys()].map((e, i) => {
          tmpDay.setDate(date.getDate() - (date.getDay() - e) + 1);
          return <MoodNote date={new Date(tmpDay)}></MoodNote>;
        })}
        {[...Array(7 - date.getDay()).keys()].map((e, i) => {
          tmpDay.setDate(date.getDate() + e+1);
          console.log(i);
          return <MoodNote date={new Date(tmpDay)}></MoodNote>;
        })}
      </div>
    </>
  );
  function MoodNote({ date }) {
    // console.log(date);
    return (
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">
            {date.getFullYear()}-{date.getMonth()}-{date.getDate()} 星期{" "}
            {date.getDay()?date.getDay():7}
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
      onChange={(e) =>
        onChange(new Date(e.currentTarget.valueAsNumber + timezoneOffset))
      }
    />
  );
};

export default MoodCalendar;
