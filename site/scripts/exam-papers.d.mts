export interface ExamPaper {
  subject: string;
  title: string;
  filename: string;
  source: string;
  route: string;
  readerRoute: string;
  mediaType: string;
  hidden: boolean;
}
export const examSubjects: { id: string; title: string }[];
export function examPapers(homepageRoot: string): Promise<ExamPaper[]>;
