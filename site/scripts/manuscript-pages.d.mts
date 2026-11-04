import type { Manuscript } from "./manuscripts.mjs";

export interface ManuscriptPage {
  src: string;
  width: number;
  height: number;
}
export interface ManuscriptReading {
  sha256: string;
  pages: ManuscriptPage[];
}
export function manuscriptReadings(homepageRoot: string): Promise<
  {
    file: Manuscript;
    reading: ManuscriptReading;
  }[]
>;
