export function getYear() {
  const date = new Date();
  const year = date.getFullYear().toString();
​
  return year;
}

export function getMonth() {
  const date = new Date();
  let month = (date.getMonth() + 1).toString();
  month = parseInt(month) >= 10 ? month: '0' + month;
​
  return month.toString();
}

export function getDay() {
  const date = new Date();
  let day = date.getDate().toString();
  day = parseInt(day) >= 10 ? day: '0' + day;
​
  return day.toString();
}