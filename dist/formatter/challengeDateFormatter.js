"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDay = exports.getMonth = exports.getYear = void 0;
function getYear() {
    const date = new Date();
    const year = date.getFullYear().toString();
    return year;
}
exports.getYear = getYear;
function getMonth() {
    const date = new Date();
    let month = (date.getMonth() + 1).toString();
    month = parseInt(month) >= 10 ? month : '0' + month;
    return month.toString();
}
exports.getMonth = getMonth;
function getDay() {
    const date = new Date();
    let day = date.getDate().toString();
    day = parseInt(day) >= 10 ? day : '0' + day;
    return day.toString();
}
exports.getDay = getDay;
//# sourceMappingURL=challengeDateFormatter.js.map