"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JobLocation;
(function (JobLocation) {
    JobLocation[JobLocation["ONSITE"] = 0] = "ONSITE";
    JobLocation[JobLocation["REMOTE"] = 1] = "REMOTE";
    JobLocation[JobLocation["HYBRID"] = 2] = "HYBRID";
    JobLocation[JobLocation["OTHER"] = 3] = "OTHER";
})(JobLocation || (JobLocation = {}));
var JobLevel;
(function (JobLevel) {
    JobLevel[JobLevel["JUNIOR"] = 0] = "JUNIOR";
    JobLevel[JobLevel["MID_LEVEL"] = 1] = "MID_LEVEL";
    JobLevel[JobLevel["SENIOR"] = 2] = "SENIOR";
    JobLevel[JobLevel["UNKNOWN"] = 3] = "UNKNOWN";
})(JobLevel || (JobLevel = {}));
var JobHourTypes;
(function (JobHourTypes) {
    JobHourTypes[JobHourTypes["FULL_TIME"] = 0] = "FULL_TIME";
    JobHourTypes[JobHourTypes["PART_TIME"] = 1] = "PART_TIME";
    JobHourTypes[JobHourTypes["CONTRACT"] = 2] = "CONTRACT";
})(JobHourTypes || (JobHourTypes = {}));
