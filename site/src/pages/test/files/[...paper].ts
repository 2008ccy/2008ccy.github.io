import type { APIRoute, GetStaticPaths } from "astro";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { examPapers } from "../../../../scripts/exam-papers.mjs";

export const getStaticPaths: GetStaticPaths = async () => {
  // Astro runs from site/; endpoint import.meta.url changes after bundling.
  const root = resolve(process.cwd(), "..");
  return (await examPapers(root)).map(paper => ({
    params: { paper: paper.route },
    props: { source: paper.source, mediaType: paper.mediaType },
  }));
};

export const GET: APIRoute = async ({ props }) =>
  new Response(new Uint8Array(await readFile(props.source)), {
    headers: { "Content-Type": props.mediaType },
  });
