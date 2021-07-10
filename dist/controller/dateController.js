"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameMonth = exports.isSameDay = void 0;
const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate();
};
exports.isSameDay = isSameDay;
const isSameMonth = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth();
};
exports.isSameMonth = isSameMonth;
//# sourceMappingURL=dateController.js.map