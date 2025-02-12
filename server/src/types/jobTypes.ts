export enum JobLocation {
  ONSITE = "ONSITE",
  REMOTE = "REMOTE",
  HYBRID = "HYBRID",
  OTHER = "OTHER",
}

export enum JobLevel {
  INTERNSHIP = "INTERNSHIP",
  JUNIOR = "JUNIOR",
  MID_LEVEL = "MID_LEVEL",
  SENIOR = "SENIOR",
  UNKNOWN = "UNKNOWN",
}

export enum JobHourTypes {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  UNKNOWN = "UNKNOWN",
}


export interface Job {
  title: string;
  content: string;
  userId?: string; 
  jobLink: string;
  jobLocation: JobLocation;
  jobHoursType: JobHourTypes;
  internship: boolean;
  jobLevel?: JobLevel;
}

export type APIJob = {
  date_updated: number;
  url: string;
  locations: string[];
  season: string;
  sponsorship: string;
  active: boolean;
  company_name: string;
  title: string;
  source: string;
  id: string;
  date_posted: number;
  company_url: string;
  is_visible: boolean;
};
