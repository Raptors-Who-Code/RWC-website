import API from "@/config/apiClient";
import { z } from "zod";

export enum JobLocation {
  ONSITE = "ONSITE",
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
  OTHER = "OTHER",
}

export enum JobLevel {
  JUNIOR = "JUNIOR",
  MID_LEVEL = "MID_LEVEL",
  SENIOR = "SENIOR",
  UNKNOWN = "UNKNOWN",
}

export enum JobHourTypes {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
}

export interface Job {
  title: string;
  content: string;
  jobLink: string;
  jobLocation: JobLocation;
  jobHoursType: JobHourTypes;
  internship: boolean;
  jobLevel: JobLevel;
}

export const jobLinkSchema = z.string().url();

export const createJob = async (jobData: Job) => {
  console.log("jobData", jobData);
  try {
    const response = await API.post("/api/jobs", jobData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Error creating job", error);
    throw error;
  }
};
