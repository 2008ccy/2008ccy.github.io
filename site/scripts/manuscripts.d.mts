export interface Manuscript {
  subject: string;
  source: string;
  route: string;
}
export const subjects: Record<string, { root: string; hand: string }>;
export function filesIn(
  directory: string,
  extensions: string[]
): Promise<string[]>;
export function manuscriptFiles(homepageRoot: string): Promise<Manuscript[]>;
export function manuscriptUrl(
  url: string,
  subject: string,
  files: Manuscript[]
): string;
export function formatLinks(
  body: string,
  subject: string,
  files: Manuscript[]
): string;
