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
  jobLevel?: JobLevel;
}


