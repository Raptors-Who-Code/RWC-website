"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fifteenMinutesFromNow = exports.thirtyDaysFromNow = exports.oneYearFromNow = void 0;
const oneYearFromNow = () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
exports.oneYearFromNow = oneYearFromNow;
const thirtyDaysFromNow = () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
exports.thirtyDaysFromNow = thirtyDaysFromNow;
const fifteenMinutesFromNow = () => new Date(Date.now() + 15 * 60 * 1000);
exports.fifteenMinutesFromNow = fifteenMinutesFromNow;
