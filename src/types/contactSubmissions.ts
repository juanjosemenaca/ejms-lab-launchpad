export type ContactSubmissionSource = "main" | "landing";

export type ContactSubmissionRecord = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  company: string;
  message: string;
  source: string;
};
