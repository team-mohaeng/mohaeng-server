export function dateFormatter() {
  const date = new Date();
  const year = date.getFullYear().toString();
​
  let month = (date.getMonth() + 1).toString();
  month = parseInt(month) >= 10 ? month: '0' + month;
  let day = date.getDate().toString();
  day = parseInt(day) >= 10 ? day: '0' + day;
  let hour = date.getHours().toString();
  hour = parseInt(hour) >= 10 ? hour: '0' + hour;
  let min = date.getMinutes().toString();
  let sec = date.getSeconds().toString();
  sec = parseInt(sec) >= 10 ? sec: '0' + sec;
​
  return year + '.' + month + '.' + day + ' ' + hour + ':' + min + ':' + sec;
}