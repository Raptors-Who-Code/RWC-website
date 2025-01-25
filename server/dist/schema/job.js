"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobSchema = void 0;
const zod_1 = require("zod");
const JobLevel = zod_1.z.enum(["JUNIOR", "MID_LEVEL", "SENIOR", "UNKNOWN"]);
const JobLocation = zod_1.z.enum(["ONSITE", "REMOTE", "HYPBRID", "OTHER"]);
const JobHoursType = zod_1.z.enum(["FULL_TIME", "PART_TIME", "CONTRACT"]);
exports.jobSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required").max(60),
    content: zod_1.z.string().min(1, "Content is required").max(500),
    jobLink: zod_1.z.string().url("Invalid URL format"),
    jobLevel: JobLevel,
    jobLocation: JobLocation,
    jobHoursType: JobHoursType,
    internship: zod_1.z.boolean(),
});
