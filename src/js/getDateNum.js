function getDateNum(date) {
  
  const todayNum = Number(
    `${date.getFullYear()}${
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)
    }${date.getDate() + 1 > 9 ? date.getDate() : "0" + date.getDate()}`
  );
  return todayNum;
}

export default getDateNum;