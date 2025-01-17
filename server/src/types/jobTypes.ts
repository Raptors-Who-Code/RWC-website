enum JobLocation {
  ONSITE,
  REMOTE,
  HYBRID,
  OTHER,
}

enum JobLevel {
  JUNIOR,
  MID_LEVEL,
  SENIOR,
  UNKNOWN,
}

enum JobHourTypes {
  FULL_TIME,
  PART_TIME,
  CONTRACT,
}

export interface Job {
  title: string;
  content: string;
  jobLink: string;
  jobLocation: JobLocation;
  jobHours: JobHourTypes;
  internship: boolean;
  jobLevel?: JobLevel;
}
