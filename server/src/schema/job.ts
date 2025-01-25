import { z } from "zod";

const JobLevel = z.enum(["JUNIOR", "MID_LEVEL", "SENIOR", "UNKNOWN"]);
const JobLocation = z.enum(["ONSITE", "REMOTE", "HYBRID", "OTHER"]);
const JobHoursType = z.enum(["FULL_TIME", "PART_TIME", "CONTRACT"]);

export const jobSchema = z.object({
  title: z.string().min(1, "Title is required").max(60),
  content: z.string().min(1, "Content is required").max(500),
  jobLink: z.string().url("Invalid URL format"),
  jobLevel: JobLevel,
  jobLocation: JobLocation,
  jobHoursType: JobHoursType,
  internship: z.boolean(),
});
