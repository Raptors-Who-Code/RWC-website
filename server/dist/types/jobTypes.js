"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobHourTypes = exports.JobLevel = exports.JobLocation = void 0;
var JobLocation;
(function (JobLocation) {
    JobLocation["ONSITE"] = "ONSITE";
    JobLocation["REMOTE"] = "REMOTE";
    JobLocation["HYBRID"] = "HYBRID";
    JobLocation["OTHER"] = "OTHER";
})(JobLocation || (exports.JobLocation = JobLocation = {}));
var JobLevel;
(function (JobLevel) {
    JobLevel["JUNIOR"] = "JUNIOR";
    JobLevel["MID_LEVEL"] = "MID_LEVEL";
    JobLevel["SENIOR"] = "SENIOR";
    JobLevel["UNKNOWN"] = "UNKNOWN";
})(JobLevel || (exports.JobLevel = JobLevel = {}));
var JobHourTypes;
(function (JobHourTypes) {
    JobHourTypes["FULL_TIME"] = "FULL_TIME";
    JobHourTypes["PART_TIME"] = "PART_TIME";
    JobHourTypes["CONTRACT"] = "CONTRACT";
})(JobHourTypes || (exports.JobHourTypes = JobHourTypes = {}));
