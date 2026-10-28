export interface ExamPaper {
  subject: string;
  title: string;
  filename: string;
  source: string;
  route: string;
  mediaType: string;
}
export const examSubjects: { id: string; title: string }[];
export function examPapers(homepageRoot: string): Promise<ExamPaper[]>;
