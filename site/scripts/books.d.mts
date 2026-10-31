export interface LibraryBook {
  filename: string;
  source: string;
  route: string;
  title: string;
  author?: string;
  edition?: string;
  category: string;
  description?: string;
  bytes: number;
}
export const booksRepositoryUrl: string;
export function libraryBooks(homepageRoot: string): Promise<LibraryBook[]>;
