import {
  Resume,
  Education as PrismaEducation,
  Experience as PrismaExperience,
  Project as PrismaProject,
} from "@prisma/client";

export type FormInputs = Omit<Resume, "userId"> & {
  education: Array<Education>;
  experience: Array<Experience>;
  projects: Array<Project>;
};

// {
// resumeTitle: string;
// firstName: string;
// lastName: string;
// currentTitle: string;
// email: string;
// phone: string;
// website: string;
// summary: string;
// education: Array<Education>;
// experience: Array<Experience>;
// projects: Array<Project>;
// };

export type Education = Omit<PrismaEducation, "resumeId">;

// {
//   id: string;
//   institution?: string;
//   degree?: string;
//   city?: string;
//   state?: string;
//   startDate?: Date;
//   endDate?: Date;
//   description?: string;
//   index?: number;
// };

export type Experience = Omit<PrismaExperience, "resumeId">;

// {
//   id: string;
//   company?: string;
//   position?: string;
//   isCurrent?: boolean;
//   city?: string;
//   state?: string;
//   startDate?: Date;
//   endDate?: Date;
//   description?: string;
//   index?: number;
// };

export type Project = Omit<PrismaProject, "resumeId">;

// {
//   id: string;
//   title?: string;
//   description?: string;
//   index?: number;
// };

export type FormState = {
  data?: FormInputs;
  update: (value: FormInputs) => void;
};
